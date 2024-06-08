import React, { useState } from "react";
import BgOpacity from "./BgOpacity";
import CloseIcon from "@mui/icons-material/Close";
import WalletIcon from "@mui/icons-material/Wallet";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
export default function Wallet({setIsWallet}) {
  const [isWithdraw, setIsWithdraw] = useState(false);
  const [isDeposit, setIsDeposit] = useState(false);
  const onClickHandler = () => {
    setIsWallet(false);
  };
  return (
    <BgOpacity onClickHandler={onClickHandler}>
      <div className=" p-4 flex flex-col bg-sbg w-[500px] rounded-lg  max-[532px]:w-full relative  caret-transparent  gap-4 max-h-[400px]">
        {!isWithdraw && !isDeposit && (
          <WalletWrapper
            setIsWithdraw={setIsWithdraw}
            setIsDeposit={setIsDeposit}
            onClickHandler={onClickHandler}
          />
        )}
        {isWithdraw && <Withdraw setIsWithdraw={setIsWithdraw} onClickHandler={onClickHandler} />}
      </div>
    </BgOpacity>
  );
}

function Withdraw({ onClickHandler,setIsWithdraw }) {
  return (
    <>
      <div className=" flex flex-row justify-between">
        <div onClick={()=> setIsWithdraw(false)} className="flex flex-row gap-x-4 text-stext items-center cursor-pointer group font-semibold text-sm">
          <div className=" group-hover:text-[#eee] flex flex-row items-center">
            <KeyboardArrowLeftIcon sx={{ fontSize: 18}} />
          </div>
          <div  className=" group-hover:text-[#eee]">Wallet</div>
          <div  className=" group-hover:text-[#eee]">/</div>
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
        <div className="text-xs font-semibold text-stext">
          Balance
        </div>
        <div className="text-2xl font-semibold mt-2">$234.43 CA</div>
      </div>
   
        <div className="w-full h-[52px] mt-4  max-[750px]:mt-auto rounded-[4px] shadow-custom bg-button hover:bg-buttonHover flex flex-row justify-center items-center cursor-pointer">
          <div className=" text-sm font-semibold ">Withdraw</div>
        </div> 
    </>
  );
}

function WalletWrapper({ setIsWithdraw, setIsDeposit, onClickHandler }) {
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
        <div className="text-xs font-semibold text-stext">
          Balance
        </div>
        <div className="text-2xl font-semibold mt-2">$234.43 CA</div>
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
