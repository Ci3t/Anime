import React from 'react'
import {GiSpinningSword} from 'react-icons/gi'

function Submit({value,busy,type,onClick,className}) {
  return (
    <button type={type ||'submit'} className={className +' w-full rounded  hover:bg-opacity-80 transition font-semibold text-lg cursor-pointer p-1 flex items-center justify-center'} onClick={onClick} >

      {busy ? <GiSpinningSword className='animate-spin'/> :value}
    </button>
  )
}

export default Submit