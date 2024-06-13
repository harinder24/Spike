import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import LogoutIcon from "@mui/icons-material/Logout";
import BgOpacity from "../layout/BgOpacity";
import { useAuth } from "../layout/AuthProvider";
export default function Logout({ setIsLogOut }) {
  const onClickHandler = () => {
    setIsLogOut(false);
  };
  const {updateUserData} = useAuth()
  return (
    <BgOpacity onClickHandler={onClickHandler}>
      <div className=" p-4 flex flex-col bg-sbg w-[500px] rounded-lg  max-[532px]:w-full overflow-y-auto relative  caret-transparent  ">
        <div className=" flex flex-row justify-between">
          <div className="flex flex-row gap-x-[6px] text-stext items-center">
            <LogoutIcon sx={{ fontSize: 18 }} />
            <div className="text-[#eee] font-semibold text-sm">Log out</div>
          </div>
          <div
            onClick={onClickHandler}
            className=" self-end text-stext hover:text-[#eee] cursor-pointer"
          >
            <CloseIcon sx={{ fontSize: 20 }} />
          </div>
        </div>
        <div className="text-xs font-semibold mt-6">
          Are you sure you want to end your session and log out?
        </div>
        <div onClick={()=>{ updateUserData(); setIsLogOut(false)}} className="w-full h-[52px] mt-4  rounded-[4px] shadow-custom bg-redbg hover:bg-redbgHover flex flex-row justify-center items-center cursor-pointer">
          <div className=" text-sm font-semibold ">Log out</div>
        </div>
      </div>
    </BgOpacity>
  );
}
