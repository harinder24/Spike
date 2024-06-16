import React, { useEffect, useState } from "react";
import ErrorIcon from '@mui/icons-material/Error';

export default function GameError({gameError, setGameError}) {

  useEffect(()=>{
    
        timer()
   
  },[])

  async function timer(){
    await sleep(3000)
    setGameError("")
  }
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  return (
    <div className=" absolute top-[76px] right-4 w-[300px] max-[330px]:w-[250px] shadow-custom z-30 bg-transparent flex flex-col rounded-[4px] caret-transparent">
        <div className=" flex flex-row ">
     <div className="flex flex-row items-center justify-center text-error w-[56px] bg-bg rounded-tl-[4px]">
      <ErrorIcon/>
      </div>
      <div className="flex-1 h-fit bg-tbg py-3 px-4 flex flex-col text-sm gap-[2px] min-h-20 rounded-tr-[4px]">
        <div className="flex flex-row items-center justify-between flex-wrap gap-[2px]">
          <div className=" font-semibold">Error</div>
         
        </div>
        <div className=" text-stext">
         {gameError}
        </div>
      </div>
      </div>
      <div className="h-3 w-full rounded-b-[4px] flex flex-row bg-bg overflow-hidden">
        <div className= {`bg-error animate-width-3s`}>

        </div>
      </div>
    </div>
  );
}
