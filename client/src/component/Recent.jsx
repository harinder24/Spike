import React from "react";
import BgOpacity from "./BgOpacity";
import CloseIcon from "@mui/icons-material/Close";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
export default function Recent({setIsRecent}) {
  const onClickHandler = () => {
    setIsRecent(false);
  };
  return (
    <BgOpacity onClickHandler={onClickHandler}>
      <div className=" p-4 flex flex-col bg-sbg w-[500px] rounded-lg max-h-[400px]  max-[532px]:w-full  relative  caret-transparent  gap-4 ">
        <div className=" flex flex-row justify-between">
          <div className="flex flex-row gap-x-[6px] text-stext items-center">
            <HistoryOutlinedIcon sx={{ fontSize: 18 }} />
            <div className="text-[#eee] font-semibold text-sm">Recent</div>
          </div>
          <div
            onClick={onClickHandler}
            className=" self-end text-stext hover:text-[#eee] cursor-pointer"
          >
            <CloseIcon sx={{ fontSize: 20 }} />
          </div>
        </div>
        <div className="overflow-y-auto">
          <div className="flex flex-row flex-wrap gap-4 ">
            <Games />
            <Games />
            <Games />
            <Games />
            <Games />
            <Games />
            <Games />
            <Games />
            <Games />
          </div>
        </div>
      </div>
    </BgOpacity>
  );
}

function Games() {
  return (
    <div className=" w-[calc((100%/2)-8px)] min-w-[100px] aspect-[5/3] bg-blue-400 rounded-lg"></div>
  );
}
