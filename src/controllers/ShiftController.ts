import express, { Request, Response, NextFunction } from "express";
import { ShiftEnum, Shifts } from "../models/ShiftModel";
import { ShiftInput } from "../dtos/shifts.dto";
import { Workers } from "../models";
import { WorkerShift } from "../models/WorkerShift";

export const createShift = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    //     const { selectedShift, shiftStartTime, shiftEndTime, shiftDay } = req.body;
    //     console.log(typeof shiftDay);
    //     const existingUser = req.user;
    //     const existingWorker = await Workers.findOne({
    //       where: { email: existingUser.email },
    //     });
    //     if (existingWorker) {
    //       const existingWorkerSHift = await WorkerShift.findAll({
    //         where: { workerId: existingWorker.id },
    //       });
    //       const existingShift = await Shifts.findOne({ where: { id: shiftId } });
    //       const enteredShiftDayMillisecond: number = new Date(shiftDay).getTime();
    //       let savedShiftDayMillisecond;
    //       if (existingShift) {
    //         const shiftDay_ = existingShift.shiftDay;
    //         savedShiftDayMillisecond = new Date(shiftDay_).getTime();
    //       }
    //       if (savedShiftDayMillisecond) {
    //         const diference = Math.abs(
    //           savedShiftDayMillisecond - enteredShiftDayMillisecond
    //         );
    //         if (diference > 86400000) {
    //           const createdShift = await Shifts.create({
    //             selectedShift,
    //             shiftStartTime,
    //             shiftEndTime,
    //             shiftDay,
    //           });
    //           const createdWorkerSHift = await WorkerShift.create({
    //             workerId: existingWorker.id,
    //             shiftId: createdShift.id,
    //           });
    //           res.status(201).json("Shift created Succesfully");
    //         }
    //       }
    //     }
    const { selectedShift, shiftStartTime, shiftEndTime, shiftDay } = <
      ShiftInput
    >req.body;

    const user = req.user;
    const existingWorker = await Workers.findOne({
      where: { email: user.email },
    });
    if (existingWorker) {
      const createdShift = await Shifts.create({
        selectedShift,
        shiftStartTime,
        shiftEndTime,
        shiftDay,
        workerId: existingWorker.id,
      });
    }
  } catch (err) {
    console.log(err);
  }
};
