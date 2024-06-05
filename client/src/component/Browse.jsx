import React, { useEffect, useState } from "react";
import Person2Icon from "@mui/icons-material/Person2";
import NotificationsIcon from "@mui/icons-material/Notifications";
import WalletIcon from "@mui/icons-material/Wallet";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";

import LogoutIcon from "@mui/icons-material/Logout";
import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import MenuIcon from "@mui/icons-material/Menu";
export default function Browse({ isWidthReduced }) {
  const [isProfileExpanded, setIsProfileExpanded] = useState(false);
  const [isProfileExpandedWidth, setIsProfileExpandedWidth] = useState(316);
  useEffect(() => {
    if (isWidthReduced) {
      setIsProfileExpanded(true);
      setIsProfileExpandedWidth(260);
    } else {
      setIsProfileExpanded(false  );
      setIsProfileExpandedWidth(316);
    }
  }, [isWidthReduced]);


  return (
    <div
      className={` h-full p-4 flex flex-col gap-y-4 overflow-y-auto overflow-x-hidden`}
    >
      <div className="bg-sbg rounded-[4px] w-full flex flex-col ">
        <div
        style={{height: isProfileExpanded ? isProfileExpandedWidth : 52}}
          className={`transition-all duration-500 ease-in-out ${
            isWidthReduced
              ? " bg-transparent"
              : isProfileExpanded
              ? "bg-tbg"
              : " bg-transparent"
          } `}
        >
          {!isWidthReduced && (
            <div
              onClick={() => setIsProfileExpanded((prev) => !prev)}
              className="flex flex-row items-center p-4 gap-x-1 cursor-pointer group  rounded-[4px] hover:bg-sbgHover "
            >
              <div className=" flex flex-row justify-center items-center group-hover:text-[#eee] text-stext">
                <Person2Icon sx={{ fontSize: 18 }} />
              </div>
              <div className=" text-sm font-semibold">Profile</div>
              <div
                className={`flex-1 flex flex-row justify-end items-center ${
                  isProfileExpanded ? "text-button" : "text-stext"
                } group-hover:text-[#eee]`}
              >
                <ExpandCircleDownIcon sx={{ fontSize: 18 }} />
              </div>
            </div>
          )}
          {isProfileExpanded && (
            <>
              {!isWidthReduced && (
                <div className=" border-b-[2px] border-stext"></div>
              )}
              <div className="flex flex-row items-center p-4 gap-x-1 cursor-pointer group  rounded-[4px] hover:bg-sbgHover">
                <div className=" flex flex-row justify-center items-center group-hover:text-[#eee] text-stext">
                  <WalletIcon sx={{ fontSize: 18 }} />
                </div>
                {!isWidthReduced && (
                  <div className=" text-sm font-semibold">Wallet</div>
                )}
              </div>
              <div className="flex flex-row items-center p-4 gap-x-1 cursor-pointer group  rounded-[4px] hover:bg-sbgHover">
                <div className=" flex flex-row justify-center items-center group-hover:text-[#eee] text-stext">
                  <AccountBalanceWalletIcon sx={{ fontSize: 18 }} />
                </div>
                {!isWidthReduced && (
                  <div className=" text-sm font-semibold">Vault</div>
                )}
              </div>
              <div className="flex flex-row items-center p-4 gap-x-1 cursor-pointer group  rounded-[4px] hover:bg-sbgHover">
                <div className=" flex flex-row justify-center items-center group-hover:text-[#eee] text-stext">
                  <AutoGraphIcon sx={{ fontSize: 18 }} />
                </div>
                {!isWidthReduced && (
                  <div className=" text-sm font-semibold">Statistics</div>
                )}
              </div>

              <div className="flex flex-row items-center p-4 gap-x-1 cursor-pointer group  rounded-[4px] hover:bg-sbgHover">
                <div className=" flex flex-row justify-center items-center group-hover:text-[#eee] text-stext">
                  <NotificationsIcon sx={{ fontSize: 18 }} />
                </div>
                {!isWidthReduced && (
                  <div className=" text-sm font-semibold">Notification</div>
                )}
              </div>
              {!isWidthReduced && (
                <div className=" border-b-[2px] border-stext"></div>
              )}
              <div className="flex flex-row items-center p-4 gap-x-1 cursor-pointer group  rounded-[4px] hover:bg-sbgHover">
                <div className=" flex flex-row justify-center items-center group-hover:text-[#eee] text-stext">
                  <LogoutIcon sx={{ fontSize: 18 }} />
                </div>
                {!isWidthReduced && (
                  <div className=" text-sm font-semibold">Logout</div>
                )}
              </div>
            </>
          )}
        </div>
        <div className="flex flex-row items-center p-4 gap-x-1 cursor-pointer group  rounded-[4px] hover:bg-sbgHover">
          <div className=" flex flex-row justify-center items-center group-hover:text-[#eee] text-stext">
            <StarOutlineOutlinedIcon sx={{ fontSize: 18 }} />
          </div>
          {!isWidthReduced && (
            <div className=" text-sm font-semibold">Favourite</div>
          )}
        </div>
        <div className="flex flex-row items-center p-4 gap-x-1 cursor-pointer group  rounded-[4px] hover:bg-sbgHover">
          <div className=" flex flex-row justify-center items-center group-hover:text-[#eee] text-stext">
            <HistoryOutlinedIcon sx={{ fontSize: 18 }} />
          </div>
          {!isWidthReduced && (
            <div className=" text-sm font-semibold">History</div>
          )}
        </div>
        <div className="flex flex-row items-center p-4 gap-x-1 cursor-pointer group  rounded-[4px] hover:bg-sbgHover">
          <div className=" flex flex-row justify-center items-center group-hover:text-[#eee] text-stext">
            <ReceiptOutlinedIcon sx={{ fontSize: 18 }} />
          </div>
          {!isWidthReduced && (
            <div className=" text-sm font-semibold">My Bets</div>
          )}
        </div>
        <div className="flex flex-row items-center p-4 gap-x-1 cursor-pointer group  rounded-[4px] hover:bg-sbgHover">
          <div className=" flex flex-row justify-center items-center group-hover:text-[#eee] text-stext">
            <EmojiEventsIcon sx={{ fontSize: 18 }} />
          </div>
          {!isWidthReduced && (
            <div className=" text-sm font-semibold">VIP Club</div>
          )}
        </div>
      </div>
      <div className="bg-sbg rounded-[4px] w-full flex flex-col overflow-hidden">
        {!isWidthReduced && (
          <>
            {" "}
            <div className="flex flex-row items-center p-4 gap-x-1 group  rounded-[4px] ">
              <div className=" text-sm font-semibold">Casino</div>
            </div>
            <div className=" border-b-[2px] border-stext"></div>
          </>
        )}
        <div className="flex flex-row items-center p-4 gap-x-[6px] cursor-pointer group  rounded-[4px] hover:bg-sbgHover">
          <div className=" flex flex-row justify-center items-center group-hover:text-[#eee] text-stext">
            <img className=" w-[18px]" src="baccarat.png" alt="" />
          </div>
          {!isWidthReduced && (
            <div className=" text-sm font-semibold">Baccarat</div>
          )}
        </div>
      </div>
    </div>
  );
}

export function BrowseWithTopNav() {
  const [isWidthReduced, setIsWidthReduced] = useState(false);
  const [isWidthReducable, setisWidthReducable] = useState(true);
  useEffect(() => {
    if (window.innerWidth > 1280) {
      setisWidthReducable(true);
      setIsWidthReduced(false);
    } else {
      setisWidthReducable(false);
      setIsWidthReduced(true);
    }
    const handleResize = () => {
      if (window.innerWidth > 1280) {
        setisWidthReducable(true);
        setIsWidthReduced(false);
      } else {
        setisWidthReducable(false);
        setIsWidthReduced(true);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const reduceHandler = () => {
    if (isWidthReducable) {
      setIsWidthReduced((prev) => !prev);
    }
  };
  // ${isWidthReduced ? " justify-center" : "justify-start"}
  return (
    <div
      className={`transition-all duration-500 ease-in-out ${
        isWidthReduced ? "w-[82px]" : "w-[240px]"
      }   h-full flex flex-col bg-bg max-[750px]:hidden`}
    >
      <div className="min-h-[60px] w-full flex flex-row sticky top-0">
        <div
          className={`flex-1  boxshadow flex flex-row items-center 
         pl-[8px]
          `}
        >
          <div
            onClick={reduceHandler}
            className={`p-4 ${
              isWidthReducable ? "cursor-pointer" : "cursor-default"
            } `}
          >
            <MenuIcon sx={{ fontSize: 36 }} isWidthReduced={isWidthReduced} />
          </div>
        </div>
      </div>
      <Browse isWidthReduced={isWidthReduced} />
    </div>
  );
}
