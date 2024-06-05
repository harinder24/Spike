import React, { useState } from "react";
import Person2Icon from "@mui/icons-material/Person2";
import NotificationsIcon from "@mui/icons-material/Notifications";
import WalletIcon from "@mui/icons-material/Wallet";
import MenuIcon from "@mui/icons-material/Menu";
export default function Nav({ setIsRegister, setIsSignIn }) {
  const [isUserLogedIn, setIsUserLogedIn] = useState(true);
  return (
    <div className="h-[60px] w-full max-[750px]:w-screen flex flex-row">
      <div className=" flex-1 bg-sbg boxshadow flex flex-row justify-center  h-full w-full">
        <div className=" max-w-[1200px]  mx-10 max-[750px]:mx-4  flex-1 h-full flex flex-row justify-between items-center">
          <div className="flex flex-row items-center gap-x-4">
           
            
              <div
                // onClick={reduceHandler}
                className={` cursor-pointer hidden max-[750px]:flex`}
              >
                <MenuIcon
                  sx={{ fontSize: 36 }}
                  // isWidthReduced={isWidthReduced}
                />
              </div>
          
            <div className="ds text-4xl max-[400px]:hidden">Spike</div>
            <div className="ds text-4xl max-[400px]:flex hidden">S</div>
          </div>
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
          {isUserLogedIn ? (
            <div className=" flex flex-row items-center gap-x-4 max-[400px]:gap-x-2">
              <div className=" cursor-pointer">
                <Person2Icon />
              </div>
              <div className=" cursor-pointer">
                <NotificationsIcon />
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
