import React, { useEffect, useState } from "react";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../component/layout/AuthProvider";
import { getBets } from "../api/dataFetch";
import DiamondIcon from "@mui/icons-material/Diamond";
export default function Bets() {
  const { checkUserLogin, user, token } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  useEffect(() => {
    if (!user) {
      const fetchInfo = async () => {
        try {
          const res = await checkUserLogin();
          return res;
        } catch (error) {
          console.error("Error checking user login:", error);
          return false;
        }
      };

      const checkAndNavigate = async () => {
        const result = await fetchInfo();

        if (!result) {
          navigate("/");
        }
      };

      checkAndNavigate();
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]);

  const fetchData = async () => {
    try {
      const result = await getBets(token);
      let resultData = result.data;
      if (resultData && resultData.length > 0) {
        resultData =  resultData.sort((a, b) => b.timeStamp - a.timeStamp);
      }
      
      setData(resultData);
    } catch (error) {}
  };
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
          {data && data.length > 0 ? (
            <>
              <Game
                data={data}
                title={"Game"}
                isRoundedLeft={true}
                flex={true}
              />
              <BetId data={data} title={"Bet ID"} flex={true} />
              <Date data={data} title={"Date"} flex={true} />
              <Amount data={data} title={"Bet  Amount"} />
              <Mutiplier data={data} title={"Multiplier"} />
              <Payout data={data} title={"Payout"} isRoundedRight={true} />
            </>
          ) : (
            <div className="w-full flex-col">
              {" "}
              <div className=" text-sm  w-full text-center ">No Bets</div>
              <div className=" text-sm font-semibold w-full text-center text-[#eee] mt-2 cursor-pointer">
                Start Betting Now!
              </div>{" "}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Payout({
  title,
  isRoundedLeft = false,
  isRoundedRight = false,
  flex = false,
  data,
}) {
  return (
    <div
      className={`flex flex-col ${
        flex ? "flex-grow" : "flex-grow-0"
      }  text-base `}
    >
      <div className="p-4 pl-4 text-stext text-center font-semibold">
        {title}
      </div>
      {data.map((item, i) => {
        return (
          <div
            key={i}
            className={`flex flex-row items-center gap-x-[6px] ${
              isRoundedLeft ? "rounded-l-[4px]" : "rounded-l-none"
            } ${isRoundedRight ? "rounded-r-[4px]" : "rounded-r-none"}  ${
              i % 2 === 0 ? "bg-tbg" : ""
            }  p-4`}
          >
            <div
              className={`whitespace-nowrap ${
                item.payout > 0 ? "text-green" : "text-error"
              }`}
            >
              {item.payout < 0
                ? "-CA$" + item.payout.toFixed(2).toString().split("-")[1]
                : "CA$" + item.payout.toFixed(2)}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Mutiplier({
  title,
  isRoundedLeft = false,
  isRoundedRight = false,
  flex = false,
  data,
}) {
  return (
    <div
      className={`flex flex-col ${
        flex ? "flex-grow" : "flex-grow-0"
      }  text-base max-[900px]:hidden`}
    >
      <div className="p-4 pl-4 text-stext text-center font-semibold">
        {title}
      </div>
      {data.map((item, i) => {
        return (
          <div
            key={i}
            className={`flex flex-row items-center gap-x-[6px] ${
              isRoundedLeft ? "rounded-l-[4px]" : "rounded-l-none"
            } ${isRoundedRight ? "rounded-r-[4px]" : "rounded-r-none"} ${
              i % 2 === 0 ? "bg-tbg" : ""
            }  p-4`}
          >
            <div className=" flex flex-row items-center">
              {item.multiplier.toFixed(2)}{" "}
              <span className="text-[12px] pl-1">X</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
function Amount({
  title,
  isRoundedLeft = false,
  isRoundedRight = false,
  flex = false,
  data,
}) {
  return (
    <div
      className={`flex flex-col ${
        flex ? "flex-grow" : "flex-grow-0"
      }  text-base max-[1200px]:hidden`}
    >
      <div className="p-4 pl-4 text-stext text-center font-semibold">
        {title}
      </div>
      {data.map((item, i) => {
        return (
          <div
            key={i}
            className={`flex flex-row items-center gap-x-[6px] ${
              isRoundedLeft ? "rounded-l-[4px]" : "rounded-l-none"
            } ${isRoundedRight ? "rounded-r-[4px]" : "rounded-r-none"} ${
              i % 2 === 0 ? "bg-tbg" : ""
            }  p-4`}
          >
            <div className="">CA${item.amount.toFixed(2)}</div>
          </div>
        );
      })}
    </div>
  );
}
function Date({
  title,
  isRoundedLeft = false,
  isRoundedRight = false,
  flex = false,
  data,
}) {
  return (
    <div
      className={`flex flex-col ${
        flex ? "flex-grow" : "flex-grow-0"
      }  text-base max-[1200px]:hidden`}
    >
      <div className="p-4 pl-4 text-stext font-semibold">{title}</div>
      {data.map((item, i) => {
        return (
          <div
            key={i}
            className={`flex flex-row items-center gap-x-[6px] ${
              isRoundedLeft ? "rounded-l-[4px]" : "rounded-l-none"
            } ${isRoundedRight ? "rounded-r-[4px]" : "rounded-r-none"} ${
              i % 2 === 0 ? "bg-tbg" : ""
            }  p-4`}
          >
            <div className="">{item.date}</div>
          </div>
        );
      })}
    </div>
  );
}

function BetId({
  title,
  isRoundedLeft = false,
  isRoundedRight = false,
  flex = false,
  data,
}) {
  return (
    <div
      className={`flex flex-col ${
        flex ? "flex-grow" : "flex-grow-0"
      }  text-base max-[550px]:hidden`}
    >
      <div className="p-4 pl-4 text-stext font-semibold">{title}</div>

      {data.map((item, i) => {
        return (
          <div
            key={i}
            className={`flex flex-row items-center gap-x-[6px] ${
              isRoundedLeft ? "rounded-l-[4px]" : "rounded-l-none"
            } ${isRoundedRight ? "rounded-r-[4px]" : "rounded-r-none"}  ${
              i % 2 === 0 ? "bg-tbg" : ""
            }  p-4`}
          >
            <ReceiptOutlinedIcon sx={{ fontSize: 18 }} />
            <div className="p- font-semibold whitespace-nowrap">{item._id}</div>
          </div>
        );
      })}
    </div>
  );
}

function Game({
  title,
  isRoundedLeft = false,
  isRoundedRight = false,
  flex = false,
  data,
}) {
  return (
    <div
      className={`flex flex-col ${
        flex ? "flex-grow" : "flex-grow-0"
      }  text-base`}
    >
      <div className="p-4 pl-4 text-stext font-semibold">{title}</div>
      {data.map((item, i) => {
        return (
          <div
            key={i}
            className={`flex flex-row items-center gap-x-[6px] ${
              isRoundedLeft ? "rounded-l-[4px]" : "rounded-l-none"
            } ${isRoundedRight ? "rounded-r-[4px]" : "rounded-r-none"} ${
              i % 2 === 0 ? "bg-tbg" : ""
            }  p-4 `}
          >
            {/* <img className="w-[18px]" src="baccarat.png" alt="" /> */}
            {item.game === "Mines" && <DiamondIcon sx={{ fontSize: 18 }} />}
            <div className="p- font-semibold whitespace-nowrap">
              {item.game}
            </div>
          </div>
        );
      })}
    </div>
  );
}
