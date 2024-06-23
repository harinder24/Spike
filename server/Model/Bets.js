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
  timeStamp: {
    type: Number,
  },
  mines: {
    minesArray: [Boolean],
    recent: { index: { type: Number }, isGem: { type: Boolean } },
    clicked: [{ index: { type: Number }, isGem: { type: Boolean } }],
    isCompleted: { type: Boolean },
    mines: { type: Number },
    gems: { type: Number },
  },
  baccarat: {
    history: [
      {
        isPlayer: { type: Boolean },
        value: { type: Number },
        card: { type: String },
      },
    ],
    result: { type: Number },
    playerAmount: { type: Number, default: 0 },
    tieAmount: { type: Number, default: 0 },
    bankerAmount: { type: Number, default: 0 },
    playerPayout: { type: Number, default: 0 },
    tiePayout: { type: Number, default: 0 },
    bankerPayout: { type: Number, default: 0 },
  },
  blackjack: {
    historyArr: [
 
        {
          type: {
            type: String,
          },
          card: {
            card: { type: String },
            amount: { type: Number },
            isAce: { type: Boolean },
          },
        },
    
    ],
    dealerSecondCard: {
      card: { type: String },
      amount: { type: Number },
      isAce: { type: Boolean },
    },
    cardList: [
      {
        card: { type: String },
        amount: { type: Number },
        isAce: { type: Boolean },
      },
    ],
    dealerCard: [
      {
        card: { type: String },
        amount: { type: Number },
        isAce: { type: Boolean },
      },
    ],
    isCompleted: {
      type: Boolean,
    },
    playerCard: [
      {
        card: { type: String },
        amount: { type: Number },
        isAce: { type: Boolean },
      },
    ],
  },
});

const betsModel = mongoose.model("bets", betsSchema);

export default betsModel;
