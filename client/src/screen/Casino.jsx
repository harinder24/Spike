import React from "react";
import CasinoIcon from "@mui/icons-material/Casino";
import { GamesAndCasinoIndividualWrapper } from "./Favorite";

export default function Casino() {
  return (
    <div className="w-full flex flex-col bg-bg  justify-start flex-1 overflow-y-auto ">
      <div className="min-h-[115px] flex w-full flex-row items-center bg-tbg max-[750px]:min-h-20">
        <div className="pl-10 text-xl max-[750px]:text-lg font-semibold max-[750px]:pl-4 flex flex-row gap-x-[6px]">
          <span className=" text-xl max-[750px]:text-lg  flex flex-row items-center">
            <CasinoIcon sx={{ fontSize: "inherit" }} />
          </span>{" "}
          <span>Casino</span>
        </div>
      </div>
      <div className=" w-full flex-1  flex flex-row justify-center">
        <div className=" w-[1200px] max-[1440px]:w-full    flex flex-row flex-wrap gap-4  px-10 max-[750px]:px-4 p-10 content-start">
          <GamesAndCasinoIndividualWrapper
            image={"/baccarat.jpg"}
            name={"Baccart"}
          />

          <GamesAndCasinoIndividualWrapper
            image={"/baccarat.jpg"}
            name={"Baccart"}
          />
          <GamesAndCasinoIndividualWrapper
            image={"/baccarat.jpg"}
            name={"Baccart"}
          />
        </div>
      </div>
    </div>
  );
}
