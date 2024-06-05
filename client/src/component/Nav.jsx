import React, { useState } from "react";
import Person2Icon from "@mui/icons-material/Person2";
import NotificationsIcon from "@mui/icons-material/Notifications";
import WalletIcon from "@mui/icons-material/Wallet";
export default function Nav() {
  const [isUserLogedIn, setIsUserLogedIn] = useState(false);
  return (
    <div className="h-[60px] w-full flex flex-row">
      <div className=" flex-1 bg-sbg boxshadow flex flex-row justify-center  h-full w-full">
        <div className=" max-w-[1200px]  mx-10 max-[750px]:mx-4  flex-1 h-full flex flex-row justify-between items-center">
          <div className="ds text-4xl max-[400px]:hidden">Spike</div>
          <div className="ds text-4xl max-[400px]:flex hidden">S</div>
          {isUserLogedIn && (
            <div className="flex flex-row h-[46px]">
              <div className="rounded-l-[4px] bg-bg h-full px-4 flex flex-row items-center justify-center text-sm font-semibold">
                <div className="">CA$324.00</div>
              </div>
              <div className="rounded-r-[4px] bg-button hover:bg-buttonHover cursor-pointer h-full px-4 flex flex-row items-center justify-center text-sm font-semibold">
                <div className=" max-[750px]:hidden">Wallet</div>
                <div className=" hidden max-[750px]:flex">
                  <WalletIcon />
                </div>
              </div>
            </div>
          )}
          {isUserLogedIn ?
          <div className=" flex flex-row items-center gap-x-4 max-[400px]:gap-x-2">
            <div className=" cursor-pointer">
              <Person2Icon />
            </div>
            <div className=" cursor-pointer">
              <NotificationsIcon />
            </div>
          </div> : <div className=" flex-row flex h-10 text-sm font-semibold">
            <div className="h-full px-4 cursor-pointer flex flex-row justify-center items-center rounded-[4px]">
              <div>Sign in</div>
            </div>
            <div className="h-full px-4 cursor-pointer flex flex-row justify-center items-center rounded-[4px] bg-button hover:bg-buttonHover">
              <div>Register</div>
            </div>
          </div>
}
        </div>
      </div>
    </div>
  );
}
