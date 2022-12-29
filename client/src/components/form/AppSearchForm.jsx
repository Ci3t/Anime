import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai';

export default function AppSearchForm({placeholder,onSubmit,showResetIcon,onReset}) {
    const [ value,setValue] = useState('')

    const handleOnSubmit =(e)=>{
        e.preventDefault();
        onSubmit(value)

    }
    const handleReset =()=>{
        setValue('')
        onReset()
    }
  return (
    <form className='relative' onSubmit={handleOnSubmit} >
           <input
        type="text"
        className="border-2 border-light-subtle focus:border-main transition bg-transparent rounded text-lg p-1 outline-none relative"
        placeholder={placeholder}
  
        value={value}
        onChange={({target})=>setValue(target.value)}
      />
     {showResetIcon? <button onClick={handleReset} type='button' className='absolute top-1/2 -translate-y-1/2 right-2'><AiOutlineClose/></button> : null}
    </form>
  )
}
