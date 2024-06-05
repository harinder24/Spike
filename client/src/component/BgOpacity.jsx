import React, { useState } from "react";

export default function BgOpacity({ children, onClickHandler }) {
  
  return (
    <>
      <div
        onClick={onClickHandler}
        className=" cursor-pointer absolute top-0 h-[100svh] w-screen z-50 bg-[rgba(0,0,0,0.5)] "
      ></div>{" "}
      <div className=" pointer-events-none absolute top-0 h-[100svh] w-screen z-[51] flex flex-row justify-center items-center">
        <div className=" pointer-events-auto max-[532px]:w-screen px-4">
          {children}
        </div>
      </div>
      
    </>
  );
}
