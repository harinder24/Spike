import React, { useState } from "react";
import BgOpacity from "./BgOpacity";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { StageTwo } from "./Register";
export default function Signin({ setIsSignIn, setisLoading }) {
  const [error, setError] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const onClickHandler = () => {
    setIsSignIn(false);
  };
  return (
    <BgOpacity onClickHandler={onClickHandler}>
      {isForgotPassword ? (
        <ForgotPassWord
          setIsForgotPassword={setIsForgotPassword}
          error={error}
          onClickHandler={onClickHandler}
          setError={setError}
          setisLoading={setisLoading}
        />
      ) : (
        <SigninContent
          setisLoading={setisLoading}
          onClickHandler={onClickHandler}
          error={error}
          setError={setError}
          setIsForgotPassword={setIsForgotPassword}
        />
      )}
    </BgOpacity>
  );
}



function ForgotPassWord({ setIsForgotPassword, error, onClickHandler, setError, setisLoading }) {
    const [stage, setStage] = useState(1)
  return (
    <>
    {stage === 1 && <StageOne  setIsForgotPassword={setIsForgotPassword}
          error={error}
          onClickHandler={onClickHandler}/>}
          {stage === 2 && <StageTwo  setStage={setStage}
          setError={setError}
          setisLoading={setisLoading}
          onClickHandler={onClickHandler}
          error={error}/>}
          {stage === 3 && <StaheThree  setStage={setStage}
          setError={setError}
          setisLoading={setisLoading}
          onClickHandler={onClickHandler}
          error={error}/>}

    </>
  );
}

function StaheThree({setStage,setError,error, setisLoading, onClickHandler}) {
    return(
        <div className=" p-4 flex flex-col bg-sbg w-[500px] rounded-lg  max-[532px]:w-full overflow-y-auto relative  caret-transparent">
        <div className="flex flex-row items-center justify-between">
          <div
            onClick={() => setStage(1)}
            className="  text-stext hover:text-[#eee] cursor-pointer"
          >
            <ArrowBackIcon sx={{ fontSize: 20 }} />
          </div>
          <div className=" text-base font-semibold ">Forgot password</div>
          <div
            onClick={onClickHandler}
            className="   hover:text-[#eee] cursor-pointer"
          >
            <CloseIcon sx={{ fontSize: 20 }} />
          </div>
        </div>
  
        <div className=" text-sm font-semibold text-stext mt-6">Password*</div>
        <input className="customInput mt-1 px-4" type="password" />
        <div className=" text-sm font-semibold text-stext mt-6">Confirm Password*</div>
        <input className="customInput mt-1 px-4" type="password" />
  
        <div className="pt-4 text-error text-center text-xs h-8">{error}</div>
  
        <div className="w-full h-[52px] mt-4 max-[750px]:mt-auto rounded-[4px] shadow-custom bg-button2 hover:bg-buttonHover2 flex flex-row justify-center items-center cursor-pointer">
          <div className="text-black text-sm font-semibold ">Submit</div>
        </div>
      </div> 
    )
    
}

function StageOne({setIsForgotPassword, error, onClickHandler}){
    return(
        <div className=" p-4 flex flex-col bg-sbg w-[500px] rounded-lg  max-[532px]:w-full overflow-y-auto relative  caret-transparent">
      <div className="flex flex-row items-center justify-between">
        <div
          onClick={() => setIsForgotPassword(false)}
          className="  text-stext hover:text-[#eee] cursor-pointer"
        >
          <ArrowBackIcon sx={{ fontSize: 20 }} />
        </div>
        <div className=" text-base font-semibold ">Forgot password</div>
        <div
          onClick={onClickHandler}
          className="   hover:text-[#eee] cursor-pointer"
        >
          <CloseIcon sx={{ fontSize: 20 }} />
        </div>
      </div>

      <div className=" text-sm font-semibold text-stext mt-6">Email*</div>
      <input className="customInput mt-1 px-4" type="email" />

      <div className="pt-4 text-error text-center text-xs h-8">{error}</div>

      <div className="w-full h-[52px] mt-4 max-[750px]:mt-auto rounded-[4px] shadow-custom bg-button2 hover:bg-buttonHover2 flex flex-row justify-center items-center cursor-pointer">
        <div className="text-black text-sm font-semibold ">Continue</div>
      </div>
    </div>
    )
}

function SigninContent({
  onClickHandler,
  setisLoading,
  error,
  setError,
  setIsForgotPassword,
}) {
  return (
    <div className=" p-4 flex flex-col bg-sbg w-[500px] rounded-lg  max-[532px]:w-full overflow-y-auto relative  caret-transparent">
      <div className="flex flex-row items-center justify-between">
        <div className=" text-base font-semibold mx-auto">Sign in</div>
        <div
          onClick={onClickHandler}
          className=" self-end text-stext hover:text-[#eee] cursor-pointer"
        >
          <CloseIcon sx={{ fontSize: 20 }} />
        </div>
      </div>

      <div className=" text-sm font-semibold text-stext mt-6">Email*</div>
      <input className="customInput mt-1 px-4" type="email" />

      <div className=" text-sm font-semibold text-stext mt-4 ">Password*</div>

      <input className="customInput mt-1  px-4" type="password" />

      <div className="mt-4 text-sm font-semibold text-text flex flex-row justify-end">
        <div
          onClick={() => setIsForgotPassword(true)}
          className=" cursor-pointer"
        >
          Forgot password?
        </div>
      </div>

      <div className="pt-4 text-error text-center text-xs h-8">{error}</div>

      <div className="w-full h-[52px] mt-4 max-[750px]:mt-auto rounded-[4px] shadow-custom bg-button2 hover:bg-buttonHover2 flex flex-row justify-center items-center cursor-pointer">
        <div className="text-black text-sm font-semibold ">Sign in</div>
      </div>
    </div>
  );
}
