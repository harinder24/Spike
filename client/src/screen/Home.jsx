import React, { useState } from "react";
import Nav from "../component/Nav";
import { BrowseWithTopNav } from "../component/Browse";
import HomeMainContent from "../component/HomeMainContent";
import Register from "../component/Register";
import Signin from "../component/Signin";


export default function Home() {
  const [isRegister, setIsRegister] = useState(false);
  const [isSignIn, setIsSignIn] = useState(false);
  const [isLoading , setisLoading] = useState(false)
  
  return (
    <>
    {isLoading && (
        <div className=" absolute top-0  h-[100svh] w-screen  flex flex-row justify-center items-center z-[52] bg-[rgb(0,0,0,0.5)]">
          <img className="w-20" src="loading.gif" alt="" />
        </div>
      )}
      {isRegister && (
       <Register setIsRegister={setIsRegister} setisLoading={setisLoading}/>
      )}
      {isSignIn && (
       <Signin setIsSignIn={setIsSignIn} setisLoading={setisLoading}/>
      )}
      <div className=" h-[100svh] w-screen overflow-hidden flex flex-row caret-transparent ">
        <BrowseWithTopNav />
        <div className="flex-1 flex flex-col ">
          <Nav setIsSignIn={setIsSignIn} setIsRegister={setIsRegister}/>
          <HomeMainContent setIsSignIn={setIsSignIn} setIsRegister={setIsRegister} />
        </div>
      </div>
    </>
  );
}
