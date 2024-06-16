import express from "express";
import {
    checkout,
    getBetData,
getUserMineActiveId,
mineClick,
setMineBet
} from "../controller/mines.js";
import validateToken from "../middleWare/verifyToken.js";
const minesRouter = express.Router();

minesRouter.get("/ismineactive",validateToken ,getUserMineActiveId);
minesRouter.post("/setminebet",validateToken ,setMineBet);
minesRouter.post("/getbetdata",validateToken ,getBetData);
minesRouter.post("/mineclick",validateToken ,mineClick);
minesRouter.post("/checkout",validateToken ,checkout);

export { minesRouter };
