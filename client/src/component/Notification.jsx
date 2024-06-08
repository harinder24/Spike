import React from "react";
import BgOpacity from "./BgOpacity";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CloseIcon from "@mui/icons-material/Close";
import WalletIcon from "@mui/icons-material/Wallet";
import CampaignIcon from '@mui/icons-material/Campaign';
export default function Notification({ setIsNotification, setisLoading }) {
  const onClickHandler = () => {
    setIsNotification(false);
  };
  return (
    <BgOpacity onClickHandler={onClickHandler}>
      <div className=" p-4 flex flex-col bg-sbg w-[500px] rounded-lg  max-[532px]:w-full overflow-y-auto relative  caret-transparent h-[400px] gap-4">
        <div className=" flex flex-row justify-between">
          <div className="flex flex-row gap-x-[6px] text-stext items-center">
            <NotificationsIcon sx={{ fontSize: 18 }} />
            <div className="text-[#eee] font-semibold text-sm">
              Notifications
            </div>
          </div>
          <div
            onClick={onClickHandler}
            className=" self-end text-stext hover:text-[#eee] cursor-pointer"
          >
            <CloseIcon sx={{ fontSize: 20 }} />
          </div>
        </div>

        <div className="flex-1  flex flex-col overflow-y-auto gap-y-2">
          <div className="text-xs font-semibold flex flex-row justify-between">
            <div className=" text-stext">New</div>
            <div className=" ">Mark as read</div>
          </div>
          <IndividualNotifications />
          <IndividualNotifications />
          <IndividualNotifications />
          <IndividualNotifications />
            <div className="w-full flex flex-col items-center py-4">
                <div className="text-green2">
                    <CampaignIcon sx={{fontSize: 100}}/>
                </div>
                <div className=" text-sm text-stext text-center">
                    That's all notification you have got
                </div>

            </div>
        </div>
      </div>
    </BgOpacity>
  );
}

function IndividualNotifications() {
  return (
    <div className=" rounded-[4px] flex flex-row min-h-20 overflow-hidden">
      <div className="flex flex-row items-center justify-center text-green2 w-[56px] bg-bg">
        <WalletIcon />
      </div>
      <div className="flex-1 bg-tbg py-3 px-4 flex flex-col text-sm gap-[2px]">
        <div className="flex flex-row items-center justify-between flex-wrap gap-[2px]">
          <div className=" font-semibold">Deposit Confirmed</div>
          <div className=" text-xs text-stext flex flex-row items-center">
            <div className="h-1 w-1 rounded-full bg-green2"></div>
            <div className="">10 days ago</div>
          </div>
        </div>
        <div className=" text-stext">
        Your deposit of 
CA$400.00
 has been successfully processed.
        </div>
      </div>
    </div>
  );
}
