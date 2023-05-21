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

import { RoleEnum } from "../models";
import { workerInputSchema } from "../utility";

export const createWorker = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const inputValue = await workerInputSchema
      .validateAsync(
        {
          email: req.body.email,
          password: req.body.password,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          role: req.body.role,
        },
        {
          abortEarly: false,
        }
      )
      .catch((err) => res.status(400).json(err.details[0].message));

    const { email, password, firstName, lastName, role } = inputValue;
    const existingWorker = await Workers.findOne({
      where: { email: email },
    });

    if (existingWorker) {
      const error = new HttpsError("Worker already exist", 409); //409 is already exists error
      throw error;
    }

    if (role === RoleEnum.WORKER || role === RoleEnum.ADMIN) {
      // const error = new HttpsError("only workers are allowed to register", 403); //403 is not authorized error
      // throw error;
      const salt = await generateSalt();
      const hashedPassword = await hashPassword(password, salt);

      const savedWorker = await Workers.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        salt,
        role,
      });

      res.status(201).json("User Created Succesfully");
    } else if (role === RoleEnum.ADMIN) {
    }
  } catch (err: any) {
    if (err) {
      // err.statusCode = 500;
      // throw new HttpsError("Server error", 500);
      return res.status(400).json(err.message);
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
        role: existingUser.role,
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
