import React, { useEffect, useState } from "react";
import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
import { useAuth } from "../component/layout/AuthProvider";
import { useNavigate } from "react-router-dom";
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import { addfav, deletefav } from "../api/dataFetch";
export default function Favorite({setIsNotAccess}) {
  const {checkUserLogin, user, favorite} = useAuth()
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

  return (
    <div className="w-full flex flex-col bg-bg  justify-start flex-1 overflow-y-auto ">
      <div className="min-h-[115px] flex w-full flex-row items-center bg-tbg max-[750px]:min-h-20">
        <div className="pl-10 text-xl max-[750px]:text-lg font-semibold max-[750px]:pl-4 flex flex-row gap-x-[6px]">
          <span className=" text-xl max-[750px]:text-lg  flex flex-row items-center">
            <StarOutlineOutlinedIcon sx={{ fontSize: "inherit" }} />
          </span>{" "}
          <span>Favourite</span>
        </div>
      </div>
      <div className=" w-full flex-1  flex flex-row justify-center">
        <div className=" w-[1200px] max-[1440px]:w-full    flex flex-row flex-wrap gap-4  px-10 max-[750px]:px-4 p-10 content-start">
          {!favorite ? (
            <div className=" w-full flex flex-row justify-center gap-x-[6px] text-stext text-sm">
              <div>No favourites yet, use the</div>
              <div className="flex flex-row justify-center items-center">
                <StarOutlineOutlinedIcon sx={{ fontSize: 18 }} />
              </div>{" "}
              <div> to favourite games.</div>
            </div>
          ) : (
            <>
            {favorite.map((items)=>{
              return <GamesAndCasinoIndividualWrapper name={items.name} type={items.type} setIsNotAccess={setIsNotAccess}/>
            })}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export function GamesAndCasinoIndividualWrapper({ name, type,setIsNotAccess,isRecent= false }) {
  const { user,token,favorite,setFavorite } = useAuth();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false)
  useEffect(()=>{
    if(favorite){
    if(favorite.some((fav) => fav.name === name && fav.type === type)){
      setIsFavorite(true)
    }else{
      setIsFavorite(false)
    }
  }
  },[favorite])
  const favoriteHandler = async() =>{
    if(isFavorite){
      try {
        setIsFavorite(false)
        const result = await deletefav(token,type, name)
        if(result.success){
          setFavorite(result.data)
        }else{
          setIsFavorite(true)
        }
      } catch (error) {
        setIsFavorite(true)
      }
    }else{
      try {
        setIsFavorite(true)
        const result = await addfav(token,type, name)
        if(result.success){
          setFavorite(result.data)
        }else{
          setIsFavorite(false)
        }
      } catch (error) {
        setIsFavorite(false)
      }
    }
  }
  return (
    <>
      <div className= {`${isRecent ? "w-[calc(100%-8px)] max-w-[300px] aspect-[5/3]" :"w-[calc((100%/3)-12px)] min-w-[150px!important] max-[970px]:w-[calc((100%/2)-8px)] max-[570px]:w-[100%] aspect-[5/3]"}  border-[2px] border-border  rounded-lg h-fit relative overflow-hidden`}>
        <div onClick={favoriteHandler}  className=" absolute top-1 right-1 text-stext hover:text-[#eee] p-1 cursor-pointer z-[0]">
         {isFavorite ? <StarOutlinedIcon/> : <StarOutlineOutlinedIcon />}
        </div>
        <div
          onClick={() => (user ? navigate("/" + type + "/" + name.toLowerCase()) : setIsNotAccess(true))}
          className=" h-full w-full "
        >
          <img
            src={"/cg/" + name + ".png"}
            alt=""
            className="w-full h-full object-cover cursor-pointer"
          />
          <div className=" pointer-events-none absolute bottom-0 w-full flex flex-row justify-center py-2 bg-sbg text-lg font-bold text-stext ">
            <div>{name}</div>
          </div>
        </div>
      </div>
    </>
  );
}
