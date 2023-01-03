import React from 'react'
import { AiFillStar } from 'react-icons/ai'

function RatingStar({rating,className}) {
    if(!rating) return <p className={className + " text-[10px] text-highlight-dark"}>No Reviews</p>
  return (
    <p className="text-highlight-dark flex items-center space-x-1">
    <span>
        {rating}
    </span>
    <AiFillStar/>
</p>
  )
}

export default RatingStar