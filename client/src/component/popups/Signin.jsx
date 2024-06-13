import React, { useState } from "react";
import BgOpacity from "../layout/BgOpacity";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { StageTwo } from "./Register";
import {
  confirmPasswordApi,
  forgetPasswordApi,
  signInApi,
} from "../../api/auth";
import { useAuth } from "../layout/AuthProvider";
export default function Signin({ setIsSignIn, setisLoading }) {
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const onClickHandler = () => {
    setIsSignIn(false);
  };
  return (
    <BgOpacity onClickHandler={onClickHandler}>
      {isForgotPassword ? (
        <ForgotPassWord
          setIsForgotPassword={setIsForgotPassword}
          onClickHandler={onClickHandler}
          setisLoading={setisLoading}
        />
      ) : (
        <SigninContent
          setisLoading={setisLoading}
          onClickHandler={onClickHandler}
          setIsForgotPassword={setIsForgotPassword}
        />
      )}
    </BgOpacity>
  );
}

function ForgotPassWord({ setIsForgotPassword, onClickHandler, setisLoading }) {
  const [stage, setStage] = useState(1);
  const [email, setEmail] = useState("");
  return (
    <>
      {stage === 1 && (
        <StageOne
          setIsForgotPassword={setIsForgotPassword}
          onClickHandler={onClickHandler}
          email={email}
          setEmail={setEmail}
          setStage={setStage}
          setisLoading={setisLoading}
        />
      )}
      {stage === 2 && (
        <StageTwo
          setStage={setStage}
          setisLoading={setisLoading}
          onClickHandler={onClickHandler}
          email={email}
        />
      )}
      {stage === 3 && (
        <StageThree
          setStage={setStage}
          setisLoading={setisLoading}
          onClickHandler={onClickHandler}
          email={email}
        />
      )}
    </>
  );
}

function StageThree({ setStage, setisLoading, onClickHandler, email }) {
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const {updateUserData} = useAuth()
  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setisLoading(true);
      const result = await confirmPasswordApi(email, password, confirmPassword);
      setisLoading(false);

      if (result.success) {
        localStorage.setItem("spikeToken", JSON.stringify(result.token));
        updateUserData(result.token)
        onClickHandler();
      } else {
        setError(result.error);
      }
    } catch (error) {
      setisLoading(false);
    }
  };
  return (
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
      <form onSubmit={submitHandler} autoComplete="off">
        <div className=" text-sm font-semibold text-stext mt-6">Password*</div>
        <input
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          className="customInput mt-1 px-4"
          type="password"
        />
        <div className=" text-sm font-semibold text-stext mt-6">
          Confirm Password*
        </div>
        <input
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
          className="customInput mt-1 px-4"
          type="password"
        />

        <div className="pt-4 text-error text-center text-xs h-8">{error}</div>

        <button className="w-full h-[52px] mt-4 max-[750px]:mt-auto rounded-[4px] shadow-custom bg-button2 hover:bg-buttonHover2 flex flex-row justify-center items-center cursor-pointer text-black text-sm font-semibold">
          Submit
        </button>
      </form>
    </div>
  );
}

function StageOne({
  setIsForgotPassword,

  onClickHandler,
  email,
  setEmail,
  setisLoading,
  setStage,
}) {
  const [error, setError] = useState("");
  const submitHandler = async () => {
    setError("");

    try {
      setisLoading(true);
      const result = await forgetPasswordApi(email);
      setisLoading(false);

      if (result.success) {
        setStage(2);
      } else {
        setError(result.error);
      }
    } catch (error) {
      setisLoading(false);
    }
  };
  return (
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
      <input
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        className="customInput mt-1 px-4"
        type="email"
      />

      <div className="pt-4 text-error text-center text-xs h-8">{error}</div>

      <div
        onClick={submitHandler}
        className="w-full h-[52px] mt-4 max-[750px]:mt-auto rounded-[4px] shadow-custom bg-button2 hover:bg-buttonHover2 flex flex-row justify-center items-center cursor-pointer"
      >
        <div className="text-black text-sm font-semibold ">Continue</div>
      </div>
    </div>
  );
}

function SigninContent({
  onClickHandler,
  setisLoading,

  setIsForgotPassword,
}) {
  const {updateUserData} = useAuth()
  const [error, setError] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setisLoading(true);
      const result = await signInApi(email, password);
      setisLoading(false);
   
      if (result.success) {
        localStorage.setItem("spikeToken", JSON.stringify(result.token));
        updateUserData(result.token)
        onClickHandler();
      } else {
        setError(result.error);
      }
    } catch (error) {
      setisLoading(false);
    }
  };
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
      <form onSubmit={submitHandler} autoComplete="off">
        <div className=" text-sm font-semibold text-stext mt-6">Email*</div>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="customInput mt-1 px-4"
          type="email"
        />

        <div className=" text-sm font-semibold text-stext mt-4 ">Password*</div>

        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="customInput mt-1  px-4"
          type="password"
          autoComplete="off"
        />

        <div className="mt-4 text-sm font-semibold text-text flex flex-row justify-end">
          <div
            onClick={() => setIsForgotPassword(true)}
            className=" cursor-pointer"
          >
            Forgot password?
          </div>
        </div>

        <div className="pt-4 text-error text-center text-xs h-8">{error}</div>

        <button className="w-full h-[52px] mt-4 max-[750px]:mt-auto rounded-[4px] shadow-custom bg-button2 hover:bg-buttonHover2 flex flex-row justify-center items-center cursor-pointer text-black text-sm font-semibold">
         Sign in
        </button>
      </form>
    </div>
  );
}
