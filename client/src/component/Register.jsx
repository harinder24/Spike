import BgOpacity from "../component/BgOpacity";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
export default function Register({ setIsRegister, setisLoading }) {
  const [error, setError] = useState("");
  const [stage, setStage] = useState(2);
  const onClickHandler = () => {
    setIsRegister(false);
  };
  return (
    <BgOpacity onClickHandler={onClickHandler}>
      {stage === 1 && (
        <StageOne setisLoading={setisLoading} onClickHandler={onClickHandler} />
      )}
      {stage === 2 && (
        <StageTwo
          setStage={setStage}
          setisLoading={setisLoading}
          onClickHandler={onClickHandler}
        />
      )}
    </BgOpacity>
  );
}

function StageTwo({ onClickHandler, setStage, setisLoading }) {
    const email = "Hss.022002@gmail.com"
  return (
    <div className=" p-4 flex flex-col bg-sbg w-[500px] rounded-lg max-[750px]:h-full max-[750px]:w-full overflow-y-auto">
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
    </div>
  );
}

function StageOne({ onClickHandler, setisLoading }) {
  const [error, setError] = useState("");

  return (
    <div className=" p-4 flex flex-col bg-sbg w-[500px] rounded-lg max-[750px]:h-full max-[750px]:w-full overflow-y-auto relative max-[750px]:rounded-none ">
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

      <div className=" text-sm font-semibold text-stext mt-6">Email*</div>
      <input className="customInput mt-1" type="text" />
      <div className=" text-sm font-semibold text-stext mt-4">Username*</div>
      <input className="customInput mt-1" type="text" />
      <div className="text-xs text-stext mt-1">
        Your username must be 3-14 characters long.
      </div>
      <div className=" text-sm font-semibold text-stext mt-4 ">Password*</div>

      <input className="customInput mt-1 " type="text" />
      <div className="text-xs text-stext mt-1">
        Your password must be 6-18 characters long.
      </div>
      <div className="mt-4 text-xs text-text">
        Note: Since it's my personal project I will not be asking for any
        personal information like ID.
      </div>
      <div className="pt-4 text-error text-center text-xs h-8">{error}</div>

      <div className="w-full h-[52px] mt-4 max-[750px]:mt-auto rounded-[4px] shadow-custom bg-button2 hover:bg-buttonHover2 flex flex-row justify-center items-center cursor-pointer">
        <div className="text-black text-sm font-semibold ">Continue</div>
      </div>
    </div>
  );
}
