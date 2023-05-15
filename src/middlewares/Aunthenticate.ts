import { NextFunction, Request, Response } from "express";
import { HttpsError, validateToken } from "../utility";

export const Authenticate = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const validate = await validateToken(req);

  if (validate) {
    next();
  } else {
    throw new HttpsError("User not authenticated", 401);
  }
};
