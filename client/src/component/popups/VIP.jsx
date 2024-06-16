import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import BgOpacity from "../layout/BgOpacity";

import CasinoIcon from "@mui/icons-material/Casino";
import GamesIcon from "@mui/icons-material/Games";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import DiamondIcon from "@mui/icons-material/Diamond";
import StarIcon from "@mui/icons-material/Star";
import { YourProgress } from "../../screen/Home";
import { useAuth } from "../layout/AuthProvider";
import { getRakeback, getUserVipProgress, rakebackClaim } from "../../api/dataFetch";
export default function VIP({ setVip,setisLoading }) {
  const [stage, setStage] = useState(1);
  const { user } = useAuth();
  const onClickHandler = () => {
    setVip(false);
  };
  useEffect(() => {
    if (!user) {
      setStage(2);
    }
  }, [user]);

  return (
    <BgOpacity onClickHandler={onClickHandler}>
      <div className=" p-4 flex flex-col bg-sbg w-[500px] rounded-lg  max-[532px]:w-full relative  caret-transparent  gap-4 max-h-[80svh]">
        <div className=" flex flex-row justify-between">
          <div className="flex flex-row gap-x-[6px] text-stext items-center">
            <EmojiEventsIcon sx={{ fontSize: 18 }} />
            <div className="text-[#eee] font-semibold text-sm">VIP</div>
          </div>
          <div
            onClick={onClickHandler}
            className=" self-end text-stext hover:text-[#eee] cursor-pointer"
          >
            <CloseIcon sx={{ fontSize: 20 }} />
          </div>
        </div>
        <div className="overflow-y-auto flex flex-col gap-y-4">
          <div className="flex flex-row justify-center">
            <div
              className={`rounded-full p-1 flex flex-row gap-x-1 ${
                user ? "bg-bg" : ""
              } `}
            >
              {user && (
                <div
                  onClick={() => setStage(1)}
                  className={` ${
                    stage === 1 ? "bg-sbg" : "bg-transparent"
                  } rounded-full h-[44px] flex flex-row items-center justify-center font-semibold text-sm w-[100px] cursor-pointer hover:bg-sbg`}
                >
                  <div>Progress</div>
                </div>
              )}
              <div
                onClick={() => setStage(2)}
                className={` ${
                  stage === 2 ? "bg-sbg" : " bg-transparent"
                } rounded-full h-[44px] flex flex-row items-center justify-center font-semibold text-sm w-[100px]  hover:bg-sbg ${
                  user ? "cursor-pointer" : " cursor-default"
                }`}
              >
                <div>Benefits</div>
              </div>
              {user && (
                <div
                  onClick={() => setStage(3)}
                  className={` ${
                    stage === 3 ? "bg-sbg" : "bg-transparent"
                  } rounded-full h-[44px] flex flex-row items-center justify-center font-semibold text-sm w-[100px] cursor-pointer hover:bg-sbg`}
                >
                  <div>Rakeback</div>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col w-full flex-1 gap-y-4  ">
            {stage === 1 && <StageOne />}
            {stage === 2 && <StageTwo />}
            {stage === 3 && <StageThree onClickHandler={onClickHandler} setisLoading={setisLoading}/>}
          </div>
        </div>
      </div>
    </BgOpacity>
  );
}

function StageThree({setisLoading,onClickHandler}) {
  const { token,updateWallet } = useAuth();
  const [rakeback, setRakeback] = useState(0);
  const [error, setError] = useState("");
  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]);
  const fetchData = async () => {
    try {
      const result = await getRakeback(token);
      setRakeback(result.data);
    } catch (error) {}
  };

  const rakeBackHandler = async() => {
    setError("")
    try {
      setisLoading(true)
      const result = await rakebackClaim(token);
      setisLoading(false)
      if(result.success){
        updateWallet()
        onClickHandler()
      }else{
        setError(result.error)
      }
    } catch (error) {
      setisLoading(false)
    }
  }
  return (
    <>
      <div className="text-[#eee] font-semibold text-sm text-center">
        Available Rakeback
      </div>
      <div className="text-stext font-semibold text-xs text-center">
        CA${rakeback.toFixed(2)}
      </div>
      {error && (
        <div className=" relative text-error text-center text-xs  bre">
          {error}
        </div>
      )}
      <div onClick={rakeBackHandler} className="w-full h-[52px] mt-4 max-[750px]:mt-auto rounded-[4px] shadow-custom bg-button2 hover:bg-buttonHover2 flex flex-row justify-center items-center cursor-pointer">
        <div className="text-black text-sm font-semibold ">Claim Rakeback</div>
      </div>

      <div className="text-stext font-semibold text-xs text-center">
        Rakeback is accumulated each time you place a bet and VIP tier.
      </div>
    </>
  );
}

function StageTwo() {
  const { token } = useAuth();
  const [data, setData] = useState({
    level: 1,
    waggered: 0,
  });
  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]);
  const fetchData = async () => {
    try {
      const result = await getUserVipProgress(token);
      setData(result.data);
    } catch (error) {}
  };
  return (
    <div className=" flex flex-col gap-y-4">
      <StageTwoComponents level={data.level} i={1} />
      <StageTwoComponents level={data.level} i={2} />
      <StageTwoComponents level={data.level} i={3} />
      <StageTwoComponents level={data.level} i={4} />
      <StageTwoComponents level={data.level} i={5} />
    </div>
  );
}

function StageTwoComponents({ i, level }) {
  const keyMap = {
    1: "bronze",
    2: "silver",
    3: "gold",
    4: "platinum",
    5: "diamond",
  };
  const [isExpanded, setIsExpanded] = useState(false);
  useEffect(() => {
    if (i && level && i === level) {
      setIsExpanded(true);
    }else{
      setIsExpanded(false)
    }
  }, [i, level]);
  return (
    <div className={`w-full rounded-[4px] shadow-custom flex flex-col bg-tbg `}>
      <div
        onClick={() => setIsExpanded((prev) => !prev)}
        className="w-full flex flex-row items-center justify-between px-4 h-10 cursor-pointer"
      >
        <div className=" flex flex-row items-center gap-x-1">
          <div className={`text-${keyMap[i]} flex flex-row items-center`}>
            {" "}
            {i < 4 && <StarBorderIcon sx={{ fontSize: 18 }} />}
            {i === 4 && <StarIcon sx={{ fontSize: 18 }} />}
            {i === 5 && <DiamondIcon sx={{ fontSize: 18 }} />}
          </div>
          <div>
            {keyMap[i].split("")[0].toUpperCase() +
              keyMap[i].split("").splice(1, keyMap[i].length).join("")}
          </div>
        </div>
        <div
          className={` flex flex-row  items-center 
              text-stext
                 ee]`}
        >
          {isExpanded ? (
            <KeyboardArrowDownIcon sx={{ fontSize: 18 }} />
          ) : (
            <KeyboardArrowLeftIcon sx={{ fontSize: 18 }} />
          )}
        </div>
      </div>
      {isExpanded && (
        <>
          <div className="border-b-[2px] border-border "></div>
          <div className="p-4 text-xs text-stext">
            <div className="flex flex-row  items-center gap-x-[6px]">
              <div className="h-[6px] w-[6px] rounded-full bg-stext"></div>
              <div>Rakeback - {i}% on every loss</div>
            </div>
            <div className="flex flex-row  items-center gap-x-[6px] mt-1">
              <div className="h-[6px] w-[6px] rounded-full bg-stext"></div>
              <div>More coming soon</div>
            </div>
            { 
            i !== 1 && i > level && 
              <div className="flex flex-row  items-center gap-x-[6px] mt-3">
                <div className="h-[2px] w-[6px] rounded-full bg-stext"></div>
                <div>Wager ${(10 ** i * 25).toLocaleString()} in total to unlock</div>
              </div>
            }
          </div>
        </>
      )}
    </div>
  );
}

function StageOne() {
  return (
    <>
      <div className="flex flex-row justify-center w-full ">
        <div className="w-[300px] rounded-lg bg-bg p-4">
          <YourProgress />
        </div>
      </div>
      <div className="text-[#eee] font-semibold text-sm mt-4">
        Want to achieve the next level?
      </div>
      <div className=" text-xs mt-4 flex flex-row gap-x-3 items-center ">
        <div className="bg-bg rounded-[4px] p-2 text-stext flex flex-row items-center">
          <CasinoIcon sx={{ fontSize: 18 }} />
        </div>
        <div className="h-full flex flex-col gap-y-1">
          <div className="  font-semibold">Wager on Casino</div>
          <div className="  font-semibold text-stext">
            Play & wager on any casino games
          </div>
        </div>
      </div>
      <div className=" text-xs mt-3 flex flex-row gap-x-3 items-center ">
        <div className="bg-bg rounded-[4px] p-2 text-stext flex flex-row items-center">
          <GamesIcon sx={{ fontSize: 18 }} />
        </div>
        <div className="h-full flex flex-col gap-y-1">
          <div className="  font-semibold">Wager on Games</div>
          <div className="  font-semibold text-stext">
            Play & wager on any online games
          </div>
        </div>
      </div>
    </>
  );
}
