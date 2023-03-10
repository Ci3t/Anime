import React, { useEffect, useState } from 'react'
import { getAppInfo } from '../../api/admin'

import { useNotification } from '../../hooks/themeHook'
import AppInfoBox from '../AppInfoBox'
import LatestUploads from '../LatestUploads'
import MostRatedAnime from '../MostRatedAnime'



function Dashboard() {
const [appInfo,setAppInfo] = useState({
  animeCount:0,
  reviewCount:0,
  userCount:0
})

const {updateNotification} = useNotification()

const  fetchAppInfo = async ()=>{

 const {appInfo,error} = await getAppInfo();
 if(error) return updateNotification('error',error)

 setAppInfo({...appInfo})
}

useEffect(()=>{
  fetchAppInfo()
},[])
  return (

    <div className="sm:grid sm:grid-cols-2  block grid-col xl:grid-cols-3 gap-5 lg:p-5 p-0 ">
      
    <AppInfoBox title='Total Uploads' subTitle={appInfo.animeCount.toLocaleString()} />
    <AppInfoBox title='Total Reviews' subTitle={appInfo.reviewCount.toLocaleString()}/>
    <AppInfoBox title='Total Users' subTitle={appInfo.userCount.toLocaleString()} />

    <LatestUploads/>
    <MostRatedAnime/>
    </div>
    )
}

export default Dashboard