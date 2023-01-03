import React from 'react'

function NextAndPrevBtn({onNextClick,onPrevClick,className}) {
    const getClasses = () =>{
        return "flex justify-end items-center space-x-3 "
    }
  return (
    <div className={getClasses()+ className}>
    <Button onclick={onPrevClick} title='Prev' />
    <Button onclick={onNextClick} title='Next' />
   
  </div>
  )
}

const Button = ({title,onclick})=>{
    return(

        <button onClick={onclick} type='button' className='text-white hover:underline' >{title}</button>
    )
}
export default NextAndPrevBtn