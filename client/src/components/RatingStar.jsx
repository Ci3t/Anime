import React from 'react'
import { AiFillStar } from 'react-icons/ai'

function RatingStar({rating}) {
    if(!rating) return <p className="text-highlight-dark">No Reviews</p>
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