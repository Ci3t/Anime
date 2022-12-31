import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/themeHook';




function NotVerified() {

  const {authInfo}=useAuth()

  const navigate = useNavigate()

  const navigateToVerify = ()=>{
    navigate('/auth/verification',{state:{user:authInfo.profile}})
  }
  
  const {isLoggedIn} = authInfo
  const isVerified = authInfo.profile?.isVerified
  return (
    <div>
     {isLoggedIn && !isVerified? <p className='text-lg text-center bg-blue-50 p-2'>
        Account is Not Verified, <button onClick={navigateToVerify} className='text-blue-500 font-semibold hover:underline'>Click Here to Verify</button></p>: null}
    </div>
  )
}

export default NotVerified