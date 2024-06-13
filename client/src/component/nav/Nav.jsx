import React, { useState } from "react";
import Person2Icon from "@mui/icons-material/Person2";
import NotificationsIcon from "@mui/icons-material/Notifications";
import WalletIcon from "@mui/icons-material/Wallet";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { useNavigate } from 'react-router-dom';
import AutoGraphIcon from "@mui/icons-material/AutoGraph";

import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "../layout/AuthProvider";
export default function Nav({
  setIsRegister,
  setIsSignIn,
  setIsNotification,
  setIsWallet,
  setIsLogOut,
  setIsVault,
  setIsStat,
}) {
  const navigate = useNavigate()
  const {user,wallet, notification} = useAuth()
  const [isProfileOpened, setIsProfileOpened] = useState(false);

  return (
    <div className="min-h-[60px] w-full max-[750px]:w-screen flex flex-row">
      <div className=" flex-1 bg-sbg boxshadow flex flex-row justify-center  h-full w-full">
        <div className=" max-w-[1200px]  mx-10 max-[750px]:mx-4  flex-1 h-full flex flex-row justify-between items-center">
          <div onClick={()=> navigate("/")} className="ds text-4xl max-[400px]:hidden cursor-pointer">Spike</div>
          <div onClick={()=> navigate("/")}  className="ds text-4xl max-[400px]:flex hidden cursor-pointer">S</div>

          {user && (
            <div className="flex flex-row h-[46px]">
              <div className="rounded-l-[4px] bg-bg h-full px-4 flex flex-row items-center justify-center text-sm font-semibold">
                <div className="">CA${wallet.toFixed(2)}</div>
              </div>
              <div
                onClick={() => setIsWallet(true)}
                className="rounded-r-[4px] bg-button hover:bg-buttonHover cursor-pointer h-full px-4 flex flex-row items-center justify-center text-sm font-semibold"
              >
                <div className=" max-[750px]:hidden">Wallet</div>
                <div className=" hidden max-[750px]:flex">
                  <WalletIcon />
                </div>
              </div>
            </div>
          )}
          {user ? (
            <div className=" flex flex-row items-center  max-[400px]:gap-x-2">
              <div className="  relative">
                <div
                  onClick={() => setIsProfileOpened((prev) => !prev)}
                  className="cursor-pointer p-2"
                >
                  <Person2Icon />
                </div>
                {isProfileOpened && (
                  <>
                    <div className="absolute bottom-[-10px] left-[12px] border-transparent border-b-[#eee] border-[8px] border-t-[0px] z-40"></div>
                    <div className="  absolute bottom-[-207px] bg-[#eee] flex flex-col left-[-40px] rounded-[4px] overflow-hidden py-1 z-40">
                      <div
                        onClick={() => setIsWallet(true)}
                        className="text-[rgba(47,69,83)] hover:bg-[rgb(177,186,211)] group h-[38px]  flex flex-row items-center gap-x-[6px] px-3 text-xs font-semibold cursor-pointer "
                      >
                        <div className=" flex flex-row items-center">
                          <WalletIcon sx={{ fontSize: 14 }} />
                        </div>

                        <div className=" group-hover:text-[rgb(5,8,10)] ">
                          Wallet
                        </div>
                      </div>
                      <div
                        onClick={() => setIsVault(true)}
                        className="text-[rgba(47,69,83)] hover:bg-[rgb(177,186,211)] group h-[38px] flex flex-row items-center gap-x-[6px] px-3 text-xs font-semibold cursor-pointer"
                      >
                        <div className=" flex flex-row items-center">
                          <AccountBalanceWalletIcon sx={{ fontSize: 14 }} />
                        </div>

                        <div className=" group-hover:text-[rgb(5,8,10)] ">
                          Vault
                        </div>
                      </div>
                      <div
                        onClick={() => setIsStat(true)}
                        className="text-[rgba(47,69,83)] hover:bg-[rgb(177,186,211)] group h-[38px] flex flex-row items-center gap-x-[6px] px-3 text-xs font-semibold cursor-pointer"
                      >
                        <div className=" flex flex-row items-center">
                          <AutoGraphIcon sx={{ fontSize: 14 }} />
                        </div>

                        <div className=" group-hover:text-[rgb(5,8,10)] ">
                          Statistics
                        </div>
                      </div>
                      <div
                        onClick={() => setIsNotification(true)}
                        className="text-[rgba(47,69,83)] hover:bg-[rgb(177,186,211)] group h-[38px] flex flex-row items-center gap-x-[6px] px-3 text-xs font-semibold cursor-pointer"
                      >
                        <div className=" flex flex-row items-center">
                          <NotificationsIcon sx={{ fontSize: 14 }} />
                        </div>

                        <div className=" group-hover:text-[rgb(5,8,10)] ">
                          Notifications
                        </div>
                      </div>
                      <div
                        onClick={() => setIsLogOut(true)}
                        className="text-[rgba(47,69,83)] hover:bg-[rgb(177,186,211)] group h-[38px] flex flex-row items-center gap-x-[6px] px-3 text-xs font-semibold cursor-pointer"
                      >
                        <div className=" flex flex-row items-center">
                          <LogoutIcon sx={{ fontSize: 14 }} />
                        </div>

                        <div className=" group-hover:text-[rgb(5,8,10)] ">
                          Log out
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div
                onClick={() => {
                  setIsNotification(true);
                }}
                className=" cursor-pointer p-2 relative"
              >
                <NotificationsIcon />
                {!notification?.isRead && <div className=" absolute size-2 rounded-full bg-sbg flex flex-row justify-center items-center top-3 right-3"><div className=" size-1 rounded-full bg-green2 "></div></div>}
              </div>
            </div>
          ) : (
            <div className=" flex-row flex h-[44px] text-sm font-semibold">
              <div
                onClick={() => setIsSignIn(true)}
                className="h-full px-4 cursor-pointer flex flex-row justify-center items-center rounded-[4px]"
              >
                <div>Sign in</div>
              </div>
              <div
                onClick={() => setIsRegister(true)}
                className="h-full px-4 cursor-pointer flex flex-row justify-center items-center rounded-[4px] bg-button hover:bg-buttonHover"
              >
                <div>Register</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
