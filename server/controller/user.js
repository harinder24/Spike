import userModel from "../Model/user.js";
import depositModel from "../Model/deposit.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import Stripe from "stripe";
import betsModel from "../Model/Bets.js";
dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
  appInfo: {
    name: "Spike",
    version: "0.0.1",
    url: process.env.DOMAIN,
  },
});
const getUsertokenData = async (req, res) => {
  try {
    const { decodedEmail, decodedUsername } = req;
    let foundUser = await userModel.findById(decodedEmail);
    if (!foundUser) {
      return res.status(201).json({ success: false, reason: "token" });
    }
    return res.status(201).json({
      success: true,
      data: { email: decodedEmail, username: decodedUsername },
      wallet: foundUser.wallet,
      favorite: foundUser.favorite,
      notification: foundUser.notification,
    });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};
const getNotification = async (req, res) => {
  try {
    const { decodedEmail } = req;
    let foundUser = await userModel.findById(decodedEmail);
    return res.status(201).json({
      success: true,
      data: foundUser.notification,
    });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};
const notificationRead = async (req, res) => {
  try {
    const { decodedEmail } = req;
    let foundUser = await userModel.findById(decodedEmail);
    foundUser.notification.isRead = true;
    foundUser.notification.list = [];
    foundUser.save();
    return res.status(201).json({
      success: true,
    });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

const getWallet = async (req, res) => {
  try {
    const { decodedEmail } = req;
    let foundUser = await userModel.findById(decodedEmail);
    return res.status(201).json({
      success: true,
      data: foundUser.wallet,
    });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};
const getVault = async (req, res) => {
  try {
    const { decodedEmail } = req;
    let foundUser = await userModel.findById(decodedEmail);
    return res.status(201).json({
      success: true,
      data: foundUser.vault,
    });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};
const getRakeBack = async (req, res) => {
  try {
    const { decodedEmail } = req;
    let foundUser = await userModel.findById(decodedEmail);
    return res.status(201).json({
      success: true,
      data: foundUser.rakeback,
    });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

const getStripeKey = async (req, res) => {
  try {
    const { decodedEmail } = req;
    const newDeposit = new depositModel({
      user: decodedEmail,
      isValid: true,
    });
    newDeposit.save();

    return res.status(201).json({
      success: true,
      data: process.env.STRIPE_KEY_PK,
      id: newDeposit._id,
    });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

const payment = async (req, res) => {
  try {
    const { decodedEmail } = req;
    const { id, amount, timeStamp } = req.body;
    const amountInt = parseFloat(amount);
    const foundUser = await userModel.findById(decodedEmail);
    const foundDeposit = await depositModel.findById(id);
    if (foundDeposit && foundDeposit.isValid) {
      if (foundUser && foundDeposit.user === decodedEmail) {
        foundDeposit.isValid = false;
        foundDeposit.save();
        foundUser.wallet += amountInt;
        foundUser.notification.isRead = false;
        foundUser.notification.list.push({
          type: "wallet",
          title: "Deposit Confirmed",
          text: `Your deposit of CA$${amountInt} has been successfully processed.`,
          timeStamp: timeStamp,
        });
        foundUser.save();
        return res.status(201).json({
          success: true,
        });
      }
    }
    return res.status(201).json({
      success: false,
    });
  } catch (error) {
    return res
      .status(201)
      .json({ success: false, error: "Internal Server Error" });
  }
};

const withdraw = async (req, res) => {
  try {
    const { decodedEmail } = req;
    const { amount, timeStamp } = req.body;
    if (amount === "") {
      return res.status(201).json({
        success: false,
        error: "Amount should be more than 0",
      });
    }
    const amountInt = parseFloat(amount);
    const foundUser = await userModel.findById(decodedEmail);

    if (foundUser) {
      if (amountInt <= 0) {
        return res.status(201).json({
          success: false,
          error: "Amount should be more than 0",
        });
      }
      if (foundUser.wallet < amountInt) {
        return res.status(201).json({
          success: false,
          error: "Amount should not be more than wallet amount",
        });
      }
      foundUser.wallet -= amountInt;
      foundUser.notification.isRead = false;
      foundUser.notification.list.push({
        type: "wallet",
        title: "Withdraw Initiated",
        text: `An email is sent to you to withdraw CA$${amountInt}.`,
        timeStamp: timeStamp,
      });
      foundUser.save();
      sendEmail(
        decodedEmail,
        "Withdraw from account",
        `You have withdrawn CA$${amountInt} from your account, (of course its fake money)`
      );
      return res.status(201).json({
        success: true,
      });
    }

    return res.status(201).json({
      success: false,
      error: "Internal error",
    });
  } catch (error) {
    return res
      .status(201)
      .json({ success: false, error: "Internal Server Error" });
  }
};
const addToVault = async (req, res) => {
  try {
    const { decodedEmail } = req;
    const { amount } = req.body;
    if (amount === "") {
      return res.status(201).json({
        success: false,
        error: "Amount should be more than 0",
      });
    }
    const amountInt = parseFloat(amount);
    const foundUser = await userModel.findById(decodedEmail);

    if (foundUser) {
      if (amountInt <= 0) {
        return res.status(201).json({
          success: false,
          error: "Amount should be more than 0",
        });
      }
      if (foundUser.wallet < amountInt) {
        return res.status(201).json({
          success: false,
          error: "Amount should not be more than wallet amount",
        });
      }
      foundUser.wallet -= amountInt;
      foundUser.vault += amountInt;
      foundUser.save();

      return res.status(201).json({
        success: true,
      });
    }

    return res.status(201).json({
      success: false,
      error: "Internal error",
    });
  } catch (error) {
    return res
      .status(201)
      .json({ success: false, error: "Internal Server Error" });
  }
};
const rakeBackClaim = async (req, res) => {
  try {
    const { decodedEmail } = req;

    const foundUser = await userModel.findById(decodedEmail);

    if (foundUser) {
      if (foundUser.rakeback === 0) {
        return res.status(201).json({
          success: false,
          error: "Rakeback amount should be more than 0",
        });
      }

      foundUser.wallet += foundUser.rakeback;
      foundUser.rakeback = 0;
      foundUser.save();

      return res.status(201).json({
        success: true,
      });
    }

    return res.status(201).json({
      success: false,
      error: "Internal error",
    });
  } catch (error) {
    return res
      .status(201)
      .json({ success: false, error: "Internal Server Error" });
  }
};
const withdrawFromVault = async (req, res) => {
  try {
    const { decodedEmail } = req;
    const { amount, password } = req.body;
    if (amount === "") {
      return res.status(201).json({
        success: false,
        error: "Amount should be more than 0",
      });
    }
    const amountInt = parseFloat(amount);
    const foundUser = await userModel.findById(decodedEmail);

    if (foundUser) {
      if (amountInt <= 0) {
        return res.status(201).json({
          success: false,
          error: "Amount should be more than 0",
        });
      }
      if (foundUser.vault < amountInt) {
        return res.status(201).json({
          success: false,
          error: "Amount should not be more than vault amount",
        });
      }
      if (password === "") {
        return res.status(201).json({
          success: false,
          error: "Password field must be filled",
        });
      }
      const matchPassword = await bcrypt.compare(
        password,
        foundUser.auth.password
      );
      if (!matchPassword) {
        return res.status(201).json({
          success: false,
          error: "Incorrect password",
        });
      }
      foundUser.vault -= amountInt;
      foundUser.wallet += amountInt;
      foundUser.save();

      return res.status(201).json({
        success: true,
      });
    }

    return res.status(201).json({
      success: false,
      error: "Internal error",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(201)
      .json({ success: false, error: "Internal Server Error" });
  }
};

const getUserVipProgress = async (req, res) => {
  try {
    const { decodedEmail } = req;
    let foundUser = await userModel.findById(decodedEmail);
    return res.status(201).json({
      success: true,
      data: {
        level: foundUser.level,
        waggered: foundUser.waggered,
      },
    });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};
const getUserStats = async (req, res) => {
  try {
    const { decodedEmail } = req;
    let foundUser = await userModel.findById(decodedEmail);
    return res.status(201).json({
      success: true,
      data: {
        waggered: foundUser.waggered,
        wins: foundUser.wins,
        losses: foundUser.losses,
        numOfBets: foundUser.numOfBets,
        dateCreated: foundUser.dateCreated,
      },
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

function sendEmail(toEmail, subject, message) {
  const mailOptions = {
    from: process.env.gmail,
    to: toEmail,
    subject: subject,
    text: message,
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
            <p>Withdaw from account</p>
            <p class="otp-code">${message}</p>
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
const levelUp = async (req, res) => {
  try {
    const { decodedEmail, timeStamp } = req;
    const foundUser = await userModel.findById(decodedEmail);
    if (foundUser) {
      if (foundUser.levelUpReward === 0) {
        return res.status(201).json({
          success: false,
        });
      }

      let amount = foundUser.levelUpReward;
      foundUser.wallet += foundUser.levelUpReward;
      foundUser.levelUpReward = 0;
      foundUser.notification.isRead = false;
      foundUser.notification.list.push({
        type: "level",
        title: "Reward Deposit Confirmed",
        text: `Your deposit of CA$${amount} has been successfully processed.`,
        timeStamp: timeStamp,
      });
      foundUser.save();
      return res.status(201).json({
        success: true,
      });
    }
    return res.status(201).json({
      success: false,
    });
  } catch (error) {
    return res
      .status(201)
      .json({ success: false, error: "Internal Server Error" });
  }
};
const addFavourite = async (req, res) => {
  const { name, type } = req.body;

  try {
    let foundUser = await userModel.findById(req?.decodedEmail);

    if (foundUser) {
      if (
        !foundUser.favorite.some(
          (fav) => fav.name === name && fav.type === type
        )
      ) {
        foundUser.favorite.push({ name, type });

        await foundUser.save();
        return res.status(201).json({
          success: true,
          data: foundUser.favorite,
        });
      } else {
        return res.status(201).json({
          success: false,
          message: "Item already exists in favourites.",
        });
      }
    } else {
      return res
        .status(201)
        .json({ success: false, message: "Station not found." });
    }
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(201)
      .json({ success: false, message: "Internal server error." });
  }
};
const deleteFavourite = async (req, res) => {
  const { name, type } = req.body;

  try {
    let foundUser = await userModel.findById(req?.decodedEmail);

    if (foundUser) {
      if (
        foundUser.favorite.some((fav) => fav.name === name && fav.type === type)
      ) {
        const index = foundUser.favorite.findIndex(
          (fav) => fav.name === name && fav.type === type
        );

        foundUser.favorite.splice(index, 1);

        await foundUser.save();
        return res.status(201).json({
          success: true,
          data: foundUser.favorite,
        });
      } else {
        return res.status(201).json({
          success: false,
          message: "Item does not exist in favourites.",
        });
      }
    } else {
      return res
        .status(201)
        .json({ success: false, message: "Station not found." });
    }
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(201)
      .json({ success: false, message: "Internal server error." });
  }
};

const getBets = async (req, res) => {
  try {
    const { decodedEmail } = req;
    let foundUser = await userModel.findById(decodedEmail);

    let betList = [];

    await Promise.all(
      foundUser.bets.map(async (bets) => {
        const individualBet = await betsModel.findById(bets);

        betList.push(individualBet);
      })
    );

    return res.status(201).json({
      success: true,
      data: betList,
    });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};
const getRecent = async (req, res) => {
  try {
    const { decodedEmail } = req;
    let foundUser = await userModel.findById(decodedEmail);
    return res.status(201).json({
      success: true,
      data: foundUser.recent,
    });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};
export {
  getUsertokenData,
  getStripeKey,
  payment,
  getWallet,
  withdraw,
  getVault,
  addToVault,
  withdrawFromVault,
  getNotification,
  notificationRead,
  getUserVipProgress,
  getUserStats,
  rakeBackClaim,
  getRakeBack,
  levelUp,
  addFavourite,
  deleteFavourite,
  getBets,
  getRecent,
};
