import React, { useEffect, useState } from "react";
import BgOpacity from "../layout/BgOpacity";
import CloseIcon from "@mui/icons-material/Close";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { useAuth } from "../layout/AuthProvider";
import { addVault, vaultHandler, withdrawVault } from "../../api/dataFetch";
export default function Vault({ setIsVault, setisLoading }) {
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
        setError={setError}
        setisLoading={setisLoading}
      />
    </BgOpacity>
  );
}

function VaultInfo({
  isDeposit,
  setIsDeposit,
  onClickHandler,
  error,
  setisLoading,
  setError,
}) {
  const [vault, setVault] = useState(0);
  const { wallet, token, updateWallet } = useAuth();
  const [amount, setAmount] = useState("");
  const [password, setpassword] = useState("");
  useEffect(() => {
    if (token) {
      getVaultAmount();
    }
  }, [token]);

  useEffect(() => {
    setAmount("");
  }, [isDeposit]);

  const getVaultAmount = async () => {
    setisLoading(true);
    const result = await vaultHandler(token);
    setisLoading(false);
    if (result.success) {
      setVault(result.data);
    }
  };

  const submitHandler = async () => {
    setError("");
    setisLoading(true);
    
    if (isDeposit) {
      const result = await addVault(token, amount);
      setisLoading(false);
      if (result.success) {
        updateWallet();
        onClickHandler();
      } else {
        setError(result.error);
      }
    } else {
      const result = await withdrawVault(token, amount, password);
      setisLoading(false);
      if (result.success) {
        updateWallet();
        onClickHandler();
      } else {
        setError(result.error);
      }
    }
  };
  const handleInputChange = (e) => {
    let inputValue = e.target.value;

    // Remove any non-digit characters except for the decimal point
    inputValue = inputValue.replace(/[^0-9.]/g, '');

    // Remove leading zeros
    inputValue = inputValue.replace(/^0+(?!\.|$)/, '');

    // Ensure there is at most one decimal point
    const parts = inputValue.split('.');
    if (parts.length > 2) {
        inputValue = parts[0] + '.' + parts.slice(1).join('');
    }

    // Ensure that cents are two digits
    if (parts[1] && parts[1].length > 2) {
        parts[1] = parts[1].substring(0, 2);
        inputValue = parts.join('.');
    }

    setAmount(inputValue);
};

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
          <div className="">
            CA${isDeposit ? wallet.toFixed(2) : vault.toFixed(2)}
          </div>
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
            onClick={() =>
              isDeposit
                ? setAmount(wallet)
                : setAmount(vault)
            }
            className="flex flex-row items-center justify-center px-4 h-10 text-sm font-semibold bg-[#2f4553] hover:bg-[#557086] cursor-pointer rounded-r-[4px]"
          >
            <div>Max</div>
          </div>
        </div>
      </div>
      {!isDeposit && (
        <div>
          <div className="text-xs font-semibold text-stext mt-4">Password*</div>

          <input
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            className="w-full mt-1 rounded-[4px] h-[40px] border-[2px] focus-visible:outline-none bg-bg border-[#2f4553] hover:border-[#557086] focus-visible:border-[#557086]  shadow-custom   text-[#eee] caret-[#eee]  px-4  flex-1 "
            type="password"
          />
        </div>
      )}
      {error && (
        <div className=" relative text-error text-center text-xs  bre">
          {error}
        </div>
      )}

      <div onClick={submitHandler} className="w-full h-[52px] mt-4 max-[750px]:mt-auto rounded-[4px] shadow-custom bg-button hover:bg-buttonHover flex flex-row justify-center items-center cursor-pointer">
        <div className=" text-sm font-semibold ">
          {isDeposit ? "Deposit" : "Withdraw"}
        </div>
      </div>
    </div>
  );
}
