import React from 'react'

const commonPosterUI = "flex justify-center items-center w-[13em] border-dashed border rounded aspect-video border-light-subtle cursor-pointer"

function PosterSelector({name,selectedPoster,onChange,accept}) {
  return (
    <div>
        <input accept={accept} onChange={onChange} name={name} id={name} type='file' hidden/>
        <label htmlFor={name}>
           {selectedPoster? <img className={commonPosterUI + ' object-cover'} src={selectedPoster} alt="" />:
            <PosterUI/>}
        </label>
    </div>
  )
}


const PosterUI = ()=>{
    return(
        <div className={commonPosterUI}>
            <span>Select Poster</span>
        </div>
    )
}
export default PosterSelector