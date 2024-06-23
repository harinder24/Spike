import userModel from "../Model/user.js";
import betsModel from "../Model/Bets.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const getUserBlackjackActiveId = async (req, res) => {
  try {
    const { decodedEmail } = req;
    let foundUser = await userModel.findById(decodedEmail);

    return res.status(201).json({
      success: true,
      data: foundUser.isBlackjackActive,
    });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};
export const getBetData = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(201).json({
        success: false,
      });
    }
    let foundBet = await betsModel.findById(id);
    const data = {
      historyArr: foundBet.blackjack.historyArr,
      amount: foundBet.amount,
      multiplier: foundBet.multiplier,
      payout: foundBet.payout,
      isCompleted: foundBet.blackjack.isCompleted,
      dealerCard: foundBet.blackjack.dealerCard,
      playerCard: foundBet.blackjack.playerCard,
    };
    return res.status(201).json({
      success: true,
      data: data,
    });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};
export const setBlackjackBet = async (req, res) => {
  try {
    const { date, amount, timeStamp } = req.body;
    const { decodedEmail } = req;
    let foundUser = await userModel.findById(decodedEmail);
    if (foundUser.isBlackjackActive) {
      return res
        .status(201)
        .json({ success: false, error: "Bet is already active" });
    }
    if (amount === "") {
      return res.status(201).json({
        success: false,
        error: "Minimum amount is CA$1.00",
      });
    }
    const parseAmount = parseFloat(amount);
    if (parseAmount < 1) {
      return res
        .status(201)
        .json({ success: false, error: "Minimum amount is CA$1.00" });
    }
    if (parseAmount > 1000) {
      return res
        .status(201)
        .json({ success: false, error: "Max bet allowed is CA$1000.00" });
    }
    if (amount > foundUser.wallet) {
      return res.status(201).json({
        success: false,
        error: "Amount should not be more than wallet amount",
      });
    }

    let cardArray = getDeck();
    let dealerCard = [];
    let playerCard = [];

    let historyArr = [];

    playerCard.push(cardArray[0]);
    historyArr.push({
      type: "player",
      card: cardArray[0],
    });
    cardArray = cardArray.slice(1);
    dealerCard.push(cardArray[0]);
    historyArr.push({
      type: "dealer",
      card: cardArray[0],
    });
    cardArray = cardArray.slice(1);
    playerCard.push(cardArray[0]);
    historyArr.push({
      type: "player",
      card: cardArray[0],
    });
    cardArray = cardArray.slice(1);
    const dealerSecondCard = cardArray[0];
    historyArr.push({
      type: "hidden",
      card: {
        card: "",
        amount: 0,
        isAce: false,
      },
    });
    cardArray = cardArray.slice(1);
    const newBet = new betsModel({
      amount: parseAmount,
      date: date,
      game: "Blackjack",
      multiplier: 1.0,
      payout: parseAmount,
      timeStamp: timeStamp,

      blackjack: {
        historyArr: historyArr,
        dealerSecondCard: dealerSecondCard,
        cardList: cardArray,
        dealerCard: dealerCard,
        isCompleted: false,
        playerCard: playerCard,
      },
    });
    if (
      newBet.blackjack.playerCard[0].amount +
        newBet.blackjack.playerCard[1].amount ===
      21
    ) {
      let i = 0;
      let amount2 = 0;
      let isAce2 = 0;
      newBet.blackjack.dealerCard.push(newBet.blackjack.dealerSecondCard);
      newBet.blackjack.historyArr.push({
        type: "show",
        card: newBet.blackjack.dealerSecondCard,
      });
      for (let i = 0; i < newBet.blackjack.dealerCard.length; i++) {
        const element = newBet.blackjack.dealerCard[i];
        amount2 += element.amount;
        if (element.isAce) {
          isAce2 += 1;
        }
        if (isAce2 > 0 && amount2 > 21) {
          amount2 -= 10;
          isAce2 -= 1;
        }
      }

      while (amount2 < 16) {
        amount2 += cardArray[0].amount;
        if (cardArray[0].isAce === true) {
          isAce2 += 1;
        }
        if (isAce2 > 0 && amount2 > 21) {
          amount2 -= 10;
          isAce2 -= 1;
        }
        newBet.blackjack.historyArr.push({
          type: "dealer",
          card: cardArray[0],
        });
        newBet.blackjack.dealerCard.push(cardArray[0]);
        cardArray = cardArray.slice(1);
        i++;
      }
      newBet.blackjack.cardList = cardArray;
      if (amount2 === 21) {
        newBet.payout = parseAmount;
        newBet.multiplier = 1;
      } else {
        newBet.payout = parseAmount * 1.5;
        newBet.multiplier = 1.5;
        foundUser.wallet += newBet.payout;
        foundUser.wins += 1;
      }
      foundUser.bets.push(foundBet._id);
      newBet.blackjack.isCompleted = true;
      foundUser.isBlackjackActive = "";
    }
    newBet.save();
    foundUser.wallet -= parseAmount;
    foundUser.waggered += parseAmount;
    foundUser.numOfBets += 1;
    foundUser.isBlackjackActive = newBet._id;
    const isLeveledUp = foundUser.waggered >= 10 ** foundUser.level * 25;
    if (isLeveledUp) {
      foundUser.levelUpReward += 10 ** foundUser.level;
      foundUser.level += 1;
      sendLevelUpEmail(foundUser.auth.email);
      foundUser.notification.isRead = false;
      foundUser.notification.list.push({
        type: "level",
        title: "Leveled up",
        text: `Check email, we have reward for you! (Check spam as well)`,
        timeStamp: timeStamp,
      });
    }
    const recentObj = {
      type: "casino",
      name: "Blackjack",
    };

    if (
      foundUser.recent.some(
        (fav) => fav.name === recentObj.name && fav.type === recentObj.type
      )
    ) {
      const index = foundUser.recent.findIndex(
        (fav) => fav.name === recentObj.name && fav.type === recentObj.type
      );

      foundUser.recent.splice(index, 1);
    }
    foundUser.recent.push(recentObj);
    foundUser.save();
    return res
      .status(201)
      .json({ success: true, betId: newBet._id, isLeveledUp: isLeveledUp });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};
export const hitBlackjackBet = async (req, res) => {
  try {
    const { id } = req.body;
    const { decodedEmail } = req;
    let foundBet = await betsModel.findById(id);
    if (foundBet.blackjack.isCompleted) {
      return res.status(201).json({
        success: false,
        error: "Bet is completed",
      });
    }
    let cardArray = foundBet.blackjack.cardList;
    foundBet.blackjack.playerCard.push(cardArray[0]);
    foundBet.blackjack.historyArr.push({
      type: "player",
      card: cardArray[0],
    });
    cardArray = cardArray.slice(1);
    foundBet.blackjack.cardList = cardArray;

    let amount = 0;
    let isAce = 0;
    for (let i = 0; i < foundBet.blackjack.playerCard.length; i++) {
      const element = foundBet.blackjack.playerCard[i];
      amount += element.amount;
      if (element.isAce) {
        isAce += 1;
      }
      if (isAce > 0 && amount > 21) {
        amount -= 10;
        isAce -= 1;
      }
    }

    if (amount > 21) {
      foundBet.blackjack.isCompleted = true;

      let foundUser = await userModel.findById(decodedEmail);
      foundBet.payout = 0;
      foundBet.multiplier = 0;
      foundUser.losses += 1;
      foundUser.isBlackjackActive = "";
      foundUser.rakeback += foundBet.amount * (foundUser.level / 100);
      foundUser.bets.push(foundBet._id);
      foundUser.save();
    }

    foundBet.save();
    const data = {
      historyArr: foundBet.blackjack.historyArr,
      amount: foundBet.amount,

      multiplier: foundBet.multiplier,
      payout: foundBet.payout,
      isCompleted: foundBet.blackjack.isCompleted,
      dealerCard: foundBet.blackjack.dealerCard,
      playerCard: foundBet.blackjack.playerCard,
    };
    return res.status(201).json({
      success: true,
      data: data,
    });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};
export const standBlackjackBet = async (req, res) => {
  try {
    const { id } = req.body;
    const { decodedEmail } = req;
    let foundBet = await betsModel.findById(id);
    let foundUser = await userModel.findById(decodedEmail);
    if (foundBet.blackjack.isCompleted) {
      return res.status(201).json({
        success: false,
        error: "Bet is completed",
      });
    }
    let amountPlayer = 0;
    let isAcePlayer = 0;
    for (let i = 0; i < foundBet.blackjack.playerCard.length; i++) {
      const element = foundBet.blackjack.playerCard[i];
      amountPlayer += element.amount;
      if (element.isAce) {
        isAcePlayer += 1;
      }
      if (isAcePlayer > 0 && amountPlayer > 21) {
        amountPlayer -= 10;
        isAcePlayer -= 1;
      }
    }

    foundBet.blackjack.dealerCard.push(foundBet.blackjack.dealerSecondCard);
    foundBet.blackjack.historyArr.push({
      type: "show",
      card: foundBet.blackjack.dealerSecondCard,
    });

    let amount = 0;
    let isAce = 0;
    for (let i = 0; i < foundBet.blackjack.dealerCard.length; i++) {
      const element = foundBet.blackjack.dealerCard[i];
      amount += element.amount;
      if (element.isAce) {
        isAce += 1;
      }
      if (isAce > 0 && amount > 21) {
        amount -= 10;
        isAce -= 1;
      }
    }
    let cardArray = foundBet.blackjack.cardList;
    while (amount < 16) {
      foundBet.blackjack.dealerCard.push(cardArray[0]);
      foundBet.blackjack.historyArr.push({
        type: "dealer",
        card: cardArray[0],
      });
      amount += cardArray[0].amount;
      if (cardArray[0].isAce) {
        isAce += 1;
      }
      cardArray = cardArray.slice(1);
      if (amount > 21 && isAce) {
        amount = amount - 10;
        isAce -= 1;
      }
    }
    foundBet.blackjack.cardList = cardArray;
    if (amount > 21 || amount < amountPlayer) {
      foundBet.payout = foundBet.amount * 2;
      foundBet.multiplier = 2;
      foundUser.wins += 1;
    } else if (amount > amountPlayer) {
      foundBet.payout = 0;
      foundBet.multiplier = 0;
      foundUser.losses += 1;

      foundUser.rakeback += foundBet.amount * (foundUser.level / 100);
    } else {
      foundBet.payout = foundBet.amount;
      foundBet.multiplier = 1;
    }
    foundBet.blackjack.isCompleted = true;
    const data = {
      historyArr: foundBet.blackjack.historyArr,
      amount: foundBet.amount,
      multiplier: foundBet.multiplier,
      payout: foundBet.payout,
      isCompleted: foundBet.blackjack.isCompleted,
      dealerCard: foundBet.blackjack.dealerCard,
      playerCard: foundBet.blackjack.playerCard,
    };
    foundUser.isBlackjackActive = "";
    foundUser.bets.push(foundBet._id);
    foundBet.save();
    foundUser.save();
    return res.status(201).json({
      success: true,
      data: data,
    });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

function getDeck() {
  const suits = ["H", "D", "C", "S"];
  const ranks = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
  ];

  let cards = [];

  for (let suit of suits) {
    for (let rank of ranks) {
      cards.push({
        card: suit + " " + rank,
        amount: getCardAmount(rank),
        isAce: rank === "A",
      });
    }
  }

  cards.sort(() => Math.random() - 0.5);
  return cards;
}

function getCardAmount(rank) {
  if (rank === "A") {
    return 11; // Ace can also be 1, but usually considered 11 initially
  } else if (["J", "Q", "K"].includes(rank)) {
    return 10;
  } else {
    return parseInt(rank);
  }
}
