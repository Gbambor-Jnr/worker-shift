import express, { Request, Response, NextFunction } from "express";
import { ShiftEnum, Shifts } from "../models/ShiftModel";
import { ShiftDays, ShiftInput } from "../dtos/shifts.dto";
import { Workers } from "../models";
import { WorkerShift } from "../models/WorkerShift";
import { HttpsError } from "../utility";

const oneDayMilliseconds = 86400000; //60x60x24x1000

// const trueFnc = (days: ShiftDays, enteredDate: string) => {
//   const shiftsLessThan24Hours = days.shiftDays
//     .map((val) => {
//       return Math.abs(
//         new Date(val.shiftDay).getTime() - new Date(enteredDate).getTime()
//       );
//     })
//     .filter((val) => val < oneDayMilliseconds);

//   if (shiftsLessThan24Hours.length > 0) {
//     return false;
//   }

//   return true;
// };

export const createShift = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { selectedShift, shiftStartTime, shiftEndTime, shiftDay } = <
      ShiftInput
    >req.body;

    const user = req.user;
    const existingWorker = await Workers.findOne({
      where: { email: user.email },
    });
    console.log(existingWorker);
    let shiftDayMilliseconds = new Date(shiftDay).getTime();

    if (existingWorker) {
      //CHECK IF SHIFT EXISTS
      const allShift = await Shifts.findAll({ attributes: ["shiftDay"] });

      const existingDayMillisecond = new Date(shiftDay).getTime();

      const existingShift = allShift.filter(
        (days) => new Date(days.shiftDay).getTime() === existingDayMillisecond
      );
      if (existingShift) {
        const error = new HttpsError("A shift exists already on this day", 409);
      }

      //IF NO EXISTING SHIFT NOW YOU HAVE TO CHECK IF THE ENTERED SHIFT IS ATLEAST 24 hours greater than the existing shifts in the datatbase

      const ShiftLessThanOneDay = allShift
        .map((day) =>
          Math.abs(
            new Date(shiftDay).getTime() - new Date(day.shiftDay).getTime()
          )
        )
        .filter((val) => val < oneDayMilliseconds);

      if (ShiftLessThanOneDay.length > 0) {
        const error = new HttpsError(
          "This shift is less than one day from the previous day",
          409
        );
        throw error;
      }
      const createdShift = await Shifts.create({
        selectedShift,
        shiftStartTime,
        shiftEndTime,
        shiftDay,
        workerId: existingWorker.id,
      });
      res.status(201).json("shift created succesfully");
    }
  } catch (err) {
    console.log(err);
  }
};

export const getAllShifts = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  const existingWorker = await WorkerShift.findOne({
    where: { email: user.email },
  });

  if (!existingWorker) {
    ///CHECK ERROR CODE AGAIN
    const error = new HttpsError(
      "You have to be logged in to view this page",
      403
    );
    throw error;
  }
  const allShift = await Shifts.findAll({ where: { folderId: user.id } });
  res.status(200).json({ shifts: allShift });
};

const getShiftById = async (req: any, res: Response, next: NextFunction) => {
  const user = req.user;
  const shiftId = req.params.id;
  const existingWorker = await WorkerShift.findOne({
    where: { email: user.email },
  });
  if (existingWorker) {
    const error = new HttpsError(
      "You have to be logged in to view this page",
      403
    );
    throw error;
  }

  const existingShift = await Shifts.findOne({ where: { id: shiftId } });
  res.status(200).json({ shift: existingShift });
};

const cancelShift = async (req: any, res: Response, next: NextFunction) => {
  const user = req.user;
  const shiftId = req.params.id;
  const existingWorker = await WorkerShift.findOne({
    where: { email: user.email },
  });
  if (!existingWorker) {
    const error = new HttpsError(
      "You have to be logged in to view this page",
      403
    );
    throw error;
  }

  const deletedShift = await Shifts.destroy({ where: { id: shiftId } });
  res.status(200).json("shift canceled succesfully");
};
