import express from "express";
import { baccaratbet } from "../controller/baccarat.js";
import validateToken from "../middleWare/verifyToken.js";
const baccaratRouter = express.Router();

baccaratRouter.post("/baccaratbet", validateToken, baccaratbet);

export { baccaratRouter };
