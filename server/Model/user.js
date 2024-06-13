import { ObjectId } from "mongodb";
import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  _id: String,
  auth: {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    otp: {
      type: Number,
    },
    isOtpValid: {
      type: Boolean,
    },
    otpTimeStamp: {
      type: Number,
    },
    isOtpIncorrect: {
      type: Number,
    },
    isInitAuthComplete: {
      type: Boolean,
    },
  },
  username: { type: String },
  dateCreated: { type: String },
  wallet: {
    type: Number,
    default: 0,
  },
  vault: {
    type: Number,
    default: 0,
  },
  waggered: {
    type: Number,
    default: 0,
  },
  wins: {
    type: Number,
    default: 0,
  },
  losses: {
    type: Number,
    default: 0,
  },
  numOfBets: {
    type: Number,
    default: 0,
  },
  level:{
    type: Number,
    default: 1
  },
  favorite: [String],
  recent: [String],
  bets: [ObjectId],
  notification: {
    isRead: {
      type: Boolean,
      default: true,
    },
    list: [
      {
        type: {
          type: String,
        },
        title: {
          type: String,
        },
        text: {
          type: String,
        },
        timeStamp: {
          type: Number,
        },
      },
    ],
  },
});

const userModel = mongoose.model("user", userSchema);

export default userModel;
