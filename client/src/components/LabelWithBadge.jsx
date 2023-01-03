import React from 'react'

const LabelWithBadge = ({children,htmlFor,badge = 0})=>{

    const RenderBadge = ()=>{
      if(!badge) return null;
      return(
          <span className="bg-[#f1b635] absolute top-0 right-0 w-5 h-5 rounded-full flex justify-center items-center text-black translate-x-2 -translate-y-1 text-xs">{badge <=9? badge: '9+'}</span>
      )
     
    }
  
    return(
      <div className="relative pb-2">
          <label htmlFor={htmlFor}>{children}</label>
          <RenderBadge/>
      </div>
  )
  }
  
export default LabelWithBadge