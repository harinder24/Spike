import React, { useEffect, useState } from "react";
import BgOpacity from "../layout/BgOpacity";
import CloseIcon from "@mui/icons-material/Close";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import { getRecent } from "../../api/dataFetch";
import { useAuth } from "../layout/AuthProvider";
import { GamesAndCasinoIndividualWrapper } from "../../screen/Favorite";
export default function Recent({ setIsRecent ,setIsNotAccess}) {
  const { token } = useAuth();
  const onClickHandler = () => {
    setIsRecent(false);
  };
  const [recent, setRecent] = useState(null);
  useEffect(() => {
    if (token) {
      recentHandler();
    }
  }, [token]);
  const recentHandler = async () => {
    try {
      const result = await getRecent(token);
      let resultData = result.data
      if(resultData && resultData.length > 0){
        resultData = resultData.reverse()
      }
      setRecent(resultData);
    } catch (error) {}
  };
  return (
    <BgOpacity onClickHandler={onClickHandler}>
      <div className=" p-4 flex flex-col bg-sbg w-[500px] rounded-lg max-h-[80svh] max-[532px]:w-full  relative  caret-transparent  gap-4 min-h-[400px]">
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
          <div className="flex flex-col items-center  gap-4">
            {recent && recent.length > 0 ? (
              recent.map((items)=>{
                return <><GamesAndCasinoIndividualWrapper type={items.type} name={items.name} setIsNotAccess={setIsNotAccess} isRecent={true}/></>
              })
              
            ) : (
              <div className="w-full text-center font-semibold text-sm text-stext mt-[140px]">
                No Recent Games
              </div>
            )}
          </div>
        </div>
      </div>
    </BgOpacity>
  );
}


