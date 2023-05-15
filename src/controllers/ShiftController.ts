import express, { Request, Response, NextFunction } from "express";
import { Shift, Shifts } from "../models/ShiftModel";
import { ShiftInput } from "../dtos/shifts.dto";
import { Workers } from "../models";
import { WorkerShift } from "../models/WorkerShift";

export const createShift = async (
  req: any,
  res: Response,
  next: NextFunction
) => {};
