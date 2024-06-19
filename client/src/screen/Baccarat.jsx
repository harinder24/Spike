import React, { useEffect, useState } from "react";
import { PiPokerChipFill } from "react-icons/pi";
import UndoIcon from "@mui/icons-material/Undo";
import ReplayIcon from "@mui/icons-material/Replay";
import { useAuth } from "../component/layout/AuthProvider";
import { BsSuitSpadeFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { baccaratApi } from "../api/baccarat";
import { BsFillSuitDiamondFill } from "react-icons/bs";
import { BsFillSuitClubFill } from "react-icons/bs";
import { BsFillSuitHeartFill } from "react-icons/bs";
export default function Baccarat() {
  const [chipAmount, setChipAmount] = useState(1);
  const [playerAmount, setPlayerAmount] = useState(0);
  const [tieAmount, setTieAmount] = useState(0);
  const [bankerAmount, setBankerAmount] = useState(0);
  const [totalAmount, setTotalAmoount] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [data, setData] = useState(null);
  const [amountHistory, setAmountHistory] = useState([]);
  const {
    user,
    checkUserLogin,
    token,
    updateWallet,
    updateNotification,
    setGameError,
    wallet,
  } = useAuth();

  const navigate = useNavigate();
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
    if (amountHistory && amountHistory.length > 0) {
      let pAmount = 0;
      let tAmount = 0;
      let bAmount = 0;
      amountHistory.map((item) => {
        if (item.type === "player") {
          pAmount += item.amount;
        }
        if (item.type === "tie") {
          tAmount += item.amount;
        }
        if (item.type === "banker") {
          bAmount += item.amount;
        }
        if (item.type === "double") {
          pAmount = pAmount * 2;
          tAmount = tAmount * 2;
          bAmount = bAmount * 2;
        }
        if (item.type === "half") {
          pAmount = Math.ceil(pAmount / 2);
          tAmount = Math.ceil(tAmount / 2);
          bAmount = Math.ceil(bAmount / 2);
        }
      });
      setPlayerAmount(pAmount);
      setTieAmount(tAmount);
      setBankerAmount(bAmount);
      setTotalAmoount(pAmount + tAmount + bAmount);
    } else {
      setPlayerAmount(0);
      setTieAmount(0);
      setBankerAmount(0);
      setTotalAmoount(0);
    }
  }, [amountHistory]);

  const tableHandler = (type) => {
    if (type === "undo") {
      if (amountHistory.length > 0) {
        setAmountHistory((prevAmountHistory) => {
          const updatedAmountHistory = prevAmountHistory.slice(0, -1);
          return updatedAmountHistory;
        });
      }
      return;
    }
    if (type === "clear") {
      if (amountHistory.length > 0) {
        setAmountHistory([]);
      }
      return;
    }
    if (type === "half") {
      if (playerAmount <= 1 && tieAmount <= 1 && bankerAmount <= 1) {
        return;
      }
    }
    if (type === "player") {
      if (playerAmount + chipAmount > 1000) {
        setGameError("Max bet on player is $1000.00");
        return;
      }
    }
    if (type === "tie") {
      if (tieAmount + chipAmount > 250) {
        setGameError("Max bet on player is $250.00");
        return;
      }
    }
    if (type === "banker") {
      if (bankerAmount + chipAmount > 1000) {
        setGameError("Max bet on player is $1000.00");
        return;
      }
    }
    const totalAmount = playerAmount + tieAmount + bankerAmount;
    if (type === "double") {
      if (amountHistory.length === 0) {
        return;
      }
      if (
        playerAmount * 2 > 1000 ||
        tieAmount * 2 > 250 ||
        bankerAmount * 2 > 1000
      ) {
        setGameError("Exceeding bet limit");
        return;
      }
      if (totalAmount * 2 > wallet) {
        setGameError("Bet amount can not be more than wallet amount");
        return;
      }
    }

    if (totalAmount + chipAmount > wallet) {
      setGameError("Bet amount can not be more than wallet amount");
      return;
    }

    setAmountHistory((prevAmountHistory) => [
      ...prevAmountHistory,
      {
        type: type,
        amount: chipAmount,
      },
    ]);
  };
  const betHandler = async () => {
    setIsActive(true);
    try {
      const result = await baccaratApi(token, {
        playerAmount,
        tieAmount,
        bankerAmount,
      });

      if (result.success) {
     

        if (result.isLeveledUp) {
          updateNotification();
        }
        setData(result.data);
      } else {
        setGameError(result.error);
      }
    } catch (error) {}
  };
  return (
    <div className="w-full flex flex-row bg-sbg  justify-center flex-1 overflow-y-auto overflow-x-hidden max-[750px]:bg-tbg">
      <div className=" w-[1200px] max-[1440px]:w-full h-fit   flex flex-row rounded-lg  p-10 max-[750px]:p-4 max-[930px]:flex-col-reverse max-[930px]:w-[400px] max-[930px]:p-4 max-[420px]:w-full max-[420px]:p-0 ">
        <Controller
          tableHandler={tableHandler}
          totalAmount={totalAmount}
          chipAmount={chipAmount}
          setChipAmount={setChipAmount}
          isActive={isActive}
          betHandler={betHandler}
        />
        <BaccaratView
          isActive={isActive}
          tableHandler={tableHandler}
          playerAmount={playerAmount}
          tieAmount={tieAmount}
          bankerAmount={bankerAmount}
          data={data}
          setIsActive={setIsActive}
          setAmountHistory={setAmountHistory}
          updateWallet={updateWallet}
        />
      </div>
    </div>
  );
}

function BaccaratView({
  playerAmount,
  tieAmount,
  bankerAmount,
  tableHandler,
  isActive,
  data,
  setIsActive,
  setAmountHistory,updateWallet
}) {
  const [stage, setStage] = useState(0);
  const [playerScore, setPlayerScore] = useState(null);
  const [bankerScore, setBankerScore] = useState(null);
  const [thirdPlayer, setThirdPlayer] = useState(null);
  const [thirdBanker, setThirdBanker] = useState(null);
  const [result, setResult] = useState(null);
  useEffect(() => {
    if (data && data.baccarat.history) {
      setStage(0);
      setThirdPlayer(false);
      setThirdBanker(false);
      setBankerScore(null);
      setPlayerScore(null);
      setResult(null);
      dataHandler();
    } else {
      setStage(0);
      setThirdPlayer(false);
      setThirdBanker(false);
      setBankerScore(null);
      setPlayerScore(null);
      setResult(null);
      setIsActive(false);
    }
  }, [data]);

  const dataHandler = async () => {
    for (let i = 0; i < data.baccarat.history.length; i++) {
      const item = data.baccarat.history[i];

      if (i < 4) {
        setStage(i + 1);
      } else {
        if (item.isPlayer) {
          setThirdPlayer(item.card);
        } else {
          setThirdBanker(item.card);
        }
      }

      if (item.isPlayer) {
        setPlayerScore((prev) => (prev + item.value) % 10);
      } else {
        setBankerScore((prev) => (prev + item.value) % 10);
      }
      if (i + 1 === data.baccarat.history.length) {
        setResult(data.baccarat.result);
      }
      await sleep(1000);
    }
    setAmountHistory([]);
    updateWallet()
    setIsActive(false);
  };
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  return (
    <div className=" min-[930px]:flex-1 w-full bg-bg rounded-r-lg max-[930px]:rounded-t-lg max-[930px]:rounded-b-none flex flex-col h-[600px]  p-4 max-[420px]:rounded-none relative max-[360px]:px-2 overflow-hidden max-[930px]:h-[400px]  max-[750px]:rounded-b-lg">
      {result && data.payout > data.amount && (
        <div className=" absolute top-0 w-full h-full flex flex-row justify-center items-center z-[1] pointer-events-none">
          <div
            className={`min-w-[150px] border-[2px] rounded-lg ${
              result === 3
                ? "border-yellow-600 text-yellow-600"
                : "border-green text-green"
            }  p-4 flex flex-col bg-[rgba(0,0,0,0.8)] items-center gap-y-2`}
          >
            <div className="flex flex-row items-center text-2xl font-semibold  gap-x-1">
              <div>{data.multiplier.toFixed(2)}</div>
              <div className=" flex flex-row items-center">x</div>{" "}
            </div>
            <div className="w-10 h-1 rounded-full bg-border"></div>
            <div className="text-sm font-semibold ">
              CA${data.payout.toFixed(2)}
            </div>
          </div>
        </div>
      )}
      <img
        className="w-[75px] absolute top-[-75px] right-10 max-[930px]:w-[60px] max-[930px]:top-[-50px]"
        src="/cardb.png"
        alt=""
      />
      <div className="  flex-1 flex flex-row justify-center  overflow-hidden">
        <div className="  w-[80%] my-10 relative left-[-6%]">
          <div className=" absolute w-[16%] min-w-[50px] top-0 left-0  ">
            {stage >= 1 && (
              <div className="w-full h-fit">
                <Card
                  card={data.baccarat.history[0].card}
                  result={result}
                  isPlayer={true}
                />
              </div>
            )}
            {stage >= 3 && (
              <div className="w-full h-fit absolute top-[20%] left-[60%] ">
                <Card
                  card={data.baccarat.history[2].card}
                  result={result}
                  isPlayer={true}
                />
              </div>
            )}
            {thirdPlayer && (
              <div className="w-full h-fit absolute top-[40%] left-[120%] ">
                <Card card={thirdPlayer} result={result} isPlayer={true} />
              </div>
            )}
          </div>
          <div className=" absolute w-[16%] min-w-[50px] top-0 right-[4%] max-[930px]:right-[8%] max-[350px]:right-[10%] max-[320px]:right-[12%] ">
            {stage >= 2 && (
              <div className="w-full h-fit">
                <Card card={data.baccarat.history[1].card} result={result} />
              </div>
            )}
            {stage >= 4 && (
              <div className="w-full h-fit absolute top-[20%] left-[60%] ">
                <Card card={data.baccarat.history[3].card} result={result} />
              </div>
            )}
            {thirdBanker && (
              <div className="w-full h-fit absolute top-[40%] left-[120%] ">
                <Card card={thirdBanker} result={result} />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-row gap-x-2 my-4 justify-center mx-10 max-[930px]:mx-0">
        <div
          onClick={() => !isActive && tableHandler("player")}
          className="flex-1 flex flex-col justify-evenly rounded-md cborder bg-tbg hover:bg-sbgHover border-[2px] aspect-video cursor-pointer font-semibold text-stext p-4 max-[380px]:p-2 relative"
        >
          <div className=" text-lg text-center max-[930px]:text-base max-[380px]:text-sm">
            Player
          </div>
          <div className="  text-center max-[930px]:text-sm max-[380px]:text-xs">
            CA${playerAmount.toFixed(2)}
          </div>
          <div className=" absolute top-[-30px] left-0 text-stext text-base font-semibold w-full text-center pointer-events-none">
            1 : 2
          </div>
          {playerScore !== null && (
            <div className=" absolute top-[-100px] max-[930px]:top-[-70px] left-0 w-full flex flex-row justify-center pointer-events-none ">
              <div
                className={`${
                  result
                    ? result === 3
                      ? "bg-yellow-600"
                      : result === 1
                      ? "bg-green2"
                      : "bg-tbg"
                    : "bg-tbg"
                }  w-[62px] px-2 py-1 font-semibold text-[#eee] flex flex-row justify-center items-center rounded-full text-sm  `}
              >
                {" "}
                <div>{playerScore}</div>
              </div>
            </div>
          )}
          <div className=" absolute  w-full bottom-[-24px] text-center left-0 text-stext text-[10px] font-semibold pointer-events-none">
            Max Bet: $1000
          </div>
          {playerAmount !== 0 && (
            <div
              className={`absolute top-0 right-0 max-[380px]:top-[-16px] pointer-events-none `}
            >
              <PiPokerChipFill
                className={` ${false ? "size-10" : "size-8"}  ${
                  playerAmount < 5
                    ? "text-red-600"
                    : playerAmount < 25
                    ? "text-blue-600"
                    : playerAmount < 100
                    ? "text-yellow-600"
                    : playerAmount < 250
                    ? "text-black"
                    : "text-teal-600"
                } `}
              />
              <div
                className={`text-white absolute  ${
                  false ? "top-[11px] text-xs" : " text-[10px] top-[9px]"
                }  w-full text-center font-semibold `}
              >
                {playerAmount === 1000 ? "1k" : playerAmount}
              </div>
            </div>
          )}
        </div>
        <div
          onClick={() => !isActive && tableHandler("tie")}
          className="flex-1 flex flex-col justify-evenly rounded-md cborder bg-tbg hover:bg-sbgHover border-[2px] aspect-video cursor-pointer font-semibold text-stext p-4 max-[380px]:p-2 relative"
        >
          <div className=" text-lg text-center max-[930px]:text-base max-[380px]:text-sm">
            Tie
          </div>
          <div className="  text-center max-[930px]:text-sm max-[380px]:text-xs">
            CA${tieAmount.toFixed(2)}
          </div>
          <div className=" absolute top-[-30px] left-0 text-stext text-base font-semibold w-full text-center pointer-events-none">
            1 : 8
          </div>
          <div className=" absolute  left-0 text-stext text-[10px] font-semibold pointer-events-none w-full bottom-[-24px] text-center">
            Max Bet: $250
          </div>
          {tieAmount !== 0 && (
            <div
              className={`absolute top-0 right-0 max-[380px]:top-[-16px]  pointer-events-none`}
            >
              <PiPokerChipFill
                className={` ${false ? "size-10" : "size-8"}  ${
                  tieAmount < 5
                    ? "text-red-600"
                    : tieAmount < 25
                    ? "text-blue-600"
                    : tieAmount < 100
                    ? "text-yellow-600"
                    : tieAmount < 250
                    ? "text-black"
                    : "text-teal-600"
                } `}
              />
              <div
                className={`text-white absolute  ${
                  false ? "top-[11px] text-xs" : " text-[10px] top-[9px]"
                }  w-full text-center font-semibold`}
              >
                {tieAmount === 1000 ? "1k" : tieAmount}
              </div>
            </div>
          )}
        </div>
        <div
          onClick={() => !isActive && tableHandler("banker")}
          className="flex-1 flex flex-col justify-evenly rounded-md cborder bg-tbg hover:bg-sbgHover border-[2px] aspect-video cursor-pointer font-semibold text-stext p-4 max-[380px]:p-2 relative"
        >
          <div className=" text-lg text-center max-[930px]:text-base max-[380px]:text-sm">
            Banker
          </div>
          <div className="  text-center max-[930px]:text-sm max-[380px]:text-xs">
            CA${bankerAmount.toFixed(2)}
          </div>
          {bankerScore !== null && (
            <div className=" absolute top-[-100px]  max-[930px]:top-[-70px] left-0 w-full flex flex-row justify-center pointer-events-none ">
              <div
                className={`${
                  result
                    ? result === 3
                      ? "bg-yellow-600"
                      : result === 2
                      ? "bg-green2"
                      : "bg-tbg"
                    : "bg-tbg"
                } w-[62px] px-2 py-1 font-semibold text-[#eee] flex flex-row justify-center items-center rounded-full text-sm`}
              >
                {" "}
                <div>{bankerScore}</div>
              </div>
            </div>
          )}
          <div className=" absolute top-[-30px] left-0 text-stext text-base font-semibold w-full text-center pointer-events-none">
            1 : 1.95
          </div>
          <div className=" absolute  w-full bottom-[-24px] text-center left-0 text-stext text-[10px] font-semibold pointer-events-none">
            Max Bet: $1000
          </div>
          {bankerAmount !== 0 && (
            <div
              className={`absolute top-0 right-0 max-[380px]:top-[-16px] pointer-events-none`}
            >
              <PiPokerChipFill
                className={` ${false ? "size-10" : "size-8"}  ${
                  bankerAmount < 5
                    ? "text-red-600"
                    : bankerAmount < 25
                    ? "text-blue-600"
                    : bankerAmount < 100
                    ? "text-yellow-600"
                    : bankerAmount < 250
                    ? "text-black"
                    : "text-teal-600"
                } `}
              />
              <div
                className={`text-white absolute  ${
                  false ? "top-[11px] text-xs" : " text-[10px] top-[9px]"
                }  w-full text-center font-semibold`}
              >
                {bankerAmount === 1000 ? "1k" : bankerAmount}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className=" flex flex-row justify-between w-full mt-4">
        <div
          onClick={() => !isActive && tableHandler("undo")}
          className="flex flex-row items-center gap-2 cursor-pointer group"
        >
          <div className="flex flex-row items-center text-stext group-hover:text-[#eee]">
            <UndoIcon sx={{ fontSize: 18 }} />
          </div>
          <div className="text-sm font-semibold">Undo</div>
        </div>
        <div
          onClick={() => !isActive && tableHandler("clear")}
          className="flex flex-row items-center gap-2 cursor-pointer group"
        >
          <div className="flex flex-row items-center text-stext group-hover:text-[#eee]">
            <ReplayIcon sx={{ fontSize: 18 }} />
          </div>
          <div className="text-sm font-semibold">Clear</div>
        </div>
      </div>
    </div>
  );
}

function Card({ card, result, isPlayer = false }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div
      className={`w-full aspect-[5/8] h-full rounded-lg bg-[#eee] p-[5%] flex flex-col gap-y-2 border-[4px]      ${
        result
          ? result === 3
            ? " border-yellow-600"
            : isPlayer && result === 1
            ? "border-green2 "
            : !isPlayer && result === 2
            ? "border-green2"
            : " border-transparent"
          : "border-transparent"
      } overflow-hidden shadow-custom transition-opacity ${
        isVisible ? "opacity-100 " : "opacity-0 "
      } ${
        card.split(" ")[0] === "S" || card.split(" ")[0] === "C"
          ? "text-black"
          : "text-red-600"
      }`}
    >
      <div className=" text-4xl font-bold  pl-2 pt-2 max-[1030px]:text-3xl max-[970px]:text-2xl max-[970px]:pl-1">
        {card.split(" ")[1]}
      </div>
      <div className="flex flex-row justify-start">
        {card.split(" ")[0] === "S" && (
          <BsSuitSpadeFill className="size-10   max-[1030px]:size-8 max-[970px]:size-6" />
        )}
        {card.split(" ")[0] === "D" && (
          <BsFillSuitDiamondFill className="size-10   max-[1030px]:size-8 max-[970px]:size-6" />
        )}
        {card.split(" ")[0] === "H" && (
          <BsFillSuitHeartFill className="size-10   max-[1030px]:size-8 max-[970px]:size-6" />
        )}
        {card.split(" ")[0] === "C" && (
          <BsFillSuitClubFill className="size-10   max-[1030px]:size-8 max-[970px]:size-6" />
        )}
      </div>
    </div>
  );
}

function Controller({
  chipAmount,
  setChipAmount,
  totalAmount,
  tableHandler,
  betHandler,
  isActive,
}) {
  return (
    <div className="w-[300px] bg-tbg rounded-l-lg p-3 flex flex-col max-[930px]:w-full max-[930px]:rounded-b-lg max-[930px]:rounded-t-none max-[420px]:rounded-none">
      <div className=" text-xs font-semibold mb-1 flex flex-row  text-stext">
        <div>Chip Value CA${chipAmount.toFixed(2)}</div>
      </div>
      <div className="mb-4 flex flex-row justify-evenly h-10 items-center">
        <div
          onClick={() => !isActive && setChipAmount(1)}
          className=" relative  cursor-pointer"
        >
          <PiPokerChipFill
            className={` ${
              chipAmount === 1 ? "size-10" : "size-8"
            }  text-red-600 `}
          />
          <div
            className={`text-white absolute  ${
              chipAmount === 1 ? "top-[11px] text-xs" : " text-[10px] top-[9px]"
            }  w-full text-center font-semibold`}
          >
            {" "}
            1{" "}
          </div>
        </div>
        <div
          onClick={() => !isActive && setChipAmount(5)}
          className=" relative  cursor-pointer"
        >
          <PiPokerChipFill
            className={`  ${
              chipAmount === 5 ? "size-10" : "size-8"
            } text-blue-600 `}
          />
          <div
            className={`text-white absolute  ${
              chipAmount === 5 ? "top-[11px] text-xs" : " text-[10px] top-[9px]"
            }  w-full text-center font-semibold`}
          >
            {" "}
            5{" "}
          </div>
        </div>
        <div
          onClick={() => !isActive && setChipAmount(25)}
          className=" relative  cursor-pointer"
        >
          <PiPokerChipFill
            className={`  ${
              chipAmount === 25 ? "size-10" : "size-8"
            }  text-yellow-600`}
          />
          <div
            className={`text-white absolute  ${
              chipAmount === 25
                ? "top-[11px] text-xs"
                : " text-[10px] top-[9px]"
            }  w-full text-center font-semibold`}
          >
            {" "}
            25{" "}
          </div>
        </div>
        <div
          onClick={() => !isActive && setChipAmount(100)}
          className=" relative  cursor-pointer"
        >
          <PiPokerChipFill
            className={`  ${
              chipAmount === 100 ? "size-10" : "size-8"
            }  text-black`}
          />
          <div
            className={`text-white absolute  ${
              chipAmount === 100
                ? "top-[11px] text-xs"
                : " text-[10px] top-[9px]"
            }  w-full text-center font-semibold`}
          >
            {" "}
            100{" "}
          </div>
        </div>
        <div
          onClick={() => !isActive && setChipAmount(250)}
          className=" relative  cursor-pointer"
        >
          <PiPokerChipFill
            className={`  ${
              chipAmount === 250 ? "size-10" : "size-8"
            } text-teal-600`}
          />
          <div
            className={`text-white absolute  ${
              chipAmount === 250
                ? "top-[11px] text-xs"
                : " text-[10px] top-[9px]"
            }  w-full text-center font-semibold`}
          >
            {" "}
            250{" "}
          </div>
        </div>
      </div>
      <div className=" text-xs font-semibold mb-1 flex flex-row justify-between text-stext">
        <div>Bet Amount</div>
        <div className="">CA${totalAmount.toFixed(2)}</div>
      </div>
      <div className=" flex flex-row relative shadow-custom rounded-[4px]">
        <div
          className={`w-full rounded-[4px] h-[40px] border-[2px] focus-visible:outline-none bg-[#2f4553] border-[#2f4553]      text-[#eee]  px-4 rounded-r-none flex-1 items-center flex flex-row  ${
            true ? " hover:border-[#557086] focus-visible:border-[#557086]" : ""
          }`}
        >
          {" "}
          <div> {totalAmount.toFixed(2)}</div>
        </div>

        <div
          onClick={() => !isActive && tableHandler("half")}
          className={`flex flex-row items-center justify-center px-4 h-10 text-xs font-semibold bg-[#2f4553]  max-w-[40px]   ${
            true ? "hover:bg-[#557086] cursor-pointer" : ""
          }`}
        >
          <div>1/2</div>
        </div>
        <div className="h-10 py-[10px] bg-[#2f4553]">
          {" "}
          <div className="w-[2px] h-full bg-bg rounded-full"></div>{" "}
        </div>
        <div
          onClick={() => !isActive && tableHandler("double")}
          className={`flex flex-row items-center justify-center px-4 h-10 text-xs font-semibold bg-[#2f4553] r rounded-r-[4px] max-w-[40px] ${
            true ? "hover:bg-[#557086] cursor-pointer" : ""
          }`}
        >
          <div>2 </div>
          <span className="ml-[2px] top-[-1px]  ">x</span>
        </div>
      </div>

      <button
        onClick={() => !isActive && betHandler()}
        className={`w-full h-[52px] mt-4  rounded-[4px] shadow-custom  flex flex-row justify-center items-center  text-black text-sm font-semibold ${
          isActive || totalAmount === 0
            ? "bg-[rgb(49,147,49)] hover:bg-[rgb(49,147,49)]  cursor-default"
            : "bg-button2 hover:bg-buttonHover2 "
        }`}
      >
        Bet
      </button>
    </div>
  );
}
