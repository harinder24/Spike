import userModel from "../Model/user.js";
import betsModel from "../Model/Bets.js";

import dotenv from "dotenv";

dotenv.config();

export const baccaratbet = async (req, res) => {
  try {
    const { date, timeStamp, bets } = req.body;
    const { decodedEmail } = req;
    let pAmount = bets.playerAmount;
    let tAmount = bets.tieAmount;
    let bAmount = bets.bankerAmount;
    pAmount = parseFloat(pAmount)
      tAmount = parseFloat(tAmount)
      bAmount = parseFloat(bAmount)
    const totalAmount = pAmount + tAmount + bAmount;
    let foundUser = await userModel.findById(decodedEmail);
    if (totalAmount === 0) {
      return res.status(201).json({
        success: false,
        error: "Bet amount should be more than 0",
      });
    }
    if (totalAmount > foundUser.wallet) {
      return res.status(201).json({
        success: false,
        error: "Bet amount should not be more than wallet amount",
      });
    }
    if (
      pAmount  > 1000 ||
      tAmount  > 250 ||
      bAmount  > 1000
    ) {
      return res.status(201).json({
        success: false,
        error: "Exceeding bet amount limit",
      });
    }
    
      
    const sixCards = getSixRandomCards();

    const bacaratData = baccaratOutcome(
      [sixCards[0], sixCards[2], sixCards[4]],
      [sixCards[1], sixCards[3], sixCards[5]]
    );

    if (bacaratData.result === 1) {
      pAmount = (pAmount * 2).toFixed(2);
      bAmount = 0;
      tAmount = 0;
    } else if (bacaratData.result === 2) {
      bAmount = (bAmount * 1.95).toFixed(2);
      pAmount = 0;
      tAmount = 0;
    } else if (bacaratData.result === 3) {
      tAmount = (tAmount * 8).toFixed(2);
      pAmount = 0;
      bAmount = 0;
    }
    let totalPayoutAmount = 0
     totalPayoutAmount = pAmount + bAmount + tAmount;
     let mutliplier = (totalPayoutAmount / totalAmount).toFixed(2);
    if (totalPayoutAmount == 0) {
      totalPayoutAmount = -totalAmount;
      mutliplier = 0
    }
    
    
    
    const newBet = new betsModel({
      amount: totalAmount,
      date: date,
      game: "Baccarat",
      multiplier: mutliplier,
      payout: totalPayoutAmount,
      timeStamp: timeStamp,
      baccarat: {
        history: bacaratData.history,
        result: bacaratData.result,
        playerAmount: bets.playerAmount,
        tieAmount: bets.tieAmount,
        bankerAmount: bets.bankerAmount,
        playerPayout: pAmount,
        tiePayout: tAmount,
        bankerPayout: bAmount,
      },
    });
    newBet.save();
    foundUser.wallet += parseFloat(totalPayoutAmount);
    foundUser.numOfBets += 1;
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
    if (totalAmount > totalPayoutAmount) {
      foundUser.losses += 1;
      const difference = totalAmount - totalPayoutAmount;
      foundUser.rakeback += difference * (foundUser.level / 100);
    }
    if (totalAmount < totalPayoutAmount) {
      foundUser.wins += 1;
    }
    foundUser.bets.push(newBet._id);
    if (foundUser.bets.length > 20) {
      const twentyBets = foundUser.bets.splice(-20);
      foundUser.bets = twentyBets;
    }
    foundUser.waggered += totalAmount;
    const recentObj = {
      type: "casino",
      name: "Baccarat",
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
      .json({ success: true, data: newBet, isLeveledUp: isLeveledUp })
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};
function getSixRandomCards() {
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
  const decks = 8;

  for (let i = 0; i < decks; i++) {
    for (let suit of suits) {
      for (let rank of ranks) {
        cards.push(suit + " " + rank);
      }
    }
  }

  cards.sort(() => Math.random() - 0.5);

  const selectedCards = cards.slice(0, 6);

  return selectedCards;
}



function baccaratOutcome(playerCards, bankerCards) {
  let history = [];
  function cardValue(cardString, isPlayer) {
    let card = cardString.split(" ")[1];
    function getValue(card) {
      switch (card) {
        case "A":
          return 1;
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
          return parseInt(card);
        case "10":
        case "J":
        case "Q":
        case "K":
          return 0;
        default:
          return 0;
      }
    }
    const value = getValue(card);
    history.push({
      isPlayer,
      value,
      card: cardString,
    });
    return value;
  }

  function totalPoints(cards, isPlayer) {
    let total = cards.reduce((acc, card) => acc + cardValue(card, isPlayer), 0);

    return total % 10;
  }

  let playerPoints = totalPoints([playerCards[0], playerCards[1]], true);

  let bankerPoints = totalPoints([bankerCards[0], bankerCards[1]], false);
  const history2 = history[1];
  history[1] = history[2];
  history[2] = history2;
  let playerDrawThirdCard = false;
  let bankerDrawThirdCard = false;

  if (playerPoints <= 5) {
    playerDrawThirdCard = true;
  } else if (bankerPoints <= 5) {
    bankerDrawThirdCard = true;
  } else {
    if (playerPoints > bankerPoints) {
      return { result: 1, history };
    } else if (bankerPoints > playerPoints) {
      return { result: 2, history };
    } else {
      return { result: 3, history };
    }
  }

  if (playerDrawThirdCard) {
    const playerThirdCardValue = cardValue(playerCards[2], true);
    playerPoints = (playerPoints + playerThirdCardValue) % 10;
    if (playerThirdCardValue >= 0 && playerThirdCardValue <= 9) {
      if (bankerPoints <= 2) {
        bankerDrawThirdCard = true;
      } else if (bankerPoints === 3 && playerThirdCardValue !== 8) {
        bankerDrawThirdCard = true;
      } else if (
        bankerPoints === 4 &&
        playerThirdCardValue >= 2 &&
        playerThirdCardValue <= 7
      ) {
        bankerDrawThirdCard = true;
      } else if (
        bankerPoints === 5 &&
        playerThirdCardValue >= 4 &&
        playerThirdCardValue <= 7
      ) {
        bankerDrawThirdCard = true;
      } else if (
        bankerPoints === 6 &&
        (playerThirdCardValue === 6 || playerThirdCardValue === 7)
      ) {
        bankerDrawThirdCard = true;
      }
    }
  }

  if (bankerDrawThirdCard) {
    const bankerThirdCardValue = playerDrawThirdCard
      ? cardValue(bankerCards[2], false)
      : cardValue(playerCards[2], false);

    if (bankerThirdCardValue >= 0 && bankerThirdCardValue <= 9) {
      bankerPoints = (bankerPoints + bankerThirdCardValue) % 10;
      if (bankerPoints === 3 && playerPoints !== 8) {
        return { result: 1, history };
      } else if (bankerPoints === 4 && playerPoints >= 2 && playerPoints <= 7) {
        return { result: 1, history };
      } else if (bankerPoints === 5 && playerPoints >= 4 && playerPoints <= 7) {
        return { result: 1, history };
      } else if (
        bankerPoints === 6 &&
        (playerPoints === 6 || playerPoints === 7)
      ) {
        return { result: 1, history };
      } else if (bankerPoints > playerPoints) {
        return { result: 2, history };
      } else if (bankerPoints < playerPoints) {
        return { result: 1, history };
      } else {
        return { result: 3, history };
      }
    }
  }

  if (!bankerDrawThirdCard || !playerDrawThirdCard) {
    if (playerPoints > bankerPoints) {
      return { result: 1, history };
    } else if (bankerPoints > playerPoints) {
      return { result: 2, history };
    } else {
      return { result: 23, history };
    }
  }
}
