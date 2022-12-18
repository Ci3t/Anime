import React from 'react'

function Submit({value}) {
  return (
    <input type={'submit'} className='w-full rounded bg-white hover:bg-opacity-80 transition font-semibold text-lg text-second cursor-pointer p-1' value={value}/>
  )
}

export default Submit