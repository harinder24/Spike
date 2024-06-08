import React from 'react'
import CasinoIcon from "@mui/icons-material/Casino";
import GamesIcon from "@mui/icons-material/Games";
import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import HomeIcon from '@mui/icons-material/Home';

import { useNavigate, useLocation } from 'react-router-dom';
export default function () {
    const navigate = useNavigate()
    const {pathname} = useLocation()
  return (
    <div className=' shadow-custom w-screen max-w-[100vw] min-h-[60px] hidden max-[750px]:flex flex-row items-center justify-evenly text-stext bg-sbg '>
        <div onClick={()=> navigate("/")}  className={`px-4 h-full flex flex-row items-center cursor-pointer max-[350px]:px-2 ${pathname === "/" ? "text-[#eee]" : ""}`}>
            <HomeIcon/>
        </div>
        <div onClick={()=> navigate("/browse")}  className={`px-4 h-full flex flex-row items-center cursor-pointer max-[350px]:px-2 ${pathname === "/browse" ? "text-[#eee]" : ""}`}>
            <ManageSearchIcon/>
        </div>
        <div onClick={()=> navigate("/casino")}   className={`px-4 h-full flex flex-row items-center cursor-pointer max-[350px]:px-2 ${pathname === "/casino" ? "text-[#eee]" : ""}`}>
            <CasinoIcon/>
        </div>
        <div onClick={()=> navigate("/games")}  className={`px-4 h-full flex flex-row items-center cursor-pointer max-[350px]:px-2 ${pathname === "/games" ? "text-[#eee]" : ""}`}>
            <GamesIcon/>
        </div>
        <div onClick={()=> navigate("/bets")}   className={`px-4 h-full flex flex-row items-center cursor-pointer max-[350px]:px-2 ${pathname === "/bets" ? "text-[#eee]" : ""}`}>
            <ReceiptOutlinedIcon/>
        </div>
     
        <div  onClick={()=> navigate("/favorite")}   className={`px-4 h-full flex flex-row items-center cursor-pointer max-[350px]:px-2 ${pathname === "/favorite" ? "text-[#eee]" : ""}`}>
            <StarOutlineOutlinedIcon/>
        </div>
    </div>
  )
}
