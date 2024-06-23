import React, { useState, useEffect } from "react";
import { BsSuitSpadeFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { BsFillSuitDiamondFill } from "react-icons/bs";
import { BsFillSuitClubFill } from "react-icons/bs";
import { BsFillSuitHeartFill } from "react-icons/bs";
import { useAuth } from "../component/layout/AuthProvider";
import {
  blackjackHit,
  blackjackStand,
  getBetData,
  isBlackjackActive,
  setBlackjackBet,
} from "../api/blackjack";
export default function Blackjack() {
  const [amount, setAmount] = useState(0);
  const [betId, setBetId] = useState(null);
  const [betData, setBetData] = useState(null);
  const [isActive, seIsActive] = useState(true);
  const [dealerCard, setdealerCard] = useState([]);
  const [playerCard, setplayerCard] = useState([]);
  const [index, seIndex] = useState(0);
  const [playerScore, setPlayerScore] = useState(null);
  const [dealerScore, setDealerScore] = useState(null);
  const [showResult, setShowResult] = useState(false);
  
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
    if (token) {
      isBetActiveHandler();
    }
  }, [token]);
  useEffect(() => {
    if (betId) {
      
      getBetIdDataHandler();
    }
  }, [betId]);
  const getBetIdDataHandler = async () => {
    try {
      const result = await getBetData(token, betId);
      if (result.success) {
        setBetData(result.data);
        setAmount(result.data.amount.toString());
      } else {
        setGameError(result.error);
      }
    } catch (error) {}
  };
  const hitHandler = async () => {
    try {
      const result = await blackjackHit(token, betId);
      seIsActive(true);
      if (result.success) {
        setBetData(result.data);
      } else {
     
        setGameError(result.error);
      }
    } catch (error) {   location.href = location.href}
  };
  const standHandler = async () => {
    try {
      const result = await blackjackStand(token, betId);
      seIsActive(true);
      if (result.success) {
        setBetData(result.data);
      } else {
        setGameError(result.error);
      }
    } catch (error) {}
  };
  const isBetActiveHandler = async () => {
    try {
      const result = await isBlackjackActive(token);
      if (result.success) {
        setBetId(result.data);
      } else {
        setGameError(result.error);
      }
    } catch (error) {}
  };
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
  const setBetHandler = async () => {
    try {
      setShowResult(false)
      setdealerCard([]);
      setplayerCard([]);
      seIndex(0);
      setPlayerScore(null);
      setDealerScore(null);
      const result = await setBlackjackBet(token, amount);
      if (result.success) {
        updateWallet();
        if (result.isLeveledUp) {
          updateNotification();
        }
        setBetId(result.betId);
      } else {
        setGameError(result.error);
      }
    } catch (error) {}
  };
  return (
    <div className="w-full flex flex-row bg-sbg  justify-center flex-1 overflow-y-auto overflow-x-hidden max-[750px]:bg-tbg">
      <div className=" w-[1200px] max-[1440px]:w-full h-fit   flex flex-row rounded-lg  p-10 max-[750px]:p-4 max-[930px]:flex-col-reverse max-[930px]:w-[400px] max-[930px]:p-4 max-[420px]:w-full max-[420px]:p-0 ">
        <Controller
          betId={betId}
          setBetHandler={setBetHandler}
          handleInputChange={handleInputChange}
          amount={amount}
          setAmount={setAmount}
          betData={betData}
          isActive={isActive}
          hitHandler={hitHandler}
          standHandler={standHandler}
        />
        <BlackjackView
          setdealerCard={setdealerCard}
          dealerCard={dealerCard}
          playerCard={playerCard}
          setplayerCard={setplayerCard}
          index={index}
          seIndex={seIndex}
          betId={betId}
          seIsActive={seIsActive}
          betData={betData}
          setBetId={setBetId}
          setDealerScore={setDealerScore}
          setPlayerScore={setPlayerScore}
          playerScore={playerScore}
          dealerScore={dealerScore}
          setShowResult={setShowResult}
          showResult={showResult}
          updateWallet={updateWallet}
        />
      </div>
    </div>
  );
}

function BlackjackView({
  betData,
  seIsActive,
  dealerCard,
  setdealerCard,
  playerCard,
  setplayerCard,
  index,
  seIndex,
  setBetId,
  dealerScore,
  setDealerScore,
  playerScore,
  setPlayerScore,showResult, setShowResult,updateWallet
}) {
  const [playerAce, setPlayerAce] = useState(0)
  const [dealerAce, setDealerAce] = useState(0)
  useEffect(() => {
    if (betData) {
      if (index === 0) {
        initbetDataHandler();
      } else {
        notInitBetHandler();
      }
    }
  }, [betData]);

  useEffect(()=>{
    if(playerAce > 0){
      if(playerScore > 21){
        setPlayerScore((prev)=> prev - 10)
        setPlayerAce((prev)=> prev - 1)
      }
    }
  },[playerScore])
  useEffect(()=>{
    if(dealerAce > 0){
      if(dealerScore > 21){
        setDealerScore((prev)=> prev - 10)
        setDealerAce((prev)=> prev - 1)
      }
    }
  },[dealerScore])

  async function notInitBetHandler() {
    for (let i = index; i < betData.historyArr.length; i++) {
      const data = betData.historyArr[i];
      seIndex((prev) => prev + 1);
      if (data.type === "dealer") {
        setdealerCard((prev) => [...prev, data]);
        if(data.card.isAce){
          setDealerAce((prev)=> prev + 1)
        }
        setDealerScore((prev) => prev + data.card.amount);
      } else if (data.type === "player") {
        setPlayerScore((prev) => prev + data.card.amount);
        if(data.card.isAce){
          setPlayerAce((prev)=> prev + 1)
        }
        setplayerCard((prev) => [...prev, data]);
      } else if (data.type === "hidden") {
        setdealerCard((prev) => [...prev, data]);
      } else if (data.type === "show") {
        const indexThree = [dealerCard[0]];
        indexThree.push({ type: "dealer", card: data.card });
        if(data.card.isAce){
          setDealerAce((prev)=> prev + 1)
        }
        setDealerScore((prev) => prev + data.card.amount);
        setdealerCard(indexThree);
      }
      await sleep(1000);
    }
    console.log(betData.isCompleted);
    if (betData.isCompleted) {
      seIsActive(true);
      setBetId(null);
      setShowResult(true)
      updateWallet()
    } else {
      seIsActive(false);
    }
  }
  async function initbetDataHandler() {
    
    for (let i = 0; i < betData.historyArr.length; i++) {
      const data = betData.historyArr[i];
      seIndex((prev) => prev + 1);
      if (data.type === "dealer") {
        setDealerScore((prev) => prev + data.card.amount);
        setdealerCard((prev) => [...prev, data]);
        if(data.card.isAce){
          setDealerAce((prev)=> prev + 1)
        }
      } else if (data.type === "player") {
        setPlayerScore((prev) => prev + data.card.amount);
        setplayerCard((prev) => [...prev, data]);
        if(data.card.isAce){
          setPlayerAce((prev)=> prev + 1)
        }
      } else if (data.type === "hidden") {
        setdealerCard((prev) => [...prev, data]);
      } else if (data.type === "show") {
        const indexThree = [...dealerCard];
        indexThree[3] = { type: "dealer", card: data.card };
        setDealerScore((prev) => prev + data.card.amount);
        setdealerCard(indexThree);
        if(data.card.isAce){
          setDealerAce((prev)=> prev + 1)
        }
      }

      await sleep(1000);
    }

    if (betData.isCompleted) {
      seIsActive(true);
      setBetId(null);
      setShowResult(true)
      updateWallet()
    } else {
      seIsActive(false);
    }
  }

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  const [rightAmount, setRightAmount] = useState(0);
  const [rightBottomAmount, setRightBottomAmount] = useState(0);
  useEffect(() => {
    getRightValue();
    window.addEventListener("resize", getRightValue);

    return () => {
      window.removeEventListener("resize", getRightValue);
    };
  }, [dealerCard, playerCard]);


  const getRightValue = () => {
    if (dealerCard.length > 1 || playerCard.length > 1) {
      if (window.innerWidth <= 300) {
        setRightAmount((dealerCard.length - 1) * 6.5);
        setRightBottomAmount((playerCard.length - 1) * 6.5);
        return;
      }
      if (window.innerWidth <= 380) {
        setRightAmount((dealerCard.length - 1) * 5.5);
        setRightBottomAmount((playerCard.length - 1) * 5.5);
        return;
      }
      if (window.innerWidth <= 930) {
        setRightAmount((dealerCard.length - 1) * 4.2);
        setRightBottomAmount((playerCard.length - 1) * 4.2);
        return;
      }
      if (window.innerWidth <= 1000) {
        setRightAmount((dealerCard.length - 1) * 5.5);
        setRightBottomAmount((playerCard.length - 1) * 5.5);
        return;
      }
      if (window.innerWidth <= 1150) {
        setRightAmount((dealerCard.length - 1) * 4.2);
        setRightBottomAmount((playerCard.length - 1) * 4.2);
        return;
      }
      if (playerCard.length === 0) {
        setRightAmount(0);
      }
      if (dealerCard.length === 0) {
        setRightBottomAmount(0);
      }

      setRightAmount((dealerCard.length - 1) * 3.5);
      setRightBottomAmount((playerCard.length - 1) * 3.5);
      return;
    }
  };
  return (
    <div className=" min-[930px]:flex-1 w-full bg-bg rounded-r-lg max-[930px]:rounded-t-lg max-[930px]:rounded-b-none flex flex-col h-[600px]  p-4 max-[420px]:rounded-none relative max-[360px]:px-2 overflow-hidden max-[930px]:h-[400px]  max-[750px]:rounded-b-lg">
      <img
        className="w-[75px] absolute top-[-75px] right-10 max-[930px]:w-[60px] max-[930px]:top-[-50px] max-[315px]:right-6"
        src="/cardb.png"
        alt=""
      />{" "}
      <div className=" absolute top-0 left-0 w-full h-full pointer-events-none flex flex-col justify-center items-center text-stext font-semibold text-sm gap-y-2 max-[930px]:text-xs">
        <div>BLACKJACK PAYS 3 TO 2</div>
      </div>
      {dealerScore !== null && (
            <div className=" absolute top-8   left-0 w-full flex flex-row justify-center pointer-events-none ">
              <div
                className={`
                 
                     bg-tbg
                  w-[62px] px-2 py-1 font-semibold text-[#eee] flex flex-row justify-center items-center rounded-full text-sm  max-[930px]:text-xs`}
              >
                {" "}
                <div>{dealerScore}</div>
              </div>
            </div>
          )}
      <div className="flex-1 w-full relative">
        
        <div className=" w-full h-[33%] flex  flex-row justify-center absolute top-[60px]  ">
          <div style={{ right: `${rightAmount}%` }} className={` relative`}>
            {dealerCard.length > 0 && (
              <Card
                card={dealerCard[0].card.card}
                setDealerScore={setDealerScore}
                setPlayerScore={setPlayerScore}
                playerScore={playerScore}
                dealerScore={dealerScore}
                isCompleted={betData.isCompleted}
                showResult={showResult}
              />
            )}
            {dealerCard.length > 1 &&
              dealerCard.map((item, i) => {
                if (i > 0) {
                  return (
                    <div
                      key={i}
                      style={{ right: `-${60 * i}%` }}
                      className={`absolute w-full top-[-0%]  `}
                    >
                      <Card
                        card={item.card.card}
                        setDealerScore={setDealerScore}
                        setPlayerScore={setPlayerScore}
                        playerScore={playerScore}
                        dealerScore={dealerScore}
                        isCompleted={betData.isCompleted}
                        showResult={showResult}
                      />
                    </div>
                  );
                }
              })}
          </div>
        </div>
      </div>
      <div className="w-full h-[25%] flex flex-row">
        <div className=" flex flex-1 flex-row justify-center relative  ">
          {playerScore !== null && (
            <div className=" absolute top-[-75px] max-[930px]:top-[-60px] left-0 w-full flex flex-row justify-center pointer-events-none ">
              <div
                className={`
                 
                     bg-tbg
                  w-[62px] px-2 py-1 font-semibold text-[#eee] flex flex-row justify-center items-center rounded-full text-sm  max-[930px]:text-xs`}
              >
                {" "}
                <div>{playerScore}</div>
              </div>
            </div>
          )}
          <div
            style={{ right: `${rightBottomAmount}%` }}
            className={` relative`}
          >
            {playerCard.length > 0 && (
              <Card
                card={playerCard[0].card.card}
                setDealerScore={setDealerScore}
                setPlayerScore={setPlayerScore}
                playerScore={playerScore}
                dealerScore={dealerScore}
                isCompleted={betData.isCompleted}
                isPlayer={true}
                showResult={showResult}
              />
            )}
            {playerCard.length > 1 &&
              playerCard.map((item, i) => {
                if (i > 0) {
                  return (
                    <div
                      key={i}
                      style={{ right: `-${60 * i}%`, top: `-${20 * i}%` }}
                      className={`absolute w-full top-[-0%]  `}
                    >
                      <Card
                        card={item.card.card}
                        setDealerScore={setDealerScore}
                        setPlayerScore={setPlayerScore}
                        playerScore={playerScore}
                        dealerScore={dealerScore}
                        isCompleted={betData.isCompleted}
                        isPlayer={true}
                        showResult={showResult}
                      />
                    </div>
                  );
                }
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
function Card({
  card,
  result = false,
  isPlayer = false,
  dealerScore,
  setDealerScore,
  playerScore,
  setPlayerScore,
  isCompleted,showResult
}) {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <>
      {card === "" ? (
        <img
          className="w-full aspect-[5/8] h-full rounded-lg"
          src="/cardb.png"
          alt=""
        />
      ) : (
        <div
          className={`w-full aspect-[5/8] h-full rounded-lg bg-[#eee] p-[5%] flex flex-col gap-y-2 border-[4px]      ${
            showResult && isPlayer
              ? playerScore === dealerScore
                ? " border-yellow-600"
                : playerScore < 22 && playerScore > dealerScore || playerScore < 22 && dealerScore > 21
                ? "border-green2 "
                : "border-error"
              : " border-transparent"
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
      )}
    </>
  );
}

function Controller({
  handleInputChange,
  amount,
  setAmount,
  setBetHandler,
  betId,
  betData,
  isActive,
  hitHandler,
  standHandler,
}) {
  return (
    <div className="w-[300px] bg-tbg rounded-l-lg p-3 flex flex-col max-[930px]:w-full max-[930px]:rounded-b-lg max-[930px]:rounded-t-none max-[420px]:rounded-none">
      <div className=" text-xs font-semibold mb-1 flex flex-row justify-between text-stext">
        <div>Bet Amount</div>
        <div className="">CA${parseFloat(amount).toFixed(2)}</div>
      </div>
      <div className=" flex flex-row relative shadow-custom rounded-[4px]">
        {betId && (
          <div className=" absolute top-[0px] left-[0px] rounded-md w-[calc(100%+0px)] min-h-10 bg-[rgba(0,0,0,0.3)]  "></div>
        )}
        <input
          value={amount}
          onChange={handleInputChange}
          className={`w-full rounded-[4px] h-[40px] border-[2px] focus-visible:outline-none bg-bg border-[#2f4553]      text-[#eee]  px-4 rounded-r-none flex-1  ${
            true
              ? "caret-[#eee] hover:border-[#557086] focus-visible:border-[#557086]"
              : ""
          }`}
          type="number"
        />

        <div
          onClick={() =>
            !betId &&
            setAmount((prev) => (parseFloat(prev) / 2).toFixed(2).toString())
          }
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
          onClick={() =>
            !betId &&
            setAmount((prev) => (parseFloat(prev) * 2).toFixed(2).toString())
          }
          className={`flex flex-row items-center justify-center px-4 h-10 text-xs font-semibold bg-[#2f4553] r rounded-r-[4px] max-w-[40px] ${
            true ? "hover:bg-[#557086] cursor-pointer" : ""
          }`}
        >
          <div>2 </div>
          <span className="ml-[2px] top-[-1px]  ">x</span>
        </div>
      </div>
      <div className=" flex flex-col">
        <div className="h-10 flex flex-row gap-x-2 w-full mt-4">
          <div
            onClick={() =>
              betId &&
              !betData?.isCompleted &&
              !isActive &&
              hitHandler("double")
            }
            className={`flex flex-row items-center justify-center flex-1 h-full text-xs font-semibold bg-[#2f4553]  rounded-[4px] shadow-custom  ${
              betId && !betData?.isCompleted && !isActive
                ? "hover:bg-[#557086] cursor-pointer"
                : " opacity-50"
            }`}
          >
            <div>Hit </div>
          </div>
          <div
            onClick={() =>
              betId && !betData?.isCompleted && !isActive && standHandler()
            }
            className={`flex flex-row items-center justify-center flex-1 h-full text-xs font-semibold bg-[#2f4553]  rounded-[4px] shadow-custom  ${
              betId && !betData?.isCompleted && !isActive
                ? "hover:bg-[#557086] cursor-pointer"
                : " opacity-50"
            }`}
          >
            <div>Stand </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => !betId && setBetHandler()}
        className={`w-full h-[52px] mt-4  rounded-[4px] shadow-custom  flex flex-row justify-center items-center  text-black text-sm font-semibold  ${
          betId
            ? "bg-[rgb(49,147,49)] hover:bg-[rgb(49,147,49)]  cursor-default"
            : "bg-button2 hover:bg-buttonHover2 "
        }`}
      >
        Bet
      </button>
    </div>
  );
}
