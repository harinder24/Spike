import React, { useEffect, useState } from "react";
import Person2Icon from "@mui/icons-material/Person2";
import NotificationsIcon from "@mui/icons-material/Notifications";
import WalletIcon from "@mui/icons-material/Wallet";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LogoutIcon from "@mui/icons-material/Logout";
import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CasinoIcon from "@mui/icons-material/Casino";
import GamesIcon from "@mui/icons-material/Games";
import DiamondIcon from "@mui/icons-material/Diamond";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../component/layout/AuthProvider";
export default function Browse({
  isWidthReduced = false,
  setIsNotification,
  setIsVault,
  setIsStat,
  setIsRecent,
  setVip,
  setIsWallet,
  setIsLogOut,
  isMobile = false,
  setIsNotAccess
}) {
  const [isProfileExpanded, setIsProfileExpanded] = useState(false);
  const { pathname } = useLocation();
  const {user} = useAuth()
  const [isProfileExpandedWidth, setIsProfileExpandedWidth] = useState(316);
  const navigate = useNavigate();
  useEffect(() => {
    if (isWidthReduced) {
      setIsProfileExpanded(true);
      setIsProfileExpandedWidth(250);
    } else {
      setIsProfileExpanded(false);
      setIsProfileExpandedWidth(316);
    }
  }, [isWidthReduced]);

  
  return (
    <div
      className={`${
        isMobile ? "bg-bg" : ""
      } h-full p-4 flex flex-col gap-y-4 overflow-y-auto overflow-x-hidden `}
    >
      <div className="bg-sbg rounded-[4px] w-full flex flex-col ">
        <div
          style={{ height: isProfileExpanded ? isProfileExpandedWidth : 52 }}
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
              onClick={() => user ? setIsProfileExpanded((prev) => !prev) : setIsNotAccess(true)}
              className={`flex flex-row items-center p-4 gap-x-1 group  rounded-[4px]   ${user ? "hover:bg-sbgHover cursor-pointer " : " cursor-default text-ttext"}`}
            >
              <div className={` flex flex-row justify-center items-center  ${user ? "group-hover:text-[#eee] text-stext " : " "} `}>
                <Person2Icon sx={{ fontSize: 18 }} />
              </div>
              <div className=" text-sm font-semibold">Profile</div>
              <div
                className={`flex-1 flex flex-row justify-end items-center 
              ${user ? "group-hover:text-[#eee] text-stext " : " "}`}
              >
                {isProfileExpanded ? (
                  <KeyboardArrowDownIcon sx={{ fontSize: 18 }} />
                ) : (
                  <KeyboardArrowLeftIcon sx={{ fontSize: 18 }} />
                )}
              </div>
            </div>
          )}
          {isProfileExpanded && (
            <>
              {!isWidthReduced && (
                <div className= {`border-b-[2px] ${user ? "border-stext" : "border-ttext"}  `}></div>
              )}
              <div
                onClick={() =>  user ?  setIsWallet(true) : setIsNotAccess(true)}
                className={`flex flex-row items-center p-4 gap-x-1 group  rounded-[4px] ${user ? "hover:bg-sbgHover cursor-pointer " : " cursor-default text-ttext"}  ${
                  isWidthReduced ? "justify-center" : "justify-start"
                }`}
              >
                <div className= {`flex flex-row justify-center items-center ${user ? "group-hover:text-[#eee] text-stext " : " "}`}>
                  <WalletIcon sx={{ fontSize: 18 }} />
                </div>
                {!isWidthReduced && (
                  <div className=" text-sm font-semibold">Wallet</div>
                )}
              </div>
              <div
                onClick={() =>  user ?  setIsVault(true) : setIsNotAccess(true)}
                className={`flex flex-row items-center p-4 gap-x-1 group  rounded-[4px] ${user ? "hover:bg-sbgHover cursor-pointer " : " cursor-default text-ttext"}  ${
                  isWidthReduced ? "justify-center" : "justify-start"
                }`}
              >
                <div className= {`flex flex-row justify-center items-center ${user ? "group-hover:text-[#eee] text-stext " : " "}`}>
                  <AccountBalanceWalletIcon sx={{ fontSize: 18 }} />
                </div>
                {!isWidthReduced && (
                  <div className=" text-sm font-semibold">Vault</div>
                )}
              </div>
              <div
              onClick={() =>  user ?  setIsStat(true) : setIsNotAccess(true)}
               
                className={`flex flex-row items-center p-4 gap-x-1 group  rounded-[4px] ${user ? "hover:bg-sbgHover cursor-pointer " : " cursor-default text-ttext"}  ${
                  isWidthReduced ? "justify-center" : "justify-start"
                }`}
              >
                <div className= {`flex flex-row justify-center items-center ${user ? "group-hover:text-[#eee] text-stext " : " "}`}>
                  <AutoGraphIcon sx={{ fontSize: 18 }} />
                </div>
                {!isWidthReduced && (
                  <div className=" text-sm font-semibold">Statistics</div>
                )}
              </div>

              <div
              onClick={() =>  user ?  setIsNotification(true) : setIsNotAccess(true)}
              
                className={`flex flex-row items-center p-4 gap-x-1 group  rounded-[4px] ${user ? "hover:bg-sbgHover cursor-pointer " : " cursor-default text-ttext"}  ${
                  isWidthReduced ? "justify-center" : "justify-start"
                }`}
              >
               <div className= {`flex flex-row justify-center items-center ${user ? "group-hover:text-[#eee] text-stext " : " "}`}>
                  <NotificationsIcon sx={{ fontSize: 18 }} />
                </div>
                {!isWidthReduced && (
                  <div className=" text-sm font-semibold">Notification</div>
                )}
              </div>
              {!isWidthReduced && (
                <div className={`border-b-[2px] ${user ? "border-stext" : "border-ttext"}  `}></div>
              )}
              <div
                onClick={() =>  user ?  setIsLogOut(true) : setIsNotAccess(true)}
                className={`flex flex-row items-center p-4 gap-x-1 group  rounded-[4px] ${user ? "hover:bg-sbgHover cursor-pointer " : " cursor-default text-ttext"}  ${
                  isWidthReduced ? "justify-center" : "justify-start"
                }`}
              >
               <div className= {`flex flex-row justify-center items-center ${user ? "group-hover:text-[#eee] text-stext " : " "}`}>
                  <LogoutIcon sx={{ fontSize: 18 }} />
                </div>
                {!isWidthReduced && (
                  <div className=" text-sm font-semibold">Logout</div>
                )}
              </div>
            </>
          )}
        </div>

        <div
          onClick={() =>  user ?  setIsRecent(true) : setIsNotAccess(true)}
          className={`flex flex-row items-center p-4 gap-x-1 group  rounded-[4px] ${user ? "hover:bg-sbgHover cursor-pointer " : " cursor-default text-ttext"}  ${
            isWidthReduced ? "justify-center" : "justify-start"
          }`}
        >
          <div className= {`flex flex-row justify-center items-center ${user ? "group-hover:text-[#eee] text-stext " : " "}`}>
            <HistoryOutlinedIcon sx={{ fontSize: 18 }} />
          </div>
          {!isWidthReduced && (
            <div className=" text-sm font-semibold">Recent</div>
          )}
        </div>
        <div
          onClick={() => setVip(true)}
          className={`flex flex-row items-center p-4 gap-x-1 cursor-pointer group  rounded-[4px] hover:bg-sbgHover  ${
            isWidthReduced ? "justify-center" : "justify-start"
          }`}
        >
          <div className=" flex flex-row justify-center items-center group-hover:text-[#eee] text-stext">
            <EmojiEventsIcon sx={{ fontSize: 18 }} />
          </div>
          {!isWidthReduced && <div className=" text-sm font-semibold">VIP</div>}
        </div>
      </div>
      <div className="bg-sbg rounded-[4px] w-full flex flex-col">
        <div
          onClick={() => navigate("/")}
          className={`${
            pathname === "/" ? "bg-sbgHover" : ""
          } flex flex-row items-center p-4 gap-x-1 cursor-pointer group  rounded-[4px] hover:bg-sbgHover  ${
            isWidthReduced ? "justify-center" : "justify-start"
          }`}
        >
          <div
            className={`${
              pathname === "/" ? "group-text-[#eee]" : "text-stext"
            } flex flex-row justify-center items-center group-hover:text-[#eee] `}
          >
            <HomeIcon sx={{ fontSize: 18 }} />
          </div>
          {!isWidthReduced && (
            <div className=" text-sm font-semibold">Home</div>
          )}
        </div>
        <div
          onClick={() =>  navigate("/casino")}
          className={`${
            pathname === "/casino" ? "bg-sbgHover" : ""
          }  flex flex-row items-center p-4 gap-x-1 cursor-pointer group  rounded-[4px] hover:bg-sbgHover  ${
            isWidthReduced ? "justify-center" : "justify-start"
          }`}
        >
          <div
            className={`${
              pathname === "/casino" ? "group-text-[#eee]" : "text-stext"
            } flex flex-row justify-center items-center group-hover:text-[#eee] `}
          >
            <CasinoIcon sx={{ fontSize: 18 }} />
          </div>
          {!isWidthReduced && (
            <div className=" text-sm font-semibold">Casino</div>
          )}
        </div>
        <div
          onClick={() =>  navigate("/games")}
          className={`${
            pathname === "/games" ? "bg-sbgHover" : ""
          }  flex flex-row items-center p-4 gap-x-1 cursor-pointer group  rounded-[4px] hover:bg-sbgHover  ${
            isWidthReduced ? "justify-center" : "justify-start"
          }`}
        >
          <div
            className={`${
              pathname === "/games" ? "group-text-[#eee]" : "text-stext"
            } flex flex-row justify-center items-center group-hover:text-[#eee] `}
          >
            <GamesIcon sx={{ fontSize: 18 }} />
          </div>
          {!isWidthReduced && (
            <div className=" text-sm font-semibold">Games</div>
          )}
        </div>
        <div
          onClick={() => user ? navigate("/bets") : setIsNotAccess(true)}
          
          className={`${
            pathname === "/bets" ? "bg-sbgHover" : ""
          } flex flex-row items-center p-4 gap-x-1  group  rounded-[4px]${user ? "hover:bg-sbgHover cursor-pointer " : " cursor-default text-ttext"}  ${
            isWidthReduced ? "justify-center" : "justify-start"
          }`}
        >
          <div
            className={`${
              pathname === "/bets" ? "group-text-[#eee]" : user ? "group-hover:text-[#eee] text-stext " : "text-ttext "
            } flex flex-row justify-center items-center `}
          >
            <ReceiptOutlinedIcon sx={{ fontSize: 18 }} />
          </div>
          {!isWidthReduced && (
            <div className=" text-sm font-semibold">My Bets</div>
          )}
        </div>
        <div
        onClick={() => user ? navigate("/favorite") : setIsNotAccess(true)}
          
          className={`${
            pathname === "/favorite" ? "bg-sbgHover" : ""
          } flex flex-row items-center p-4 gap-x-1  group  rounded-[4px] ${user ? "hover:bg-sbgHover cursor-pointer " : " cursor-default text-ttext"}  ${
            isWidthReduced ? "justify-center" : "justify-start"
          }`}
        >
          <div
            className={`${
              pathname === "/favorite" ? "group-text-[#eee]" : user ? "group-hover:text-[#eee] text-stext " : "text-ttext "
            } flex flex-row justify-center items-center `}
          >
            <StarOutlineOutlinedIcon sx={{ fontSize: 18 }} />
          </div>
          {!isWidthReduced && (
            <div className=" text-sm font-semibold">Favourite</div>
          )}
        </div>
      </div>
      <div className="bg-sbg rounded-[4px] w-full flex flex-col ">
        {!isWidthReduced && (
          <>
            {" "}
            <div className="flex flex-row items-center p-4 gap-x-1 group  rounded-[4px] ">
              <div className=" text-sm font-semibold">Casino</div>
            </div>
            <div className=" border-b-[2px] border-stext"></div>
          </>
        )}
        <div
        onClick={() => user ? navigate("/casino/baccarat") : setIsNotAccess(true)}
          className={`${pathname === "/casino/baccarat" ? "bg-sbgHover" : ""} flex flex-row items-center p-4 gap-x-[6px]  group  rounded-[4px] ${user ? "hover:bg-sbgHover cursor-pointer " : " cursor-default text-ttext"}  ${
            isWidthReduced ? "justify-center" : "justify-start"
          }`}
        >
          <div className=" flex flex-row justify-center items-center group-hover:text-[#eee] text-stext">
            <img className=" w-[18px] min-w-[18px]  grayscale group-hover:filter-none" src="/baccarat.png" alt="" />
          </div>
          {!isWidthReduced && (
            <div className=" text-sm font-semibold ">Baccarat</div>
          )}
        </div>
        <div
        onClick={() => user ? navigate("/casino/blackjack") : setIsNotAccess(true)}
          className={`${pathname === "/casino/blackjack" ? "bg-sbgHover" : ""} flex flex-row items-center p-4 gap-x-[6px]  group  rounded-[4px] ${user ? "hover:bg-sbgHover cursor-pointer " : " cursor-default text-ttext"}  ${
            isWidthReduced ? "justify-center" : "justify-start"
          }`}
        >
          <div className=" flex flex-row justify-center items-center group-hover:text-[#eee] text-stext">
            <img className=" w-[18px] min-w-[18px]  invert " src="/blackjack.png" alt="" />
          </div>
          {!isWidthReduced && (
            <div className=" text-sm font-semibold ">Blackjack</div>
          )}
        </div>
      </div>
         <div  className="bg-sbg rounded-[4px] w-full flex flex-col ">
        {!isWidthReduced && (
          <>
            {" "}
            <div className="flex flex-row items-center p-4 gap-x-1 group  rounded-[4px] ">
              <div className=" text-sm font-semibold">Games</div>
            </div>
            <div className=" border-b-[2px] border-stext"></div>
          </>
        )}
        <div
        onClick={() => user ? navigate("/games/mines") : setIsNotAccess(true)}
          className={` ${pathname === "/games/mines" ? "bg-sbgHover" : ""
          } flex flex-row items-center p-4 gap-x-[6px]  group  rounded-[4px] ${user ? "hover:bg-sbgHover cursor-pointer " : " cursor-default text-ttext"}  ${
            isWidthReduced ? "justify-center" : "justify-start"
          }`}
        >
          <div className= {`${
              pathname === "/games/mines" ? "group-text-[#eee]" : "text-stext"
            } flex flex-row justify-center items-center group-hover:text-[#eee] `}>
          <DiamondIcon sx={{ fontSize: 18 }} />
          </div>
          {!isWidthReduced && (
            <div className=" text-sm font-semibold ">Mines</div>
          )}
        </div>
      </div>
    </div>
  );
}

export function BrowseWithTopNav({
  setIsNotification,
  setIsVault,
  setIsStat,
  setIsRecent,
  setVip,
  setIsWallet,
  setIsLogOut,setIsNotAccess
}) {
  const [isWidthReduced, setIsWidthReduced] = useState(false);
  const [isWidthReducable, setisWidthReducable] = useState(true);
  useEffect(() => {
  
    const handleResize = () => {
      if (window.innerWidth > 1280) {
        setisWidthReducable(true);
        setIsWidthReduced(false);
      } else {
        setisWidthReducable(false);
        setIsWidthReduced(true);
      }
    };
    handleResize()
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
        isWidthReduced ? "w-[100px]" : "w-[240px]"
      }   h-full flex flex-col bg-bg max-[750px]:hidden`}
    >
      <div className="h-[60px] w-full flex flex-row sticky top-0">
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
            <MenuIcon sx={{ fontSize: 36 }}  />
          </div>
        </div>
      </div>
      <Browse
        setIsStat={setIsStat}
        setIsVault={setIsVault}
        setIsNotification={setIsNotification}
        isWidthReduced={isWidthReduced}
        setIsRecent={setIsRecent}
        setVip={setVip}
        setIsWallet={setIsWallet}
        setIsLogOut={setIsLogOut}
        setIsNotAccess={setIsNotAccess}
      />
    </div>
  );
}
