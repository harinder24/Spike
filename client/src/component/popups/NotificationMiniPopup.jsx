import React, { useEffect, useState } from "react";
import { useAuth } from "../layout/AuthProvider";
import WalletIcon from "@mui/icons-material/Wallet";
import MovingIcon from '@mui/icons-material/Moving';
export default function NotificationMiniPopup({setNotificationMiniPopup}) {
  const [data, setData] = useState(null);
  const { notification } = useAuth();
  useEffect(() => {
    if (notification) {
      setData(notification.list[notification.list.length - 1]);
      
    }
  }, [notification]);

  useEffect(()=>{
    if(data){
        timer()
    }
  },[data])

  async function timer(){
    await sleep(3000)
    setNotificationMiniPopup(false)
  }
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  if (!data) {
    return <></>;
  }
  return (
    <div className=" absolute top-[76px] right-4 w-[300px] max-[330px]:w-[250px] shadow-custom z-30 bg-transparent flex flex-col rounded-[4px] caret-transparent">
        <div className=" flex flex-row ">
     <div className="flex flex-row items-center justify-center text-green2 w-[56px] bg-bg rounded-tl-[4px]">
      {data.type === "wallet" && <WalletIcon />}
      {data.type === "level" && <MovingIcon />}
      </div>
      <div className="flex-1 h-fit bg-tbg py-3 px-4 flex flex-col text-sm gap-[2px] min-h-20 rounded-tr-[4px]">
        <div className="flex flex-row items-center justify-between flex-wrap gap-[2px]">
          <div className=" font-semibold">{data.title}</div>
          
        </div>
        <div className=" text-stext">
         {data.text}
        </div>
      </div>
      </div>
      <div className="h-3 w-full rounded-b-[4px] flex flex-row bg-bg overflow-hidden">
        <div className= {`bg-green2 animate-width-3s`}>

        </div>
      </div>
    </div>
  );
}
