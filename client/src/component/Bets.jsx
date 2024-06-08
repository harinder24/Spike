import React from "react";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
export default function Bets() {
  return (
    <div className="w-full flex flex-col bg-bg  justify-start flex-1 overflow-y-auto ">
      <div className="min-h-[115px] flex w-full flex-row items-center bg-tbg max-[750px]:min-h-20">
      <div className="pl-10 text-xl max-[750px]:text-lg font-semibold max-[750px]:pl-4 flex flex-row gap-x-[6px]">
          <span className=" text-xl max-[750px]:text-lg  flex flex-row items-center">
            <ReceiptOutlinedIcon sx={{ fontSize: "inherit" }} />
          </span>{" "}
          <span>Bets</span>
        </div>
      </div>
      <div className=" w-full flex-1  flex flex-row justify-center py-10">
        <div className=" w-[1200px] max-[1440px]:w-full max-[1440px]:max-w-[100vw]  flex flex-row    px-10 max-[750px]:px-4  content-start text-stext overflow-x-auto h-fit">
          {true ?<div className="w-full flex-col"> <div className=" text-sm  w-full text-center ">No Bets</div><div className=" text-sm font-semibold w-full text-center text-[#eee] mt-2 cursor-pointer">Start Betting Now!</div> </div>:
          <>
          <Game title={"Game"} isRoundedLeft={true} flex={true} />
          <BetId title={"Bet ID"}  flex={true} />
       <Date title={"Date"}  flex={true} />
              <Amount title={"Bet  Amount"}   />
        <Mutiplier title={"Multiplier"}   />
            <Payout title={"Payout"}  isRoundedRight={true}  />
          </>}</div>
      </div>
    </div>
  );
}

function Payout({title,isRoundedLeft = false,isRoundedRight = false,flex= false}){
  return(
    <div className={`flex flex-col ${flex ? "flex-grow" : "flex-grow-0"}  text-base `}>
      <div className="p-4 pl-4 text-stext text-center font-semibold">{title}</div>
      <div className= {`flex flex-row items-center gap-x-[6px] ${isRoundedLeft ? "rounded-l-[4px]" : "rounded-l-none"} ${isRoundedRight ? "rounded-r-[4px]" : "rounded-r-none"} bg-tbg p-4`}>
     
        <div className="whitespace-nowrap">-CA$4.00</div>
      </div>
    </div>
  )
}

function Mutiplier({title,isRoundedLeft = false,isRoundedRight = false,flex= false}) {
  return (
    <div className={`flex flex-col ${flex ? "flex-grow" : "flex-grow-0"}  text-base max-[800px]:hidden`}>
      <div className="p-4 pl-4 text-stext text-center font-semibold">{title}</div>
      <div className= {`flex flex-row items-center gap-x-[6px] ${isRoundedLeft ? "rounded-l-[4px]" : "rounded-l-none"} ${isRoundedRight ? "rounded-r-[4px]" : "rounded-r-none"} bg-tbg p-4`}>
     
        <div className=" flex flex-row items-center">2.00 <span className="text-[12px] pl-1">X</span></div>
      </div>
    </div>
  );
}
function Amount({title,isRoundedLeft = false,isRoundedRight = false,flex= false}) {
  return (
    <div className={`flex flex-col ${flex ? "flex-grow" : "flex-grow-0"}  text-base max-[1100px]:hidden`}>
      <div className="p-4 pl-4 text-stext text-center font-semibold">{title}</div>
      <div className= {`flex flex-row items-center gap-x-[6px] ${isRoundedLeft ? "rounded-l-[4px]" : "rounded-l-none"} ${isRoundedRight ? "rounded-r-[4px]" : "rounded-r-none"} bg-tbg p-4`}>
     
        <div className="">CA$400.00</div>
      </div>
    </div>
  );
}
function Date({title,isRoundedLeft = false,isRoundedRight = false,flex= false}) {
  return (
    <div className={`flex flex-col ${flex ? "flex-grow" : "flex-grow-0"}  text-base max-[1100px]:hidden`}>
      <div className="p-4 pl-4 text-stext font-semibold">{title}</div>
      <div className= {`flex flex-row items-center gap-x-[6px] ${isRoundedLeft ? "rounded-l-[4px]" : "rounded-l-none"} ${isRoundedRight ? "rounded-r-[4px]" : "rounded-r-none"} bg-tbg p-4`}>
     
        <div className="">2:40 AM 6/7/2024</div>
      </div>
    </div>
  );
}

function BetId({title,isRoundedLeft = false,isRoundedRight = false,flex= false}) {
  return (
    <div className={`flex flex-col ${flex ? "flex-grow" : "flex-grow-0"}  text-base`}>
      <div className="p-4 pl-4 text-stext font-semibold">{title}</div>
      <div className= {`flex flex-row items-center gap-x-[6px] ${isRoundedLeft ? "rounded-l-[4px]" : "rounded-l-none"} ${isRoundedRight ? "rounded-r-[4px]" : "rounded-r-none"} bg-tbg p-4`}>
     
        <ReceiptOutlinedIcon sx={{ fontSize: 18 }} />
        <div className="p- font-semibold whitespace-nowrap">123124343434</div>
      </div>
    </div>
  );
}

function Game({title,isRoundedLeft = false,isRoundedRight = false,flex= false}) {
  return (
    <div className={`flex flex-col ${flex ? "flex-grow" : "flex-grow-0"}  text-base`}>
      <div className="p-4 pl-4 text-stext font-semibold">{title}</div>
      <div className= {`flex flex-row items-center gap-x-[6px] ${isRoundedLeft ? "rounded-l-[4px]" : "rounded-l-none"} ${isRoundedRight ? "rounded-r-[4px]" : "rounded-r-none"} bg-tbg p-4 `}>
      <img className="w-[18px]" src="baccarat.png" alt="" />
        <div className="p- font-semibold whitespace-nowrap">Korean Speed Baccarat 2</div>
      </div>
    </div>
  );
}
