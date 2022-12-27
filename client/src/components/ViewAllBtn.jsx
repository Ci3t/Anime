import React from 'react'

const ViewAllBtn =({visible,children,onClick})=>{
    if(!visible) return null
   return (

       <button type="button" onClick={onClick} className='bg-second text-white hover:underline transition'> {children} </button>
       )
  
}
export default ViewAllBtn