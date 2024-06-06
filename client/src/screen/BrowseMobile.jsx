import React, { useEffect, useState } from "react";
import Nav from "../component/Nav";
import Browse from "../component/Browse";
import Popups from "../component/Popups";

export default function BrowseMobile() {
  const [isRegister, setIsRegister] = useState(false);
  const [isSignIn, setIsSignIn] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [isNotification, setIsNotification] = useState(false);
  const [isVault, setIsVault] = useState(false);
  const [isStat, setIsStat] = useState(false);
  const [isRecent, setIsRecent] = useState(false);
  const [vip, setVip] = useState(false);
  const [wallet, setIsWallet] = useState(false);
  const [isLogOut, setIsLogOut] = useState(false)
  useEffect(() => {
    if (window.innerWidth > 750) {
      console.log("yes");
    }
  }, []);
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
        vip={vip}
        setVip={setVip}
        wallet={wallet}
        setIsWallet={setIsWallet}
        isLogOut={isLogOut}
        setIsLogOut={setIsLogOut}
      />
      <div className="w-screen h-[100svh] flex flex-col bg-bg caret-transparent">
        <Nav
          setIsSignIn={setIsSignIn}
          setIsRegister={setIsRegister}
          setIsNotification={setIsNotification}
          setIsWallet={setIsWallet}
          setIsLogOut={setIsLogOut}
          setIsVault={setIsVault}
          setIsStat={setIsStat}
        />
        <Browse
          setIsLogOut={setIsLogOut}
          setIsWallet={setIsWallet}
          setVip={setVip}
          setIsRecent={setIsRecent}
          setIsStat={setIsStat}
          setIsVault={setIsVault}
          isWidthReduced={false}
          setIsNotification={setIsNotification}
        />
      </div>
    </>
  );
}
