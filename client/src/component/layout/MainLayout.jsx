import React, { useEffect, useState } from "react";
import Nav from "../nav/Nav";

import BottomNav from "../nav/BottomNav";
import { useLocation, useNavigate } from "react-router-dom";
import Popups from "../popups/Popups";
import Browse, { BrowseWithTopNav } from "../../screen/Browse";
import Home from "../../screen/Home";
import { useAuth } from "./AuthProvider";
import NotificationMiniPopup from "../popups/NotificationMiniPopup";
import GameError from "../popups/GameError";
import Games from "../../screen/Games";
import Casino from "../../screen/Casino";
import Favorite from "../../screen/Favorite";
export default function MainLayout({ children }) {
  const [isRegister, setIsRegister] = useState(false);
  const [isSignIn, setIsSignIn] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [isNotification, setIsNotification] = useState(false);
  const [isVault, setIsVault] = useState(false);
  const [isStat, setIsStat] = useState(false);
  const [isRecent, setIsRecent] = useState(false);
  const [vip, setVip] = useState(false);
  const [wallet, setIsWallet] = useState(false);
  const [isLogOut, setIsLogOut] = useState(false);
  const [isNotAccess, setIsNotAccess] = useState(false);
  const { pathname } = useLocation();
  const {
    notificationMiniPopup,
    setNotificationMiniPopup,
    setGameError,
    gameError,
  } = useAuth();
  return (
    <>
      <Popups
        isRegister={isRegister}
        setIsRegister={setIsRegister}
        isLoading={isLoading}
        isSignIn={isSignIn}
        setIsSignIn={setIsSignIn}
        setisLoading={setisLoading}
        isNotification={isNotification}
        setIsNotification={setIsNotification}
        isVault={isVault}
        setIsVault={setIsVault}
        isStat={isStat}
        setIsStat={setIsStat}
        isRecent={isRecent}
        setIsRecent={setIsRecent}
        setVip={setVip}
        vip={vip}
        wallet={wallet}
        setIsWallet={setIsWallet}
        isLogOut={isLogOut}
        setIsLogOut={setIsLogOut}
        isNotAccess={isNotAccess}
        setIsNotAccess={setIsNotAccess}
      />
      {notificationMiniPopup && (
        <NotificationMiniPopup
          setNotificationMiniPopup={setNotificationMiniPopup}
        />
      )}
      {gameError && (
        <GameError setGameError={setGameError} gameError={gameError} />
      )}
      <div className=" h-[100svh] w-screen overflow-hidden flex flex-row caret-transparent ">
        <BrowseWithTopNav
          setIsLogOut={setIsLogOut}
          setIsWallet={setIsWallet}
          setVip={setVip}
          setIsRecent={setIsRecent}
          setIsStat={setIsStat}
          setIsVault={setIsVault}
          setIsNotification={setIsNotification}
          setIsNotAccess={setIsNotAccess}
        />
        <div className="flex-1 flex flex-col ">
          <Nav
            setIsLogOut={setIsLogOut}
            setIsVault={setIsVault}
            setIsStat={setIsStat}
            setIsWallet={setIsWallet}
            setIsSignIn={setIsSignIn}
            setIsRegister={setIsRegister}
            setIsNotification={setIsNotification}
          />
          {pathname === "/" ? (
            <Home setIsRegister={setIsRegister} setIsSignIn={setIsSignIn} />
          ) : pathname === "/browse" ? (
            <Browse
              setIsNotification={setIsNotification}
              setIsVault={setIsVault}
              setIsRecent={setIsRecent}
              setVip={setVip}
              setIsWallet={setIsWallet}
              setIsLogOut={setIsLogOut}
              isMobile={true}
              setIsNotAccess={setIsNotAccess}
              setIsStat={setIsStat}
            />
          ) : pathname === "/games" ? (
            <Games setIsNotAccess={setIsNotAccess} />
          ) : pathname === "/casino" ? (
            <Casino setIsNotAccess={setIsNotAccess} />
          ) : pathname === "/favorite" ? (
            <Favorite setIsNotAccess={setIsNotAccess} />
          ) :(
            children
          )}

          <BottomNav setIsNotAccess={setIsNotAccess} />
        </div>
      </div>
    </>
  );
}
