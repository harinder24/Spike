import React from "react";
import GamesIcon from "@mui/icons-material/Games";
import { GamesAndCasinoIndividualWrapper } from "./Favorite";


export default function Games({setIsNotAccess}) {
  return (
    <div className="w-full flex flex-col bg-bg  justify-start flex-1 overflow-y-auto ">
      <div className="min-h-[115px] flex w-full flex-row items-center bg-tbg max-[750px]:min-h-20">
        <div className="pl-10 text-xl max-[750px]:text-lg font-semibold max-[750px]:pl-4 flex flex-row gap-x-[6px]">
          <span className=" text-xl max-[750px]:text-lg  flex flex-row items-center">
            <GamesIcon sx={{ fontSize: "inherit" }} />
          </span>{" "}
          <span>Games</span>
        </div>
      </div>
      <div className=" w-full flex-1  flex flex-row justify-center">
        <div className=" w-[1200px] max-[1440px]:w-full    flex flex-row flex-wrap gap-4  px-10 max-[750px]:px-4 p-10 content-start">
          <GamesAndCasinoIndividualWrapper
            name={"Mines"}
            type={"games"}
            setIsNotAccess={setIsNotAccess}
          />
<div className= {`${false ? "w-[calc(100%-8px)] max-w-[300px] aspect-[5/3]" :"w-[calc((100%/3)-12px)] min-w-[150px!important] max-[970px]:w-[calc((100%/2)-8px)] max-[570px]:w-[100%] aspect-[5/3]"}  border-[2px] border-border  rounded-lg h-fit relative overflow-hidden p-4 text-sm font-semibold bg-sbg text-stext flex flex-row justify-center items-center`}>
          <div>
            More games coming soon
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
