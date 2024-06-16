import React, { useEffect, useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import WalletIcon from "@mui/icons-material/Wallet";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import BgOpacity from "../layout/BgOpacity";
import { useAuth } from "../layout/AuthProvider";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DoneIcon from "@mui/icons-material/Done";
import { loadStripe } from "@stripe/stripe-js";

import { getStripeKey, withdrawApi } from "../../api/dataFetch";
import { useLocation } from "react-router-dom";
let stripePromise;

const getStripe = (id) => {
  if (!stripePromise) {
    stripePromise = loadStripe(id);
  }

  return stripePromise;
};
export default function Wallet({ setIsWallet, setisLoading }) {
  const [isWithdraw, setIsWithdraw] = useState(false);
  const [isDeposit, setIsDeposit] = useState(false);
  const onClickHandler = () => {
    setIsWallet(false);
  };
  const { wallet } = useAuth();
  return (
    <BgOpacity onClickHandler={onClickHandler}>
      <div className=" p-4 flex flex-col bg-sbg w-[500px] rounded-lg  max-[532px]:w-full relative  caret-transparent  gap-4 max-h-[80svh]">
        {!isWithdraw && !isDeposit && (
          <WalletWrapper
            setIsWithdraw={setIsWithdraw}
            setIsDeposit={setIsDeposit}
            onClickHandler={onClickHandler}
            wallet={wallet}
          />
        )}
        {isWithdraw && (
          <Withdraw
            wallet={wallet}
            setIsWithdraw={setIsWithdraw}
            onClickHandler={onClickHandler}
            setisLoading={setisLoading}
          />
        )}
        {isDeposit && (
          <Deposit
            setIsDeposit={setIsDeposit}
            onClickHandler={onClickHandler}
            setisLoading={setisLoading}
          />
        )}
      </div>
    </BgOpacity>
  );
}

function Deposit({ setIsDeposit, onClickHandler, setisLoading }) {
  const [stage, setStage] = useState(1);
  const [amount, setAmount] = useState(100);
  const [pk, setpk] = useState("");
  const [id, setId] = useState("");
  const { token } = useAuth();

  useEffect(() => {
    if (token) {
      getStripeKeyFromServer();
    }
  }, [token]);

  const getStripeKeyFromServer = async () => {
    setisLoading(true);
    const data = await getStripeKey(token);
    setisLoading(false);
    if (data.success) {
      setId(data.id);
      setpk(data.data);
    }
  };
  if (!pk || !id) {
    return <></>;
  }

  return (
    <>
      <div className=" flex flex-row justify-between">
        <div
          onClick={() => setIsDeposit(false)}
          className="flex flex-row gap-x-4 text-stext items-center cursor-pointer group font-semibold text-sm"
        >
          <div className=" group-hover:text-[#eee] flex flex-row items-center">
            <KeyboardArrowLeftIcon sx={{ fontSize: 18 }} />
          </div>
          <div className=" group-hover:text-[#eee]">Wallet</div>
          <div className=" group-hover:text-[#eee]">/</div>
          <div className="text-[#eee] ">Deposit</div>
        </div>
        <div
          onClick={onClickHandler}
          className=" self-end text-stext hover:text-[#eee] cursor-pointer"
        >
          <CloseIcon sx={{ fontSize: 20 }} />
        </div>
      </div>

      <DepositStageOne
        amount={amount}
        setAmount={setAmount}
        setStage={setStage}
        pk={pk}
        id={id}
      />
    </>
  );
}

function DepositStageOne({ amount, setAmount, pk, id }) {
  const [isCopied, setIsCopied] = useState(false);
  const { pathname } = useLocation();
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText("4242 4242 4242 4242")
      .then(() => {
        setIsCopied(true);
      })
      .catch((error) => {
        alert("Error copying link to clipboard:", error);
      });
  };
  const item = {
    price: "price_1PQGbIKIUi0SKpp7TO2tlfN1",
    quantity: amount,
  };
  const checkoutOptions = {
    lineItems: [item],
    mode: "payment",
    successUrl: `${window.location.origin}/success/${id}/${amount}/${
      pathname === "/" ? "home" : pathname.slice(1)
    }`,
    cancelUrl: `${window.location.origin}${pathname}`,
  };
  const redirectToCheckout = async () => {
    const stripe = await getStripe(pk);
    const { error } = await stripe.redirectToCheckout(checkoutOptions);
  };
  return (
    <div className="w-full mt-2">
      <div className=" flex flex-col text-sm  font-semibold mb-4 gap-2">
        {" "}
        <div className=" text-stext font-normal  items-center">
          {" "}
          Use Card Number-{" "}
        </div>
        <div className=" flex flex-row items-center justify-between">
          <div className="">4242 4242 4242 4242</div>{" "}
          {isCopied ? (
            <div className=" flex flex-row items-center text-stext">
              {" "}
              <DoneIcon sx={{ fontSize: 18 }} />{" "}
            </div>
          ) : (
            <div
              className=" flex flex-row items-center px-2 text-stext hover:text-[#eee]  cursor-pointer"
              onClick={copyToClipboard}
            >
              <ContentCopyIcon sx={{ fontSize: 18 }} />
            </div>
          )}{" "}
        </div>
        <div  className=" r text-stext">
          Use any future date and CVC
        </div>
      </div>
      <div className=" flex flex-row w-full h-[46px] gap-x-1">
        <button
          onClick={() => setAmount(5)}
          className={` rounded-[4px]  flex-1 h-full text-sm font-bold  ${
            amount === 5
              ? "bg-button text-[#eee] cursor-default"
              : "hover:bg-sbgHover bg-tbg text-stext hover:text-[#eee] cursor-pointer"
          }`}
        >
          5
        </button>
        <button
          onClick={() => setAmount(100)}
          className={` rounded-[4px]  flex-1 h-full text-sm font-bold  ${
            amount === 100
              ? "bg-button text-[#eee] cursor-default"
              : "hover:bg-sbgHover bg-tbg text-stext hover:text-[#eee] cursor-pointer"
          }`}
        >
          100
        </button>
        <button
          onClick={() => setAmount(1000)}
          className={` rounded-[4px]  flex-1 h-full text-sm font-bold  ${
            amount === 1000
              ? "bg-button text-[#eee] cursor-default"
              : "hover:bg-sbgHover bg-tbg text-stext hover:text-[#eee] cursor-pointer"
          }`}
        >
          1000
        </button>
      </div>
      <input
        value={amount}
        onChange={(e) => setAmount(Math.floor(e.target.value))}
        className=" customInput mt-4 px-4"
        placeholder="Amount"
        type="number"
      />

      <div className=" text-xs font-bold text-[#eee] px-4 flex flex-row justify-between mt-4">
        <div>Total</div>
        <div>
          CA${amount}
          {!amount && "0"}
        </div>
      </div>
      <button
        onClick={redirectToCheckout}
        className={` rounded-[4px]  w-full mt-2 text-sm font-bold h-[46px]  ${
          amount && amount > 0
            ? "bg-button text-[#eee] hover:bg-buttonHover cursor-pointer"
            : "bg-buttonHover text-[#eee] cursor-default"
        }`}
      >
        Deposit
      </button>
    </div>
  );
}

function Withdraw({ onClickHandler, setIsWithdraw, setisLoading }) {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const { wallet, token, updateWallet, updateNotification } = useAuth();

  const withdrawHandler = async () => {
    if (token) {
      setisLoading(true);
      const result = await withdrawApi(token, amount);
      setisLoading(false);
      if (result.success) {
        updateWallet();
        updateNotification();
        onClickHandler();
      } else {
        setError(result.error);
      }
    }
  };
  const handleInputChange = (e) => {
    let inputValue = e.target.value;

    // Remove any non-digit characters except for the decimal point
    inputValue = inputValue.replace(/[^0-9.]/g, "");

    // Remove leading zeros
    inputValue = inputValue.replace(/^0+(?!\.|$)/, "");

    // Ensure there is at most one decimal point
    const parts = inputValue.split(".");
    if (parts.length > 2) {
      inputValue = parts[0] + "." + parts.slice(1).join("");
    }

    // Ensure that cents are two digits
    if (parts[1] && parts[1].length > 2) {
      parts[1] = parts[1].substring(0, 2);
      inputValue = parts.join(".");
    }

    setAmount(inputValue);
  };
  return (
    <>
      <div className=" flex flex-row justify-between">
        <div
          onClick={() => setIsWithdraw(false)}
          className="flex flex-row gap-x-4 text-stext items-center cursor-pointer group font-semibold text-sm"
        >
          <div className=" group-hover:text-[#eee] flex flex-row items-center">
            <KeyboardArrowLeftIcon sx={{ fontSize: 18 }} />
          </div>
          <div className=" group-hover:text-[#eee]">Wallet</div>
          <div className=" group-hover:text-[#eee]">/</div>
          <div className="text-[#eee] ">Withdraw</div>
        </div>
        <div
          onClick={onClickHandler}
          className=" self-end text-stext hover:text-[#eee] cursor-pointer"
        >
          <CloseIcon sx={{ fontSize: 20 }} />
        </div>
      </div>
      <div className="flex flex-col mt-2">
        <div className="text-xs font-semibold text-stext">Balance</div>
        <div className="text-2xl font-semibold mt-2">
          ${wallet.toFixed(2)} CA
        </div>
      </div>
      <div className=" flex flex-col gap-y-1">
        <div className="text-xs font-semibold text-stext">Amount*</div>
        <div className=" flex flex-row ">
          <input
            value={amount}
            onChange={handleInputChange}
            className="w-full rounded-[4px] h-[40px] border-[2px] focus-visible:outline-none bg-bg border-[#2f4553] hover:border-[#557086] focus-visible:border-[#557086]  shadow-custom   text-[#eee] caret-[#eee]  px-4 rounded-r-none flex-1"
            type="number"
          />
          <div
            onClick={() => setAmount(wallet)}
            className="flex flex-row items-center justify-center px-4 h-10 text-sm font-semibold bg-[#2f4553] hover:bg-[#557086] cursor-pointer rounded-r-[4px]"
          >
            <div>Max</div>
          </div>
        </div>
      </div>
      {error && <div className=" text-error text-center text-xs ">{error}</div>}
      <div
        onClick={withdrawHandler}
        className="w-full h-[52px] mt-4  max-[750px]:mt-auto rounded-[4px] shadow-custom bg-button hover:bg-buttonHover flex flex-row justify-center items-center cursor-pointer"
      >
        <div className=" text-sm font-semibold ">Withdraw</div>
      </div>
    </>
  );
}

function WalletWrapper({
  setIsWithdraw,
  setIsDeposit,
  onClickHandler,
  wallet,
}) {
  return (
    <>
      <div className=" flex flex-row justify-between">
        <div className="flex flex-row gap-x-[6px] text-stext items-center">
          <WalletIcon sx={{ fontSize: 18 }} />
          <div className="text-[#eee] font-semibold text-sm">Wallet</div>
        </div>
        <div
          onClick={onClickHandler}
          className=" self-end text-stext hover:text-[#eee] cursor-pointer"
        >
          <CloseIcon sx={{ fontSize: 20 }} />
        </div>
      </div>
      <div className="flex flex-col mt-2">
        <div className="text-xs font-semibold text-stext">Balance</div>
        <div className="text-2xl font-semibold mt-2">
          ${wallet.toFixed(2)} CA
        </div>
      </div>
      <div
        onClick={() => setIsDeposit(true)}
        className="w-full h-[52px] mt-4 max-[750px]:mt-auto rounded-[4px] shadow-custom bg-button hover:bg-buttonHover flex flex-row justify-center items-center cursor-pointer"
      >
        <div className=" text-sm font-semibold ">Deposit</div>
      </div>
      <div
        onClick={() => setIsWithdraw(true)}
        className="w-full h-[52px]  max-[750px]:mt-auto rounded-[4px] shadow-custom bg-button hover:bg-buttonHover flex flex-row justify-center items-center cursor-pointer"
      >
        <div className=" text-sm font-semibold ">Withdraw</div>
      </div>
    </>
  );
}
