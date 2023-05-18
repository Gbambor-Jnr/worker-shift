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

export const ProtectRoute = (permission: string[]) => {
  return (req: any, res: Response, next: NextFunction) => {
    const userRole = req.user.role;
    console.log(userRole);
    if (permission.includes(userRole)) {
      next();
    } else {
      return res.status(401).json("You dont have permision to view this page");
    }
  };
};
