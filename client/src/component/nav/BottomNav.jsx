import React, { useState } from 'react'
import CasinoIcon from "@mui/icons-material/Casino";
import GamesIcon from "@mui/icons-material/Games";
import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import HomeIcon from '@mui/icons-material/Home';

import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../layout/AuthProvider';
export default function ({setIsNotAccess}) {
    const navigate = useNavigate()
    const {pathname} = useLocation()
    const {user} = useAuth()
  return (
    <div className=' shadow-custom w-screen max-w-[100vw] min-h-[60px] hidden max-[750px]:flex flex-row items-center justify-evenly text-stext bg-sbg '>
        <div onClick={()=> navigate("/")}  className={`px-4 h-full flex flex-row items-center cursor-pointer max-[350px]:px-2 ${pathname === "/" ? "text-[#eee]" : ""}`}>
            <HomeIcon/>
        </div>
        <div onClick={()=> navigate("/browse")}  className={`px-4 h-full flex flex-row items-center cursor-pointer max-[350px]:px-2 ${pathname === "/browse" ? "text-[#eee]" : ""}`}>
            <ManageSearchIcon/>
        </div>
        <div onClick={()=> pathname.split("/")[1] !== "casino" && navigate("/casino")}   className={`px-4 h-full flex flex-row items-center cursor-pointer max-[350px]:px-2 ${pathname.split("/")[1] === "casino" ? "text-[#eee]" : ""}`}>
            <CasinoIcon/>
        </div>
        <div onClick={()=> pathname.split("/")[1]  !== "games" && navigate("/games")}  className={`px-4 h-full flex flex-row items-center cursor-pointer max-[350px]:px-2 ${pathname.split("/")[1]  === "games" ? "text-[#eee]" : ""}`}>
            <GamesIcon/>
        </div>
        <div onClick={() => user ? navigate("/bets") : setIsNotAccess(true)}  className={`px-4 h-full flex flex-row items-center max-[350px]:px-2 ${!user ?  "text-ttext"  : pathname === "/bets" ? "text-[#eee] cursor-pointer" : "cursor-pointer" }`}>
            <ReceiptOutlinedIcon/>
        </div>
     
        <div  onClick={() => user ? navigate("/favorite") : setIsNotAccess(true)}  className={`px-4 h-full flex flex-row items-center  max-[350px]:px-2  ${!user ? "text-ttext" : pathname === "/favorite" ? "text-[#eee] cursor-pointer" : "cursor-pointer"}`}>
            <StarOutlineOutlinedIcon/>
        </div>
    </div>
  )
}
