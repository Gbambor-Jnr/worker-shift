import express, { Router } from "express";
import { createShift } from "../controllers";
import { Authenticate } from "../middlewares/Aunthenticate";
//import { postShift } from "../controllers";
import { ProtectRoute } from "../middlewares/Aunthenticate";

const router = Router();

router.post("/shifts", Authenticate, ProtectRoute(["worker"]), createShift);

export default router;
