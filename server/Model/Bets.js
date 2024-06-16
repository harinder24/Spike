import mongoose from "mongoose";
const betsSchema = new mongoose.Schema({
  game: {
    type: String,
  },
  amount: {
    type: Number,
  },
  multiplier: {
    type: Number,
  },
  payout: {
    type: Number,
  },
  date: {
    type: String,
  },
  timeStamp:{
    type: Number,
  },
  mines: {
    minesArray: [Boolean],
    recent: { index: { type: Number }, isGem: { type: Boolean } },
    clicked: [{ index: { type: Number }, isGem: { type: Boolean } }],
    isCompleted: {type: Boolean},
    mines: {type: Number},
    gems:  {type: Number},
  },
});

const betsModel = mongoose.model("bets", betsSchema);

export default betsModel;
