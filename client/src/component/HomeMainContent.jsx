import React, { useState } from "react";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import CasinoIcon from "@mui/icons-material/Casino";
import GamesIcon from "@mui/icons-material/Games";
export default function HomeMainContent({ setIsRegister, setIsSignIn }) {
  return (
    <div className="w-full flex flex-row bg-bg  justify-center flex-1 overflow-y-auto">
      <div className=" max-w-[1200px] h-full  flex flex-col  max-[600px]:flex-col ">
        <div className=" flex flex-row">
          <RightContent
            setIsRegister={setIsRegister}
            setIsSignIn={setIsSignIn}
          />
          <LeftContent />
        </div>
        <MiddleContent />
      </div>
    </div>
  );
}

function MiddleContent() {
  return (
    <div className="flex flex-row p-10 max-[750px]:flex-col max-[750px]:px-4 gap-10  bg-sbg">
      <div className="flex flex-col gap-y-4  rounded-md cursor-pointer flex-1 ">
        <div className=" text-stext flex flex-row items-center gap-x-1  group w-fit">
          <div className=" group-hover:text-[#eee] flex flex-row justify-center items-center">
            <CasinoIcon sx={{ fontSize: 18 }} />
          </div>
          <div className="text-white font-semibold">Casino</div>
        </div>
        <img
          className=" w-full aspect-[5/2] object-cover"
          src="casino.jpeg"
          alt=""
        />
        <div className=" font-semibold">Leading Online Casino</div>
        <div className=" text-sm text-stext">
          Browse our giant range of casino games as Spake offers a fair and fun
          online gambling experience. Blackjack, Baccarat, Roulette, and many
          more classic casino games right from your browser.
        </div>
        <div className="h-[44px] mt-auto flex flex-row justify-center items-center text-sm font-semibold bg-button hover:bg-buttonHover rounded-[4px]">
          <div>Go to Casino</div>
        </div>
      </div>
      <div className="flex flex-col gap-y-4  rounded-md cursor-pointer flex-1 ">
        <div className=" text-stext flex flex-row items-center gap-x-1  group w-fit">
          <div className=" group-hover:text-[#eee] flex flex-row justify-center items-center">
            <GamesIcon sx={{ fontSize: 18 }} />
          </div>
          <div className="text-white font-semibold">Games</div>
        </div>
        <img
          className=" w-full aspect-[5/2] object-cover"
          src="games.jpg"
          alt=""
        />
        <div className=" font-semibold">Leading Gaming Casino</div>
        <div className=" text-sm text-stext">
          Browse our giant range of games as Spake offers a fair and fun online
          gaming experience. Mines, Crash, Dice, and many more classic casino
          games right from your browser.
        </div>

        <div className="h-[44px] mt-auto flex flex-row justify-center items-center text-sm font-semibold bg-button hover:bg-buttonHover rounded-[4px]">
          <div>Go to Games</div>
        </div>
      </div>
    </div>
  );
}

function LeftContent() {
  return (
    <div className="flex-1 flex flex-row justify-center max-[750px]:hidden">
      <img className="h-full" src="casino.png" alt="" />
    </div>
  );
}

function RightContent({ setIsRegister, setIsSignIn }) {
  const [isUserLogedIn, setIsUserLogedIn] = useState(false);
  return (
    <div className=" flex-1 flex flex-row items-center max-[750px]:w-screen">
      <div className="w-full flex flex-col p-10 max-[750px]:px-4">
        {isUserLogedIn ? (
          <>
            <div className=" text-lg font-semibold">Welcome back, hss24</div>
            <YourProgress />
          </>
        ) : (
          <>
            <div className="text-center text-xl font-semibold">
              Play Smarter
            </div>{" "}
            <div className="w-full flex-row flex justify-center my-4">
              <div
                onClick={() => setIsRegister(true)}
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
              onClick={() => setIsSignIn(true)}
              className="text-center text-sm font-semibold mt-4 px-4 cursor-pointer"
            >
              Sign in
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export function YourProgress({ isStat = false }) {
  return (
    <>
      {isStat && (
        <div className="mt-4 w-fit p-1 rounded-[4px] bg-bg text-bronze">
          <StarBorderIcon />
        </div>
      )}
      <div className="flex flex-row justify-between text-sm font-semibold mt-4">
        <div className="">Your VIP Progress</div>
        <div>89.33%</div>
      </div>
      <div
        className={`w-full rounded-full h-3 ${
          isStat ? "bg-bg" : "bg-sbg"
        }  mt-2`}
      >
        <div className=" w-[33%] bg-green h-full rounded-full"></div>
      </div>
      <div className="mt-4 flex flex-row justify-between text-sm font-semibold">
        <div className=" flex flex-row items-center gap-x-1">
          <div className=" text-bronze flex flex-row items-center">
            {" "}
            <StarBorderIcon sx={{ fontSize: 18 }} />
          </div>
          <div>Bronze</div>
        </div>
        <div className=" flex flex-row items-center gap-x-1">
          <div className=" text-silver flex flex-row items-center">
            {" "}
            <StarBorderIcon sx={{ fontSize: 18 }} />
          </div>
          <div>Silver</div>
        </div>
      </div>{" "}
    </>
  );
}
