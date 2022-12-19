import React from 'react'
import {GiSpinningSword} from 'react-icons/gi'

function Submit({value,busy}) {
  return (
    <button type={'submit'} className='w-full rounded bg-white hover:bg-opacity-80 transition font-semibold text-lg text-second cursor-pointer p-1 flex items-center justify-center' >

      {busy ? <GiSpinningSword className='animate-spin'/> :value}
    </button>
  )
}

export default Submit