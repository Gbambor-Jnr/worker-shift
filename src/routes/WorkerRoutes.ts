import express from "express";
import { body } from "express-validator";

import {
  createWorker,
  updateWorkerPassword,
  workerLogin,
} from "../controllers";
import { Authenticate } from "../middlewares/Aunthenticate";

const router = express.Router();

router.post(
  "/workers",
  //   [
  //     body("password").trim().isLength({ min: 5 }),
  //     body("email").isEmail(),
  //     //   .withMessage("enter a valid email")
  //     //   .custom((value, { req }) => {
  //     //     return WorkerModel.findOne({ where: { email: value } }).then(
  //     //       (userDoc) => {
  //     //         if (userDoc) {
  //     //           return Promise.reject("Email already exists");
  //     //         }
  //     //       }
  //     //     );
  //     //   })
  //     //   .normalizeEmail(),
  //   ],
  createWorker
);

router.get("/workers", workerLogin);
router.patch("/workers", Authenticate, updateWorkerPassword);

export default router;
