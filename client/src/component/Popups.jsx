import React from 'react'
import Register from './Register'
import Signin from './Signin'
import Notification from './Notification'
import Vault from './Vault'
import Stats from './Stats'
import Recent from './Recent'
import VIP from './VIP'
import Wallet from './Wallet'
import Logout from './Logout'
import NotAccessable from './NotAccessable'

export default function Popups({setIsRegister, setisLoading, setIsSignIn,isLoading,isRegister,isSignIn,isNotification, setIsNotification,isVault, setIsVault,isStat, setIsStat,isRecent, setIsRecent, vip, setVip, wallet,setIsWallet, isLogOut, setIsLogOut,isNotAccess,setIsNotAccess}) {
    
  return (
    <>
    {
      isNotAccess && <NotAccessable setIsNotAccess={setIsNotAccess} setIsRegister={setIsRegister} setIsSignIn={setIsSignIn}/>
    }
    {
      isLogOut && <Logout setIsLogOut={setIsLogOut}/>
    }
    {
      wallet && <Wallet setIsWallet={setIsWallet}/>
    }
    {
      vip && <VIP setVip={setVip}/>
    }
    {
      isRecent && <Recent setIsRecent={setIsRecent}/>
    }
    {
        isStat && <Stats setIsStat={setIsStat}/>
    }
    {
        isVault && <Vault setIsVault={setIsVault}/>
    }
    {isNotification && 
        <Notification setIsNotification={setIsNotification} setisLoading={setisLoading}/> 
    }
     {isLoading && (
        <div className=" absolute top-0  h-[100svh] w-screen  flex flex-row justify-center items-center z-[52] bg-[rgb(0,0,0,0.5)]">
          <img className="w-20" src="loading.gif" alt="" />
        </div>
      )}
      {isRegister && (
       <Register setIsRegister={setIsRegister} setisLoading={setisLoading}/>
      )}
      {isSignIn && (
       <Signin setIsSignIn={setIsSignIn} setisLoading={setisLoading}/>
      )}
    </>
  )
}
