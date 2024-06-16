import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { paymentApi } from "../api/dataFetch";
import { useAuth } from "../component/layout/AuthProvider";
export default function Success() {
  const { id, amount, path } = useParams();
  const {checkUserLogin,user, token, updateWallet,updateNotification } = useAuth();

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
    if (id && amount && path && token) {
      successHandler();
    }
  }, [id, amount, path, token]);
  const successHandler = async () => {
 
    const result = await paymentApi(token, amount, id);

    if (result.success) {
      updateWallet();
      updateNotification()
    }
    if (path === "home") {
      navigate("/");
    } else {
      navigate("/" + path);
    }
  };
  return <div className="flex-1 w-full flex flex-row bg-bg "></div>;
}
export  function Success2() {
    const { id, amount, path , path2} = useParams();
    const { token, updateWallet } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
      if (id && amount && path && token) {
        successHandler();
      }
    }, [id, amount, path, token]);
    const successHandler = async () => {
      console.log(path);
      const result = await paymentApi(token, amount, id);
  
      if (result.success) {
        updateWallet();
      }
  
        navigate("/" + path + "/"+ path2);
      
    };
    return <div className="flex-1 w-full flex flex-row bg-bg "></div>;
  }
  