import React, { useEffect, useState } from "react";
import BgOpacity from "../layout/BgOpacity";
import CloseIcon from "@mui/icons-material/Close";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import { YourProgress } from "../../screen/Home";
import { useAuth } from "../layout/AuthProvider";
import { getUserStats } from "../../api/dataFetch";

export default function Stats({ setIsStat }) {
  const onClickHandler = () => {
    setIsStat(false);
  };
  const [data, setData] = useState(null)
  const {token, user} = useAuth()
  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]);
  const fetchData = async () => {
    try {
      const result = await getUserStats(token);
      setData(result.data);
    } catch (error) {}
  };
  return (
    <BgOpacity onClickHandler={onClickHandler}>
      <div className=" p-4 flex flex-col bg-sbg w-[500px] rounded-lg max-h-[80svh]  max-[532px]:w-full overflow-y-auto relative  caret-transparent  gap-4">
        <div className=" flex flex-row justify-between">
          <div className="flex flex-row gap-x-[6px] text-stext items-center">
            <AutoGraphIcon sx={{ fontSize: 18 }} />
            <div className="text-[#eee] font-semibold text-sm">Statistics</div>
          </div>
          <div
            onClick={onClickHandler}
            className=" self-end text-stext hover:text-[#eee] cursor-pointer"
          >
            <CloseIcon sx={{ fontSize: 20 }} />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto flex flex-col">
          <div className="text-sm text-stext font-semibold">{user?.username}</div>
          <div className="text-xs text-stext mt-1">
            Joined on <span className="font-semibold">{data?.dateCreated}</span>
          </div>

          <YourProgress isStat={true} />
        </div>
        <div className="flex flex-col w-full gap-2 font-semibold">
          <div className="flex flex-row w-full gap-2">
            <div className="p-4 rounded-[4px] bg-bg flex-1">
              <div className="text-sm text-stext">Total bets</div>
              <div className=" text-xl">{data && (data?.numOfBets).toLocaleString()}</div>
            </div>
            <div className="p-4 rounded-[4px] bg-bg flex-1">
              <div className="text-sm text-stext">Number of Wins</div>
              <div className=" text-xl">{data && (data?.wins).toLocaleString()}</div>
            </div>
          </div>
          <div className="flex flex-row w-full gap-2">
            <div className="p-4 rounded-[4px] bg-bg flex-1">
              <div className="text-sm text-stext">Number of losses</div>
              <div className=" text-xl">{data && (data?.losses).toLocaleString()}</div>
            </div>
            <div className="p-4 rounded-[4px] bg-bg flex-1">
              <div className="text-sm text-stext">Waggered</div>
              <div className=" text-xl">${data && (data?.waggered).toLocaleString()}</div>
            </div>
          </div>
        </div>
      </div>
    </BgOpacity>
  );
}
