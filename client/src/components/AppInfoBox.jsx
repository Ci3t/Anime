import React from 'react'


function AppInfoBox({title,subTitle}) {
  return (
    <div className="bg-white shadow  p-5 rounded">
    <h1 className='font-semibold text-2xl mb-2 text-main'>{title}</h1>
    <p className='text-2xl  text-main'>{subTitle}</p>

  
  </div>

  )
}

export default AppInfoBox