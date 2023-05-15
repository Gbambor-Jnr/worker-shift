import express, { Router } from "express";
import { createShift } from "../controllers";
import { Authenticate } from "../middlewares/Aunthenticate";
//import { postShift } from "../controllers";

const router = Router();

router.post("/shifts", Authenticate, createShift);

export default router;
