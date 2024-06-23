import express from "express";
import {
    getBetData,
    getUserBlackjackActiveId,
    hitBlackjackBet,
    setBlackjackBet,
    standBlackjackBet
} from "../controller/blackjack.js";
import validateToken from "../middleWare/verifyToken.js";
const blackjackRouter = express.Router();

blackjackRouter.get("/isblackjackactive",validateToken ,getUserBlackjackActiveId);
blackjackRouter.post("/getbetdata",validateToken ,getBetData);
blackjackRouter.post("/setblackjackbet",validateToken ,setBlackjackBet);
blackjackRouter.post("/hitblackjack",validateToken ,hitBlackjackBet);
blackjackRouter.post("/standblackjack",validateToken ,standBlackjackBet)
export { blackjackRouter };
