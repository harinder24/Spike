import React, { useState } from "react";
import BgOpacity from "../layout/BgOpacity";
import CloseIcon from "@mui/icons-material/Close";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
export default function Vault({setIsVault}) {
  const [isDeposit, setIsDeposit] = useState(true);
  const [error, setError] = useState("");
  const onClickHandler = () => {
    setIsVault(false);
  };
  return (
    <BgOpacity onClickHandler={onClickHandler}>
      <VaultInfo
        isDeposit={isDeposit}
        setIsDeposit={setIsDeposit}
        onClickHandler={onClickHandler}
        error={error}
      />
    </BgOpacity>
  );
}

function VaultInfo({ isDeposit, setIsDeposit, onClickHandler, error }) {
  return (
    <div className=" p-4 flex flex-col bg-sbg w-[500px] rounded-lg  max-[532px]:w-full overflow-y-auto relative  caret-transparent  gap-4 max-h-[80svh]">
      <div className=" flex flex-row justify-between">
        <div className="flex flex-row gap-x-[6px] text-stext items-center">
          <AccountBalanceWalletIcon sx={{ fontSize: 18 }} />
          <div className="text-[#eee] font-semibold text-sm">Vault</div>
        </div>
        <div
          onClick={onClickHandler}
          className=" self-end text-stext hover:text-[#eee] cursor-pointer"
        >
          <CloseIcon sx={{ fontSize: 20 }} />
        </div>
      </div>
      <div className="flex flex-row justify-center">
        <div className="rounded-full p-1 flex flex-row gap-x-1 bg-bg">
          <div
            onClick={() => setIsDeposit(true)}
            className={` ${
              isDeposit ? "bg-sbg" : "bg-transparent"
            } rounded-full h-[44px] flex flex-row items-center justify-center font-semibold text-sm w-[100px] cursor-pointer hover:bg-sbg`}
          >
            <div>Deposit</div>
          </div>
          <div
            onClick={() => setIsDeposit(false)}
            className={` ${
              isDeposit ? "bg-transparent" : "bg-sbg"
            } rounded-full h-[44px] flex flex-row items-center justify-center font-semibold text-sm w-[100px] cursor-pointer hover:bg-sbg`}
          >
            <div>Withdraw</div>
          </div>
        </div>
      </div>
      <div className=" flex flex-row items-center justify-center">
        <div className="rounded-[4px] bg-bg  px-4 flex flex-row items-center justify-center text-sm font-semibold h-[46px]">
          <div className="">CA$324.00</div>
        </div>
      </div>
      <div className=" flex flex-col gap-y-1">
        <div className="text-xs font-semibold text-stext">Amount*</div>
        <div className=" flex flex-row ">
          <input
            className="w-full rounded-[4px] h-[40px] border-[2px] focus-visible:outline-none bg-bg border-[#2f4553] hover:border-[#557086] focus-visible:border-[#557086]  shadow-custom   text-[#eee] caret-[#eee]  px-4 rounded-r-none flex-1"
            type="number"
          />
          <div className="flex flex-row items-center justify-center px-4 h-10 text-sm font-semibold bg-[#2f4553] hover:bg-[#557086] cursor-pointer rounded-r-[4px]">
            <div>Max</div>
          </div>
        </div>
      </div>
      {!isDeposit && <div>
        <div className="text-xs font-semibold text-stext mt-4">Password*</div>

        <input
          className="w-full mt-1 rounded-[4px] h-[40px] border-[2px] focus-visible:outline-none bg-bg border-[#2f4553] hover:border-[#557086] focus-visible:border-[#557086]  shadow-custom   text-[#eee] caret-[#eee]  px-4  flex-1 "
          type="password"
        />
      </div>}
      {error && (
        <div className=" relative text-error text-center text-xs  bre">
          {error}
        </div>
      )}

      <div className="w-full h-[52px] mt-4 max-[750px]:mt-auto rounded-[4px] shadow-custom bg-button hover:bg-buttonHover flex flex-row justify-center items-center cursor-pointer">
        <div className=" text-sm font-semibold ">{isDeposit ? "Deposit" : "Withdraw"}</div>
      </div>
    </div>
  );
}
