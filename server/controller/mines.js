import userModel from "../Model/user.js";
import betsModel from "../Model/Bets.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const getUserMineActiveId = async (req, res) => {
  try {
    const { decodedEmail } = req;
    let foundUser = await userModel.findById(decodedEmail);
    const recentObj = {
      type: "games",
      name: "Mines",
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
    return res.status(201).json({
      success: true,
      data: foundUser.isMineActive,
    });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};
export const setMineBet = async (req, res) => {
  try {
    const { date, mines, amount, timeStamp } = req.body;
    const { decodedEmail } = req;
    let foundUser = await userModel.findById(decodedEmail);
    if (foundUser.isMineActive) {
      return res
        .status(201)
        .json({ success: false, error: "Bet is already active" });
    }
    if (amount === "") {
      return res.status(201).json({
        success: false,
        error: "Amount should be more than 0",
      });
    }
    const parseAmount = parseFloat(amount);
    if (parseAmount <= 0) {
      return res
        .status(201)
        .json({ success: false, error: "Amount should be more than 0" });
    }
    if (amount > foundUser.wallet) {
      return res
        .status(201)
        .json({
          success: false,
          error: "Amount should not be more than wallet amount",
        });
    }
    if (mines < 1 || mines > 24) {
      return res
        .status(201)
        .json({ success: false, error: "Mines should be between 1 to 24" });
    }
    const minesBoolList = createBooleanArray(mines);
    const newBet = new betsModel({
      amount: parseAmount,
      date: date,
      game: "Mines",
      multiplier: 1.0,
      payout: parseAmount,
      timeStamp: timeStamp,
      mines: {
        isCompleted: false,
        gems: 25 - mines,
        mines: mines,
        minesArray: minesBoolList,
      },
    });
    newBet.save();
    foundUser.wallet -= parseAmount;
    foundUser.waggered += parseAmount;
    foundUser.numOfBets += 1;
    foundUser.isMineActive = newBet._id;
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

export const getBetData = async (req, res) => {
  try {
    const { id } = req.body;
    let foundBet = await betsModel.findById(id);
    let mineArr = [];
    if (foundBet.mines.isCompleted) {
      mineArr = foundBet.mines.minesArray;
    }
    const data = {
      amount: foundBet.amount,
      multiplier: foundBet.multiplier,
      payout: foundBet.payout,
      recent: foundBet.mines.recent,
      clicked: foundBet.mines.clicked,
      isCompleted: foundBet.mines.isCompleted,
      mines: foundBet.mines.mines,
      gems: foundBet.mines.gems,
      minesArray: mineArr,
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
export const mineClick = async (req, res) => {
  try {
    const { id, index } = req.body;
    const { decodedEmail } = req;

    let foundBet = await betsModel.findById(id);
    if (foundBet.mines.isCompleted) {
      return res
        .status(201)
        .json({ success: false, error: "Bet already completed" });
    }

    const bool = foundBet.mines.minesArray[index];
    foundBet.mines.clicked.push({
      isGem: bool,
      index: index,
    });
    foundBet.mines.recent = {
      isGem: bool,
      index: index,
    };
    if (bool) {
      foundBet.mines.gems -= 1;
      let numOfTiles =
        foundBet.mines.mines +
        (25 - foundBet.mines.mines - foundBet.mines.gems);

      let multiplier = 1.035;
      while (numOfTiles !== 1) {
        let increase = multiplier * 0.058;
        multiplier = multiplier + increase;
        numOfTiles--;
      }
      let payout = (multiplier * foundBet.amount).toFixed(2);
      multiplier = multiplier.toFixed(2);
      foundBet.multiplier = multiplier;
      foundBet.payout = payout;
    } else {
      foundBet.multiplier = 0;
      foundBet.payout = -foundBet.amount;
      foundBet.mines.isCompleted = true;
      foundBet.mines.mines -= 1;
      let foundUser = await userModel.findById(decodedEmail);
      foundUser.rakeback += foundBet.amount * (foundUser.level / 100);
      foundUser.bets.push(foundBet._id);
      if (foundUser.bets.length > 20) {
        const twentyBets = foundUser.bets.splice(-20)
        foundUser.bets = twentyBets
      }
      foundUser.isMineActive = "";
      foundUser.losses += 1;
      foundUser.save();
    }
    foundBet.save();
    let mineArr = [];
    if (foundBet.mines.isCompleted) {
      mineArr = foundBet.mines.minesArray;
    }
    const data = {
      amount: foundBet.amount,
      multiplier: foundBet.multiplier,
      payout: foundBet.payout,
      recent: foundBet.mines.recent,
      clicked: foundBet.mines.clicked,
      isCompleted: foundBet.mines.isCompleted,
      mines: foundBet.mines.mines,
      gems: foundBet.mines.gems,
      minesArray: mineArr,
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
export const checkout = async (req, res) => {
  try {
    const { id } = req.body;
    const { decodedEmail } = req;

    let foundBet = await betsModel.findById(id);
    let foundUser = await userModel.findById(decodedEmail);
    if (foundBet.mines.isCompleted) {
      return res
        .status(201)
        .json({ success: false, error: "Bet already completed" });
    }
    if (foundBet.mines.clicked.length === 0) {
      return res
        .status(201)
        .json({ success: false, error: "Must click on tile to checkout" });
    }
    foundUser.wallet += foundBet.payout;
    foundUser.wins += 1;
    foundUser.bets.push(foundBet._id);
    if (foundUser.bets.length > 20) {
      const twentyBets = foundUser.bets.splice(-20)
      foundUser.bets = twentyBets
    }
    foundUser.isMineActive = "";
    foundUser.save();
    foundBet.mines.isCompleted = true;
    foundBet.save();
    const data = {
      amount: foundBet.amount,
      multiplier: foundBet.multiplier,
      payout: foundBet.payout,
      recent: foundBet.mines.recent,
      clicked: foundBet.mines.clicked,
      isCompleted: foundBet.mines.isCompleted,
      mines: foundBet.mines.mines,
      gems: foundBet.mines.gems,
      minesArray: foundBet.mines.minesArray,
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

const transporter = nodemailer.createTransport({
  service: "Gmail",
  port: 465,
  secure: true,
  auth: {
    user: process.env.gmail,
    pass: process.env.gmailPassword,
  },
});

function sendLevelUpEmail(toEmail) {
  const mailOptions = {
    from: process.env.gmail,
    to: toEmail,
    subject: "Level up",
    text: "Congrats on leveling up",
    html: ` <html>
          <head>
            <style>
  
              body {
                font-family: Arial, sans-serif;
                background-color: black;
                padding: 20px;
                color: black;
              }
              .container {
  
                border-radius: 5px;
                padding: 20px;
              }
              @media (prefers-color-scheme: dark) {
                .body {
                  color: white;
                }
              }
              .green{
                color: rgb(14,165,233)
              }
              p {
                font-size: 18px;
                margin-bottom: 20px;
              }
              .otp-code {
                font-size: 36px;
                font-weight: bold;
                color: #15803d;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h1><span class="green">SPIKE</span></h1>
              <p>Click to get level up reward:</p>

            <a href= "https://spikecasino.netlify.app/levelup">Level up reward</a>
            </div>
          </body>
        </html>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
}
function createBooleanArray(num) {
  const array = new Array(25).fill(true);

  let arrOfIndex = [];
  let randomIndex = Math.floor(Math.random() * 25);
  array[randomIndex] = false;
  arrOfIndex.push(randomIndex);
  while (arrOfIndex.length < num) {
    randomIndex = Math.floor(Math.random() * 25);
    array[randomIndex] = false;
    if (!arrOfIndex.includes(randomIndex)) {
      arrOfIndex.push(randomIndex);
    }
  }

  return array;
}
