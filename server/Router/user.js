import express from "express";
import {
 getUsertokenData,getStripeKey,
 payment,
 getWallet,
 withdraw,
 addToVault,
 withdrawFromVault,
 getVault,getNotification,notificationRead,getUserVipProgress,
 getUserStats,
 getRakeBack,
 rakeBackClaim,
 levelUp,
 addFavourite,
 deleteFavourite,
 getBets,
 getRecent
 
} from "../controller/user.js";
import validateToken from "../middleWare/verifyToken.js";
const userRouter = express.Router();

userRouter.get("/getusertokendata", validateToken ,getUsertokenData);
userRouter.get("/getuservipprogress", validateToken ,getUserVipProgress);
userRouter.get("/getuserstats", validateToken ,getUserStats);
userRouter.get("/getstripekey", validateToken ,getStripeKey);
userRouter.get("/getrakeback", validateToken ,getRakeBack);
userRouter.get("/getbets", validateToken ,getBets);
userRouter.get("/getrecent", validateToken ,getRecent);
userRouter.get("/rakebackclaim", validateToken ,rakeBackClaim);
userRouter.post("/payment", validateToken ,payment);
userRouter.post("/levelup", validateToken ,levelUp);
userRouter.get("/wallet", validateToken ,getWallet);
userRouter.get("/notification", validateToken ,getNotification);
userRouter.get("/notificationread", validateToken ,notificationRead);
userRouter.get("/vault", validateToken ,getVault);
userRouter.post("/withdraw", validateToken ,withdraw);
userRouter.post("/addvault", validateToken ,addToVault);
userRouter.post("/withdrawvault", validateToken ,withdrawFromVault);
userRouter.post("/addfav", validateToken ,addFavourite);
userRouter.post("/deletefav", validateToken ,deleteFavourite);
export { userRouter };