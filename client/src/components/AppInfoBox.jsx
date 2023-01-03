import React from 'react'
import styles from './style/appInfoBox.module.css'


function AppInfoBox({title,subTitle}) {
  const classBlur = styles.blurAppInfo
  return (
    <div className={classBlur +" bg-[#22215c] sm:mb-0 mb-3 text-center shadow  p-5 rounded"}>
    <h1 className='font-semibold text-2xl mb-2 text-white'>{title}</h1>
    <p className='text-2xl  text-white'>{subTitle}</p>

  
  </div>

  )
}

export default AppInfoBox