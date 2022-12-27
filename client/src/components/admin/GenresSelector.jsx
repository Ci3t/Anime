import React from 'react'
import {ImTree} from 'react-icons/im'

function GenresSelector({onClick}) {
  return (
    <button type='button' onClick={onClick} className='flex items-center space-x-2 p-1 border-2 border-light-subtle hover:border-blue-500 transition rounded mt-3 py-1 px-3'>
        <ImTree/>
        <span>Select Genres</span>
    </button>
  )
}

export default GenresSelector