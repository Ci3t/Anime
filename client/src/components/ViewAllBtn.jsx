import React from 'react'

const ViewAllBtn =({visible,children,onClick})=>{
    if(!visible) return null
   return (

       <button type="button" onClick={onClick} className='bg-[#3967ad] text-white px-2 py-1 rounded hover:underline transition'> {children} </button>
       )
  
}
export default ViewAllBtn