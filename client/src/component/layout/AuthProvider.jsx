/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react';
import { getUserTokenData, notificationHandler, walletHandler } from '../../api/dataFetch';
export const AuthContext = createContext();
export default function AuthProvider({children}) {
  const [user, setUser] = useState(null);
  const [wallet, setWallet] = useState(0);
  const [favorite,setFavorite] = useState(null)
  const [notification, setNotification] = useState(null)
  const [notificationMiniPopup, setNotificationMiniPopup] = useState(false)
  const [token, setToken] = useState(JSON.parse(localStorage.getItem('spikeToken')));
  //waggered
  const updateNotification = async (isUpdate = true) => {
    const result = await notificationHandler(token)
    if(result.success){
      setNotification(result.data)
    }
    if(isUpdate){
      setNotificationMiniPopup(true)
    }
  }
  const updateWallet = async () => {
    const result = await walletHandler(token)
    if(result.success){
      setWallet(result.data)
    }
  }
  const updateUserData = async (userToken) => {
    if (!userToken) {
      localStorage.removeItem('spikeToken');
      setToken(null);
      setUser(null);
      setWallet(0)
      setFavorite(null)
      setNotification(null)
      return;
    } 
     const crrUser = await getUserTokenData(userToken);
     
    if(!crrUser.success){
      localStorage.removeItem('spikeToken');
      setToken(null);
      setUser(null);
      setWallet(0)
      setFavorite(null)
      setNotification(null)
      return;
    }
    setToken(userToken);
    setUser(crrUser.data);
    setWallet(crrUser.wallet)
    setFavorite(crrUser.favorite)
    setNotification(crrUser.notification)
    localStorage.setItem('spikeToken', JSON.stringify(userToken));
  };

  useEffect(() => {
    if (!user) {
      if (localStorage.getItem('spikeToken')) {
        const tk = JSON.parse(localStorage.getItem('spikeToken'));
        updateUserData(tk);
      } 
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, updateUserData, wallet, setWallet, favorite, setFavorite,updateWallet ,notification,updateNotification,notificationMiniPopup, setNotificationMiniPopup}}>
    {children}
  </AuthContext.Provider>
  )
}
export function useAuth() {
  return useContext(AuthContext);
}
