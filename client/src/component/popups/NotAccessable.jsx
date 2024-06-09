import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import LoginIcon from "@mui/icons-material/Login";
import BgOpacity from "../layout/BgOpacity";
export default function NotAccessable({ setIsNotAccess,setIsRegister,setIsSignIn }) {
  const onClickHandler = () => {
    setIsNotAccess(false);
  };
  return (
    <BgOpacity onClickHandler={onClickHandler}>
      <div className=" p-4 flex flex-col bg-sbg w-[500px] rounded-lg  max-[532px]:w-full overflow-y-auto relative  caret-transparent  ">
        <div className=" flex flex-row justify-between">
          <div className="flex flex-row gap-x-[6px] text-stext items-center">
            <LoginIcon sx={{ fontSize: 18 }} />
            <div className="text-[#eee] font-semibold text-sm">
              Register or Sign in to access
            </div>
          </div>
          <div
            onClick={onClickHandler}
            className=" self-end text-stext hover:text-[#eee] cursor-pointer"
          >
            <CloseIcon sx={{ fontSize: 20 }} />
          </div>
        </div>
        {/* <div className="text-xs font-semibold mt-6">
        Are you sure you want to end your session and log out?
        </div>
        <div className="w-full h-[52px] mt-4  rounded-[4px] shadow-custom bg-redbg hover:bg-redbgHover flex flex-row justify-center items-center cursor-pointer">
          <div className=" text-sm font-semibold ">Log out</div>
        </div> */}
        <div className="w-full flex-row flex justify-center mt-6 mb-4">
          <div
            onClick={() => {setIsRegister(true); setIsNotAccess(false)}}
            className="h-[44px] w-[70%] min-w-[240px] cursor-pointer flex flex-row justify-center items-center rounded-full bg-button hover:bg-buttonHover text-sm font-semibold"
          >
            <div>Register instantly</div>
          </div>
        </div>
        <div className="w-full flex-row flex justify-center">
          <div className="flex flex-row items-center">
            <div className="w-20 border-y-[1px] border-tbg"></div>
            <div className="px-1 text-xs text-stext">OR</div>
            <div className="w-20 border-y-[1px] border-tbg"></div>
          </div>
        </div>
        <div
          onClick={() => {setIsSignIn(true); setIsNotAccess(false)}}
          className="text-center text-sm font-semibold mt-4 px-4 cursor-pointer"
        >
          Sign in
        </div>
      </div>
    </BgOpacity>
  );
}
