import BgOpacity from "../layout/BgOpacity";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import OtpInput from "react-otp-input";
import { otpResend, otpValidation, registerApi } from "../../api/auth";
import serverLink from "../../../serverlink";
import axios from "axios";
import { useAuth } from "../layout/AuthProvider";
export default function Register({ setIsRegister, setisLoading }) {

  const [stage, setStage] = useState(1);
  const [email, setEmail] = useState("");
  const onClickHandler = () => {
    setIsRegister(false);
  };
  return (
    <BgOpacity onClickHandler={onClickHandler}>
      {stage === 1 && (
        <StageOne
        
          setisLoading={setisLoading}
          onClickHandler={onClickHandler}
       
          email={email}
          setEmail={setEmail}
          setStage={setStage}
        />
      )}
      {stage === 2 && (
        <StageTwo
          setStage={setStage}
      
          setisLoading={setisLoading}
          onClickHandler={onClickHandler}
        
          email={email}
          setAuth={true}
        />
      )}
    </BgOpacity>
  );
}

export function StageTwo({
  onClickHandler,
  setStage,
  setisLoading,

  email,
  setAuth = false
}) {
  const [error, setError] = useState("");
  const [otp, setOtp] = useState("");
  const {updateUserData} = useAuth()
  const [timer, setTimer] = useState(9);

  const resendHandler = async () => {
    setOtp("");
    setError("");
    setisLoading(true);
    try {
      await otpResend()
      setisLoading(false);
      setTimer(9);
    } catch (error) {
      console.error("Network error:", error);
      setisLoading(false);
    }
  };

  const submitOtp = async () => {
    setisLoading(true);
    setError("");
    try {
      const res = await otpValidation(email, otp)
 
      if (res.success) {
       
        setisLoading(false);
        if(setAuth){
          localStorage.setItem("spikeToken", JSON.stringify(res.token));
          updateUserData(res.token)
          onClickHandler();
        }else{
          setStage(3)
          
        }
       
      } else {
        setisLoading(false);
        setError(res.error);
      }
    } catch (error) {
      setisLoading(false);
      console.error("Error sending email:", error);
    }
  };
  // const handleCloseOtp = () => {
  //   setOtp();
  //   setShowModal(false);
  // };

  useEffect(() => {
    if (timer == 0) return;
    setTimeout(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
  }, [timer]);

  useEffect(() => {
    if (otp.length === 4) {
      submitOtp();
    }
  }, [otp]);

  return (
    <div className=" p-4 flex flex-col bg-sbg w-[500px] rounded-lg  max-[532px]:w-full overflow-y-auto caret-transparent">
      <div className="flex flex-row items-center justify-between">
        <div
          onClick={() => setStage(1)}
          className="  text-stext hover:text-[#eee] cursor-pointer"
        >
          <ArrowBackIcon sx={{ fontSize: 20 }} />
        </div>
        <div className=" text-base font-semibold ">OTP verification</div>
        <div
          onClick={onClickHandler}
          className="   hover:text-[#eee] cursor-pointer"
        >
          <CloseIcon sx={{ fontSize: 20 }} />
        </div>
      </div>
      <div className=" mt-6 text-sm text-stext">
        Enter the 4-digit code sent you at: {email}
      </div>
      <div className=" flex flex-row justify-center mt-4">
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={4}
          shouldAutoFocus={true}
          containerStyle={
            "w-full max-w-[350px] flex flex-row gap-6 justify-evenly max-[320px]:gap-4"
          }
          inputStyle={
            " rounded-[4px] h-[52px] border-[2px] focus-visible:outline-none bg-bg border-[#2f4553] hover:border-[#557086] focus-visible:border-[#557086] max-[320px]:h-[46px] max-[320px]:min-w-[46px]  shadow-custom   text-[#eee] min-w-[52px] caret-[#eee]"
          }
          inputType="number"
          renderInput={(props) => {
            return <input {...props} />;
          }}
        />
      </div>
      <div className="text-xs text-stext  mt-4 ">
        Tip: Make sure to check your inbox or spam folders
      </div>
      <div className="w-full h-4 text-center text-xs text-error  mt-2">
        {error ? error : ""}
      </div>
      <div className="mt-4 max-[750px]:mt-auto h-[52px] max-[320px]:h-[46px] flex flex-row justify-between ">
        <button
          onClick={resendHandler}
          disabled={timer}
          className="px-4 h-full   rounded-[4px] text-sm font-semibold "
        >
          Resend
          {timer ? ` 0:0${timer}` : ""}{" "}
        </button>

        <div onClick={submitOtp} className="px-4 h-full   rounded-[4px] shadow-custom bg-button2 hover:bg-buttonHover2 flex flex-row justify-center items-center cursor-pointer">
          <div className="text-black text-sm font-semibold ">Submit</div>
        </div>
      </div>
    </div>
  );
}
//bg-lightMode-tbg  border-lightMode-border  h-[52px] flex-1 max-w-[52px] border-[2px]  focus-visible:border-lightMode-button  caret-lightMode-p dark:caret-darkMode-p focus-visible:outline-none text-lightMode-header dark:text-darkMode-header rounded-lg text-2xl
function StageOne({
  onClickHandler,
  setisLoading,

  email,
  setEmail,
  setStage,
}) {
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setError("");
    setisLoading(true);
    const result = await registerApi(email, username, password);
    setisLoading(false);

    if (result.success) {
      setStage(2);
    } else {
      setError(result.error);
    }
  };
  return (
    <div className=" p-4 flex flex-col bg-sbg w-[500px] rounded-lg  max-[532px]:w-full overflow-y-auto relative  caret-transparent">
      <div className="flex flex-row items-center justify-between">
        <div className=" text-base font-semibold mx-auto">
          Create an Account
        </div>
        <div
          onClick={onClickHandler}
          className=" self-end text-stext hover:text-[#eee] cursor-pointer"
        >
          <CloseIcon sx={{ fontSize: 20 }} />
        </div>
      </div>
      <form onSubmit={onSubmitHandler} autoComplete="off">
        <div className=" text-sm font-semibold text-stext mt-6">Email*</div>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="customInput mt-1 px-4"
          type="email"
          autoComplete="email"
        />
        <div className=" text-sm font-semibold text-stext mt-4">Username*</div>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="customInput mt-1 px-4"
          type="text"
          autoComplete="obvkkcuiff"
        />
        <div className="text-xs text-stext mt-1">
          Your username must be 3-14 characters long.
        </div>
        <div className=" text-sm font-semibold text-stext mt-4 ">Password*</div>

        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="customInput mt-1  px-4"
          type="password"
          autoComplete="off"
        />
        <div className="text-xs text-stext mt-1">
          Your password must be 6-18 characters long.
        </div>
        <div className="mt-4 text-xs text-text">
          Note: Since it's my personal project I will not be asking for any
          personal information like ID.
        </div>
        <div className="pt-4 text-error text-center text-xs h-8">{error}</div>

        <button className="w-full h-[52px] mt-4 max-[750px]:mt-auto rounded-[4px] shadow-custom bg-button2 hover:bg-buttonHover2 flex flex-row justify-center items-center cursor-pointer text-black text-sm font-semibold">
          Continue
        </button>
      </form>
    </div>
  );
}
