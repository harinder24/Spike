import express from "express";
const app = express();
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const port = process.env.PORT || 3000;
import { authRouter } from "./Router/auth.js";
import { userRouter } from "./Router/user.js";
import { minesRouter } from "./Router/mines.js";
import { baccaratRouter } from "./Router/baccarat.js";
import { blackjackRouter } from "./Router/blackjack.js";

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/auth/", authRouter);
app.use("/user/", userRouter);
app.use("/mines/", minesRouter);
app.use("/baccarat/", baccaratRouter);
app.use("/blackjack/", blackjackRouter);



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});