import React from 'react'
import {ImTree} from 'react-icons/im'

function GenresSelector({onClick,badge}) {
    const renderBadge = ()=>{
        if(!badge) return null;
        return(
            <span className="ml-4 bg-[#d4a132] absolute top-0 right-0 w-5 h-5 rounded-full flex justify-center items-center text-black translate-x-2 -translate-y-1 text-xs">{badge <=9? badge: '9+'}</span>
        )
       
      }
  return (
    <button  type='button' onClick={onClick} className='relative flex items-center space-x-2 p-1 border-2  hover:border-blue-500 transition rounded mt-3 py-1 px-3'>
        <ImTree className='text-yellow-300'/>
        <span className='text-white'>Select Genres</span>
        {renderBadge()}
    </button>
  )
}

export default GenresSelector