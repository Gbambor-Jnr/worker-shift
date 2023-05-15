import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Payload } from "../dtos";
import { HttpsError } from "./Error";

dotenv.config();

const SECRET = process.env.JSON_WEB_TOKEN_SECRET;
if (!SECRET) {
  throw new Error("you need to pass in a secret object");
}

export const generateSalt = async () => {
  return await bcrypt.genSalt();
};

export const hashPassword = async (password: string, salt: string) => {
  const enteredPassword = password;
  const generatedSalt = salt;

  const hashedPassword = await bcrypt.hash(enteredPassword, generatedSalt);

  return hashedPassword;
};

export const validatePassword = async (
  enteredPassword: string,
  salt: string,
  savedPassword: string
) => {
  const decodedPassword =
    (await hashPassword(enteredPassword, salt)) === savedPassword;

  return decodedPassword;
};

export const generateToken = async (payload: Payload) => {
  const token = jwt.sign(payload, SECRET, { expiresIn: "100d" });
  return token;
};

export const validateToken = async (req: any) => {
  const token = req.get("Authorization");

  if (token) {
    const payload = jwt.verify(token.split(" ")[1], SECRET);
    req.user = payload;
    return true;
  } else {
    return false;
  }
};
