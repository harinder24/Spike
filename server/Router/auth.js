import express from "express";
import {
  register,
  signIn,
  otpValidation,
  otpResend,
  forgetPassword,
  changePassword,
} from "../controller/auth.js";
const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/otpvalidation", otpValidation);
authRouter.post("/otpresend", otpResend);
authRouter.post("/signin", signIn);
authRouter.post("/forgetpassword", forgetPassword);
authRouter.post("/changepassword", changePassword);

export { authRouter };
