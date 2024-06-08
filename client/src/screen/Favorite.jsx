import React from "react";
import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
export default function Favorite() {
  return (
    <div className="w-full flex flex-col bg-bg  justify-start flex-1 overflow-y-auto ">
      <div className="min-h-[115px] flex w-full flex-row items-center bg-tbg max-[750px]:min-h-20">
        <div className="pl-10 text-xl max-[750px]:text-lg font-semibold max-[750px]:pl-4 flex flex-row gap-x-[6px]">
          <span className=" text-xl max-[750px]:text-lg  flex flex-row items-center">
            <StarOutlineOutlinedIcon sx={{ fontSize: "inherit" }} />
          </span>{" "}
          <span>Favourite</span>
        </div>
      </div>
      <div className=" w-full flex-1  flex flex-row justify-center">
        <div className=" w-[1200px] max-[1440px]:w-full    flex flex-row flex-wrap gap-4  px-10 max-[750px]:px-4 p-10 content-start">
          {true ? (
            <div className=" w-full flex flex-row justify-center gap-x-[6px] text-stext text-sm">
              <div>No favourites yet, use the</div>
              <div className="flex flex-row justify-center items-center">
                <StarOutlineOutlinedIcon sx={{ fontSize: 18 }} />
              </div>{" "}
              <div> to favourite games.</div>
            </div>
          ) : (
            <>
              <GamesAndCasinoIndividualWrapper image={"/baccarat.jpg"} name={"Baccart"} />
              <GamesAndCasinoIndividualWrapper image={"/baccarat.jpg"} name={"Baccart"} />
              <GamesAndCasinoIndividualWrapper image={"/baccarat.jpg"} name={"Baccart"} />
              <GamesAndCasinoIndividualWrapper image={"/baccarat.jpg"} name={"Baccart"} />
              <GamesAndCasinoIndividualWrapper image={"/baccarat.jpg"} name={"Baccart"} />
              <GamesAndCasinoIndividualWrapper image={"/baccarat.jpg"} name={"Baccart"} />
              <GamesAndCasinoIndividualWrapper image={"/baccarat.jpg"} name={"Baccart"} />
              <GamesAndCasinoIndividualWrapper image={"/baccarat.jpg"} name={"Baccart"} />
              <GamesAndCasinoIndividualWrapper image={"/baccarat.jpg"} name={"Baccart"} />
           
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export function GamesAndCasinoIndividualWrapper({ image, name }) {
  return (
    <>
      <div className=" w-[calc((100%/3)-12px)] min-w-[150px!important] max-[970px]:w-[calc((100%/2)-8px)] max-[570px]:w-[100%] aspect-[5/3]  rounded-lg h-fit relative overflow-hidden">
        <div className=" absolute top-1 right-1 text-stext hover:text-[#eee] p-1 cursor-pointer">
          <StarOutlineOutlinedIcon />
        </div>
        <img
          src={image}
          alt=""
          className="w-full h-full object-cover cursor-pointer"
        />
        <div className=" pointer-events-none absolute bottom-0 w-full flex flex-row justify-center pb-4 text-[150%] font-bold">
          <div>{name}</div>
        </div>
      </div>
    </>
  );
}
