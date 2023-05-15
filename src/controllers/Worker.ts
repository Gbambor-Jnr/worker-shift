import { NextFunction, Request, Response } from "express";
import { Workers } from "../models";
import { HttpsError } from "../utility/Error";
import { validationResult } from "express-validator";
import { WorkerInput, WorkerLogin } from "../dtos";
import {
  generateSalt,
  generateToken,
  hashPassword,
  validatePassword,
} from "../utility/Password";

export const createWorker = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
      const error = new HttpsError("invalid registeration inputs", 422);
      throw error;
    }
    const { email, password, firstName, lastName } = <WorkerInput>req.body;
    const existingWorker = await Workers.findOne({
      where: { email: email },
    });

    if (existingWorker) {
      const error = new HttpsError("Worker already exist", 409);
      throw error;
    }

    const salt = await generateSalt();
    const hashedPassword = await hashPassword(password, salt);

    const savedWorker = await Workers.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      salt,
    });

    res.status(201).json("User Created Succesfully");
  } catch (err: any) {
    if (err) {
      err.statusCode = 500;
      throw new HttpsError("Server error", 500);
    }
  }
};

export const workerLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
      const error = new HttpsError("invalid credentails", 422);
    }
    const { email, password } = <WorkerLogin>req.body;

    const existingUser = await Workers.findOne({
      where: { email: email },
    });
    if (!existingUser) {
      const error = new HttpsError(
        "User with this credentials does not exist",
        422
      );
    }
    if (existingUser) {
      const comparePassword = await validatePassword(
        password,
        existingUser.salt,
        existingUser.password
      );
      const payload = {
        userId: existingUser.id,
        email: existingUser.email,
        password: existingUser.password,
        salt: existingUser.salt,
      };
      if (comparePassword) {
        const token = await generateToken(payload);
        res.status(200).json({ token: token, user: existingUser });
      }
    }
  } catch (err: any) {
    if (err) {
      err.statusCode = 500;
      throw new HttpsError("Server error", 500);
    }
  }
};

export const updateWorkerPassword = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const existingUser = req.user; //you also ahve to update the payload now since you have now updated the user
    const { oldPassword, newPassword } = req.body;
    const existingWorker = await Workers.findOne({
      where: { email: existingUser.email },
    });
    const hashedNewPassword = await hashPassword(
      newPassword,
      existingUser.salt
    );
    const hashedOldPassword = await hashPassword(
      oldPassword,
      existingUser.salt
    );
    if (existingWorker) {
      const isEqual = hashedOldPassword === existingWorker.password;
      if (existingWorker && isEqual) {
        existingWorker.password = hashedNewPassword;

        existingWorker.save();

        res.status(201).json("Password updated succesfully");
      }
    }
  } catch (err: any) {
    if (err) {
      throw new HttpsError("databse error", 500);
    }
  }
};
