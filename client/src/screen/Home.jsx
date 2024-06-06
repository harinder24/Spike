import React, { useState } from "react";
import Nav from "../component/Nav";
import { BrowseWithTopNav } from "../component/Browse";
import HomeMainContent from "../component/HomeMainContent";
import Register from "../component/Register";
import Signin from "../component/Signin";
import Popups from "../component/Popups";


export default function Home() {
  const [isRegister, setIsRegister] = useState(false);
  const [isSignIn, setIsSignIn] = useState(false);
  const [isLoading , setisLoading] = useState(false)
  const [isNotification, setIsNotification] = useState(false)
  const [isVault, setIsVault] = useState(false);
  const [isStat, setIsStat] = useState(false);
  const [isRecent, setIsRecent] = useState(false);
  const [vip, setVip] = useState(false);
  const [wallet,setIsWallet] = useState(false)
  const [isLogOut, setIsLogOut] = useState(false)
  return (
    <>
    <Popups isRegister={isRegister} setIsRegister={setIsRegister} isLoading={isLoading} isSignIn={isSignIn} setIsSignIn={setIsSignIn} setisLoading={setisLoading} isNotification={isNotification} setIsNotification={setIsNotification}   isVault={isVault} setIsVault={setIsVault} isStat={isStat} setIsStat={setIsStat} isRecent={isRecent} setIsRecent={setIsRecent} setVip={setVip} vip={vip} wallet={wallet} setIsWallet={setIsWallet} isLogOut={isLogOut} setIsLogOut={setIsLogOut}/>
      <div className=" h-[100svh] w-screen overflow-hidden flex flex-row caret-transparent ">
        <BrowseWithTopNav setIsLogOut={setIsLogOut} setIsWallet={setIsWallet} setVip={setVip}  setIsRecent={setIsRecent} setIsStat={setIsStat} setIsVault={setIsVault} setIsNotification={setIsNotification}/>
        <div className="flex-1 flex flex-col ">
          <Nav setIsLogOut={setIsLogOut} setIsVault={setIsVault} setIsStat={setIsStat} setIsWallet={setIsWallet}  setIsSignIn={setIsSignIn} setIsRegister={setIsRegister} setIsNotification={setIsNotification} />
          <HomeMainContent setIsSignIn={setIsSignIn} setIsRegister={setIsRegister} />
        </div>
      </div>
    </>
  );
}
