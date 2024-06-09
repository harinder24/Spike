import userModel from "../Model/user.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

dotenv.config();

const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

async function formatVerification(
  email,
  password,
  username,
  isUserName = false
) {
  if (email === "") {
    return {
      error: "Email address field is empty",
      success: false,
      fault: "email",
    };
  }
  if (!emailFormat.test(email)) {
    return {
      error: "Invalid email address",
      success: false,
      fault: "email",
    };
  }
  if (isUserName) {
    if (username === "") {
      return {
        error: "Username field is empty",
        success: false,
        fault: "username",
      };
    }
    if (username.length < 3 || username.length > 14) {
      return {
        error: "Username must be 3-14 characters long",
        success: false,
        fault: "username",
      };
    }
  }

  if (password === "") {
    return {
      error: "Password field is empty",
      success: false,
      fault: "password",
    };
  }
  if (password.length < 6 || password.length > 18) {
    return {
      error: "Password must be 6-18 characters long",
      success: false,
      fault: "password",
    };
  }

  return {
    success: true,
  };
}

const register = async (req, res) => {
  const { email, password, username,date } = req.body;
  const verificationResult = await formatVerification(
    email,
    password,
    username,
    true
  );

  if (!verificationResult.success) {
    return res.status(200).json(verificationResult);
  }
  const otpCode = generateRandom4DigitNumber();
  const encryptPassword = await bcrypt.hash(password, 10);
  const currentTimestamp = Date.now();

  try {
    let foundUser = await userModel.findById( email );

    if (foundUser) {
      if (foundUser.auth.isInitAuthComplete === true) {
        return res.status(201).json({
          error: "Email address is already linked to an account",
          success: false,
          fault: "none",
        });
      } else {
        foundUser.username = username;
        foundUser.auth.password = encryptPassword;
        foundUser.auth.otp = otpCode;
        foundUser.auth.isOtpValid = true;
        foundUser.auth.otpTimeStamp = currentTimestamp;
        foundUser.auth.isOtpIncorrect = 0;
        foundUser.dateCreated = date
        await foundUser.save();
        sendEmail(email, "Spike OTP", otpCode);
        return res.status(202).json({ success: true });
      }
    } else {
      const newUser = new userModel({
        _id: email,
        username: username,
        auth: {
          email: email,
          password: encryptPassword,
          otp: otpCode,
          isOtpValid: true,
          otpTimeStamp: currentTimestamp,
          isOtpIncorrect: 0,
          isInitAuthComplete: false,
        },
        dateCreated: date
      });

      await newUser.save();
      sendEmail(email, "Spike OTP", otpCode);
      return res.status(202).json({ success: true });
    }
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;
  const verificationResult = await formatVerification(email, password);
  const currentTimestamp = Date.now();
  if (!verificationResult.success) {
    return res.status(200).json(verificationResult);
  }
  try {
    let foundUser = await userModel.findById( email );

    if (foundUser) {
      if (foundUser.auth.isInitAuthComplete === true) {
        const matchPassword = await bcrypt.compare(password, foundUser.auth.password);
       
        if (matchPassword) {
          const info = {
            email: foundUser.auth.email,
            username: foundUser.username,
            timeStamp: currentTimestamp,
          };
          const token = jwt.sign(info, process.env.TOKEN_SECRET);
          return res.status(201).json({
            success: true,
            token: token,
          });
        } else {
          return res.status(201).json({
            error: "Wrong email or password",
            success: false,
            fault: "none",
          });
        }
      } else {
        return res.status(201).json({
          error: "Wrong email or password",
          success: false,
          fault: "none",
        });
      }
    } else {
      return res.status(201).json({
        error: "Account with this email does not exist",
        success: false,
        fault: "none",
      });
    }
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

const otpResend = async (req, res) => {
  const { email } = req.body;

  const otpCode = generateRandom4DigitNumber();

  const currentTimestamp = Date.now();
  try {
    let foundUser = await userModel.findById( email );

    if (foundUser) {
      foundUser.auth.otp = otpCode;
      foundUser.auth.isOtpValid = true;
      foundUser.auth.otpTimeStamp = currentTimestamp;
      foundUser.auth.isOtpIncorrect = 0;
      await foundUser.save();
      sendEmail(email, "Spike OTP", otpCode);
      return res.status(202).json({ success: true });
    }
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};
const otpValidation = async (req, res) => {
  const { email, otp } = req.body;
  if (otp === "") {
    return res.status(201).json({ success: false, error: "Invalid Code" });
  }

  const currentTimestamp = Date.now();
  try {
    let foundUser = await userModel.findById( email );

    if (foundUser) {
      if (foundUser.auth.isOtpValid === true) {
        if (
          isNextTimestampWithin30Minutes(
            currentTimestamp,
            foundUser.auth.otpTimeStamp
          )
        ) {
          if (foundUser.auth.isOtpIncorrect <= 3) {
            let incorrect = foundUser.auth.isOtpIncorrect;
            incorrect = incorrect + 1;
            foundUser.auth.isOtpIncorrect = incorrect;
            if (foundUser.auth.otp === parseInt(otp)) {
              foundUser.auth.isOtpValid = false;
              if(!foundUser.auth.isInitAuthComplete){
                foundUser.auth.isInitAuthComplete = true
              }
              await foundUser.save();

              const info = {
                email: foundUser.auth.email,
                username: foundUser.username,
                timeStamp: currentTimestamp,
              };
              const token = jwt.sign(info, process.env.TOKEN_SECRET);
              return res.status(201).json({
                success: true,
                token: token,
              });
            } else {
              await foundUser.save();
              return res
                .status(201)
                .json({ success: false, error: "Invalid Code" });
            }
          } else {
            foundUser.auth.isOtpValid = false;
            await foundUser.save();
            return res.status(201).json({
              success: false,
              error: "Code expired after multiple failed entries",
            });
          }
        } else {
          foundUser.auth.isOtpValid = false;
          await foundUser.save();
          return res
            .status(201)
            .json({ success: false, error: "Invalid or expired Code" });
        }
      } else {
        return res
          .status(201)
          .json({ success: false, error: "Invalid or expired Code" });
      }
    }
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

const forgetPassword = async (req, res) => {
  const { email } = req.body;

  if (email === "") {
    return res.status(200).json({
      error: "Email address field is empty",
      success: false,
    });
  }
  if (!emailFormat.test(email)) {
    return res.status(200).json({
      error: "Invalid email address",
      success: false,
    });
  }
  const otpCode = generateRandom4DigitNumber();

  const currentTimestamp = Date.now();
  try {
    let foundUser = await userModel.findById( email );

    if (foundUser) {
      if (foundUser.auth.isInitAuthComplete === true) {
        foundUser.auth.otp = otpCode;
        foundUser.auth.isOtpValid = true;
        foundUser.auth.otpTimeStamp = currentTimestamp;
        foundUser.auth.isOtpIncorrect = 0;
        await foundUser.save();
        sendEmail(email, "Spike OTP", otpCode);

        return res.status(200).json({
          success: true,
        });
      } else {
        return res.status(200).json({
          error: "Account with this email does not exist",
          success: false,
        });
      }
    } else {
      return res.status(200).json({
        error: "Account with this email does not exist",
        success: false,
      });
    }
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};
async function changePassword(req, res) {
  try {
    const { email, password, confirmPassword } = req.body;
    if (password === "") {
      return res.status(200).json({
        error: "Password field is empty",
        success: false,
      });
    }
    if (password.length < 6 || password.length > 18) {
      return res.status(200).json({
        error: "Password must be 6-18 characters long",
        success: false,
      });
    }
    if (confirmPassword === "") {
      return res.status(200).json({
        error: "Confirm password field is empty",
        success: false,
      });
    }

    if (confirmPassword.length < 6 || confirmPassword.length > 18) {
      return res.status(200).json({
        error: "Confirm password must be 6-18 characters long",
        success: false,
      });
    }
    if (confirmPassword !== password) {
      return res.status(200).json({
        error: "Confirm password and password must match",
        success: false,
      });
    }
    let foundUser = await userModel.findById( email );

    if (foundUser) {
      const encryptPassword = await bcrypt.hash(password, 10);
      foundUser.auth.password = encryptPassword;
      await foundUser.save();
      const currentTimestamp = Date.now();
      const info = {
        email: foundUser.auth.email,
        username: foundUser.username,
        timeStamp: currentTimestamp,
      };
      const token = jwt.sign(info, process.env.TOKEN_SECRET);
      return res.status(201).json({
        success: true,
        token: token,
      });
    }
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
}

function isNextTimestampWithin30Minutes(currentTimestamp, prevTimestamp) {
  prevTimestamp = prevTimestamp + 30 * 60 * 1000;

  if (currentTimestamp <= prevTimestamp) {
    return true;
  } else {
    return false;
  }
}

function generateRandom4DigitNumber() {
  const randomNumber = Math.floor(Math.random() * 10000);

  const fourDigitNumber = randomNumber.toString().padStart(4, "0");

  return fourDigitNumber;
}
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
            <p>Your OTP code is:</p>
            <p class="otp-code">${message}</p>
            <p>This code will expire in 30 minutes</p>
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
export {
  register,
  signIn,
  otpValidation,
  otpResend,
  forgetPassword,
  changePassword,
};
