
//levelup
import React, { useEffect } from "react";
import {  useNavigate } from "react-router-dom";
import { levelUpApi } from "../api/dataFetch";
import { useAuth } from "../component/layout/AuthProvider";
export default function LevelUp() {
  const {checkUserLogin, user, token, updateWallet,updateNotification } = useAuth();
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
   if(token){
      levelUphandler();
   }
  }, [token]);
  const levelUphandler = async () => {
 
    const result = await levelUpApi(token);

    if (result.success) {
      updateWallet();
      updateNotification()
    }

      navigate("/");
    
  };
  return <div className="flex-1 w-full flex flex-row bg-bg "></div>;
}
