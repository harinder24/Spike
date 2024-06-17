import React, { useEffect, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  checkoutApi,
  getBetData,
  isMineActive,
  mineClick,
  setMineBet,
} from "../api/mines";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../component/layout/AuthProvider";

export default function Mines() {
  const [numOfMines, setNumOfMine] = useState(3);
  const [amount, setAmount] = useState("");
  const [isBetActive, setIsBetActive] = useState("");
  const {
    user,
    checkUserLogin,
    token,
    updateWallet,
    updateNotification,
    setGameError,
  } = useAuth();
  const [betData, setbetData] = useState(null);
  const [isActive, setIsActive] = useState(false);
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
    if (token) {
      isBetActiveHandler();
    }
  }, [token]);
  useEffect(() => {
    if (isBetActive) {
      getBetIdDataHandler();
    }
  }, [isBetActive]);
  const getBetIdDataHandler = async () => {
    try {
      const result = await getBetData(token, isBetActive);
      if (result.success) {
        setbetData(result.data);
        setAmount(result.data.amount.toString());
        setNumOfMine(result.data.mines);
      } else {
        setGameError(result.error);
      }
    } catch (error) {}
  };
  const isBetActiveHandler = async () => {
    try {
      const result = await isMineActive(token);
      if (result.success) {
        setIsBetActive(result.data);
      } else {
        setGameError(result.error);
      }
    } catch (error) {}
  };

  const controllerHandler = async () => {
    if (isBetActive) {
      if (betData.clicked.length === 0) {
        return;
      }
      setIsActive(true);
      try {
        const result = await checkoutApi(token, isBetActive);
        if (result.success) {
          setbetData(result.data);
          updateWallet();
          setIsActive(false);
          if (result.data?.isCompleted) {
            setIsBetActive("");
          }
        } else {
          setGameError(result.error);
          setIsActive(false);
        }
      } catch (error) {
        setIsActive(false);
      }
    } else {
      try {
        const result = await setMineBet(token, numOfMines, amount);
        if (result.success) {
          updateWallet();
          if (result.isLeveledUp) {
            updateNotification();
          }
          setIsBetActive(result.betId);
        } else {
          setGameError(result.error);
        }
      } catch (error) {}
    }
  };

  const mineClickHandler = async (index) => {
    setIsActive(true);
    try {
      const result = await mineClick(token, isBetActive, index);

      if (result.success) {
        setbetData(result.data);
        setIsActive(false);
        if (result.data?.isCompleted) {
          setIsBetActive("");
        }
      } else {
        setGameError(result.error);
        setIsActive(false);
      }
    } catch (error) {
      setIsActive(false);
    }
  };

  const handleInputChange = (e) => {
    let inputValue = e.target.value;

    // Remove any non-digit characters except for the decimal point
    inputValue = inputValue.replace(/[^0-9.]/g, "");

    // Remove leading zeros
    inputValue = inputValue.replace(/^0+(?!\.|$)/, "");

    // Ensure there is at most one decimal point
    const parts = inputValue.split(".");
    if (parts.length > 2) {
      inputValue = parts[0] + "." + parts.slice(1).join("");
    }

    // Ensure that cents are two digits
    if (parts[1] && parts[1].length > 2) {
      parts[1] = parts[1].substring(0, 2);
      inputValue = parts.join(".");
    }

    setAmount(inputValue);
  };

  return (
    <div className="w-full flex flex-row bg-sbg max-[750px]:bg-tbg  justify-center flex-1 overflow-y-auto overflow-x-hidden">
      <div className=" w-[1200px] max-[1440px]:w-full h-fit   flex flex-row rounded-lg  p-10 max-[750px]:p-4 max-[930px]:flex-col-reverse max-[930px]:w-[400px] max-[930px]:p-4 max-[420px]:w-full max-[420px]:p-0">
        <Controller
          isBetActive={isBetActive}
          numOfMines={numOfMines}
          setNumOfMine={setNumOfMine}
          amount={amount}
          handleInputChange={handleInputChange}
          setAmount={setAmount}
          controllerHandler={controllerHandler}
          betData={betData}
        />
        <MinesView
          mineClickHandler={mineClickHandler}
          isBetActive={isBetActive}
          betData={betData}
          isActive={isActive}
        />
      </div>
    </div>
  );
}
function MinesView({ isActive, isBetActive, mineClickHandler, betData }) {
  const gridItems = Array.from({ length: 25 }, (_, i) => i + 1);

  return (
    <div className=" flex-1 w-full bg-bg rounded-r-lg max-[930px]:rounded-t-lg max-[930px]:rounded-b-none flex flex-row justify-center items-center h-fit p-3 max-[420px]:rounded-none relative max-[750px]:rounded-b-lg">
      <div className="grid grid-cols-5 gap-4 max-[930px]:gap-2 ">
        {gridItems.map((item, i) => (
          <IndividualMine
            key={i}
            i={i}
            isBetActive={isBetActive}
            mineClickHandler={mineClickHandler}
            betData={betData}
            isActive={isActive}
          />
        ))}
      </div>
     {betData?.isCompleted && betData.payout > 0 && <div className=" absolute top-0 w-full h-full flex flex-row justify-center items-center z-[1]">
        <div className="min-w-[150px] border-[2px] rounded-lg border-green p-4 flex flex-col bg-[rgba(0,0,0,0.8)] items-center gap-y-2">
          <div className="flex flex-row items-center text-2xl font-semibold text-green gap-x-1">
            <div>{betData.multiplier.toFixed(2)}</div>
            <div className=" flex flex-row items-center">x</div>{" "}
          </div>
          <div className="w-10 h-1 rounded-full bg-border"></div>
          <div className="text-sm font-semibold text-green">CA${betData.payout.toFixed(2)}</div>
        </div>
      </div>}
    </div>
  );
}

function IndividualMine({
  isActive,
  i,
  isBetActive,
  mineClickHandler,
  betData,
}) {
  const [isClicked, setIsClicked] = useState(false);
  const [isMine, setIsMine] = useState(false);
  const [isRecent, setIsRecent] = useState(false);
  useEffect(() => {
    if (betData?.clicked) {
      const indexExists = betData?.clicked.find((obj) => obj.index === i);
      if (indexExists) {
        setIsClicked(true);
        if (!indexExists.isGem) {
          setIsMine(true);
        } else {
          setIsMine(false);
        }
      } else {
        setIsClicked(false);
      }
    }else{
      setIsClicked(false)
      setIsRecent(false)
    }
  }, [betData?.clicked]);

  useEffect(() => {
    if (betData?.recent && betData?.recent?.index) {
      if (betData?.recent?.index === i) {
        setIsRecent(true);
      } else {
        setIsRecent(false);
      }
    }else{
      setIsRecent(false)
    }
  }, [betData?.recent]);

  useEffect(() => {
    if (betData?.isCompleted) {
      completeHandler();
    }
  }, [betData?.isCompleted]);

  const completeHandler = async () => {
    // await sleep(1000);
    setIsClicked(true);
    if (betData?.minesArray[i] === false) {
      setIsMine(true);
    } else {
      setIsMine(false);
    }
  };
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  return (
    <>
      {!isClicked ? (
        <div
          onClick={() => !isClicked && mineClickHandler(i)}
          className={`${
            isBetActive && !isActive
              ? "hover:-translate-y-2 hover:bg-mines cursor-pointer max-[930px]:hover:-translate-y-1"
              : ""
          } bg-mines border-b-4 rounded-lg border-border  text-center size-[110px]   transform  duration-300 ease-in-out transition-transform max-[1100px]:size-[60px] max-[400px]:size-[50px] flex flex-row justify-center items-center`}
        ></div>
      ) : (
        <div
          className={`
      bg-mines border-b-4 rounded-lg border-border  text-center size-[110px]   transform  duration-300 ease-in-out transition-transform max-[1100px]:size-[60px] max-[400px]:size-[50px] flex flex-row justify-center items-center`}
        >
          <img
            className={`${isRecent ? "w-[75%]" : "w-[50%]"}`}
            src={isMine ? "/bomb.png" : "/gems.png"}
            alt=""
          />
        </div>
      )}
      {/* <></> : 

    </div> */}
    </>
  );
}

function Controller({
  isBetActive,
  numOfMines,
  setNumOfMine,
  handleInputChange,
  amount,
  setAmount,
  controllerHandler,
  betData,
}) {
  const gridItems = Array.from({ length: 24 }, (_, i) => i + 1);
  const [isMinesInput, setIsMinesInput] = useState(false);

  return (
    <div className="w-[300px] bg-tbg rounded-l-lg p-3 flex flex-col max-[930px]:w-full max-[930px]:rounded-b-lg max-[930px]:rounded-t-none max-[420px]:rounded-none">
      <div className=" text-xs font-semibold mb-1 flex flex-row justify-between text-stext">
        <div>Bet Amount</div>
        <div className="">
          CA${amount ? parseFloat(amount).toFixed(2) : (0).toFixed(2)}
        </div>
      </div>
      <div className=" flex flex-row relative shadow-custom rounded-[4px]">
        {isBetActive && (
          <div className=" absolute top-[0px] left-[0px] rounded-md w-[calc(100%+0px)] min-h-10 bg-[rgba(0,0,0,0.3)]  "></div>
        )}
        <input
          value={amount}
          onChange={handleInputChange}
          className={`w-full rounded-[4px] h-[40px] border-[2px] focus-visible:outline-none bg-bg border-[#2f4553]      text-[#eee]  px-4 rounded-r-none flex-1  ${
            !isBetActive
              ? "caret-[#eee] hover:border-[#557086] focus-visible:border-[#557086]"
              : ""
          }`}
          type="number"
        />
        <div
          onClick={() =>
            !isBetActive &&
            setAmount((prev) => (parseFloat(prev) / 2).toFixed(2).toString())
          }
          className={`flex flex-row items-center justify-center px-4 h-10 text-xs font-semibold bg-[#2f4553]  max-w-[40px]   ${
            !isBetActive ? "hover:bg-[#557086] cursor-pointer" : ""
          }`}
        >
          <div>1/2</div>
        </div>
        <div className="h-10 py-[10px] bg-[#2f4553]">
          {" "}
          <div className="w-[2px] h-full bg-bg rounded-full"></div>{" "}
        </div>
        <div
          onClick={() =>
            !isBetActive &&
            setAmount((prev) => (parseFloat(prev) * 2).toFixed(2).toString())
          }
          className={`flex flex-row items-center justify-center px-4 h-10 text-xs font-semibold bg-[#2f4553] r rounded-r-[4px] max-w-[40px] ${
            !isBetActive ? "hover:bg-[#557086] cursor-pointer" : ""
          }`}
        >
          <div>2 </div>
          <span className="ml-[2px] top-[-1px]  ">x</span>
        </div>
      </div>
      <div className=" flex flex-col max-[930px]:flex-col-reverse">
        {!isBetActive ? (
          <div className="flex flex-col relative">
            <div className="mb-1 mt-2 text-xs font-semibold text-stext">
              Mines
            </div>
            <div
              onClick={() => setIsMinesInput((prev) => !prev)}
              className={`w-full  rounded-[4px] min-h-[40px] border-[2px] focus-visible:outline-none bg-bg border-[#2f4553]    shadow-custom    caret-[#eee]  px-2  flex-1  text-[#eee] flex flex-row justify-between items-center relative 
                  cursor-pointer hover:border-[#557086] focus-visible:border-[#557086]
              
            `}
            >
              <div>{numOfMines}</div>
              <div className=" text-stext">
                <KeyboardArrowDownIcon />
              </div>
            </div>
            {isMinesInput && (
              <div className=" absolute bottom-[-306px] w-full max-h-[300px] overflow-y-auto rounded-md border-[2px] border-[#2f4553] cursor-pointer text-[#eee] bg-bg max-[930px]:bottom-[44px] z-[1]">
                {gridItems.map((items) => {
                  return (
                    <div
                      onClick={() => {
                        setNumOfMine(items);
                        setIsMinesInput(false);
                      }}
                      key={items}
                      className=" text-xs font-semibold w-full p-4  hover:bg-sbg"
                    >
                      {items}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="flex flex-row font-semibold mt-2 gap-x-2">
              <div className="flex-1 flex-col ">
                <div className="text-xs mb-1 text-stext">Mines</div>
                <div className=" rounded-md bg-[#2f4553] w-full flex flex-row items-center px-2 shadow-custom h-10">
                  <div>{numOfMines}</div>
                </div>
              </div>
              <div className="flex-1 flex-col ">
                <div className="text-xs mb-1 text-stext">Gems</div>
                <div className=" rounded-md bg-[#2f4553] w-full flex flex-row items-center px-2 shadow-custom h-10">
                  <div>{betData && betData?.gems}</div>
                </div>
              </div>
            </div>
            <div className="flex flex-col mt-2">
              <div className="flex flex-row justify-between text-stext text-xs font-semibold mb-1">
                <div className=" flex flex-row items-center">
                  <div>Total Profit (1.00</div>
                  <div className="text-[10px] ml-[2px]">x</div>
                  <div>)</div>
                </div>
                <div className="text-xs  font-semibold">
                  CA$
                  {(betData?.payout - betData?.amount).toFixed(2) > 0
                    ? (betData?.payout - betData?.amount).toFixed(2)
                    : (0).toFixed(2)}
                </div>
              </div>
              <div className=" rounded-md bg-[#2f4553] w-full flex flex-row items-center px-2 shadow-custom h-10">
                <div>
                  {(betData?.payout - betData?.amount).toFixed(2) > 0
                    ? (betData?.payout - betData?.amount).toFixed(2)
                    : (0).toFixed(2)}
                </div>
              </div>
            </div>
          </>
        )}
        <button
          onClick={controllerHandler}
          className={`w-full h-[52px] mt-4  rounded-[4px] shadow-custom  flex flex-row justify-center items-center  text-black text-sm font-semibold ${
            isBetActive && betData?.clicked.length === 0
              ? "bg-[rgb(49,147,49)] hover:bg-[rgb(49,147,49)]  cursor-default"
              : "bg-button2 hover:bg-buttonHover2 "
          }`}
        >
          {isBetActive ? "Cashout" : "Bet"}
        </button>
      </div>
    </div>
  );
}
