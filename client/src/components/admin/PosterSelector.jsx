import React from 'react'

const commonPosterUI = "flex justify-center items-center w-[13em] border-dashed border rounded aspect-video border-light-subtle cursor-pointer"

function PosterSelector({name,selectedPoster,onChange,accept,label,className}) {
  return (
    <div>
        <input accept={accept} onChange={onChange} name={name} id={name} type='file' hidden/>
        <label htmlFor={name}>
           {selectedPoster? <img className={commonPosterUI + ' object-cover' + className} src={selectedPoster} alt="" />:
            <PosterUI label={label} className={className}/>}
        </label>
    </div>
  )
}


const PosterUI = ({label,className})=>{
    return(
        <div className={commonPosterUI + ' ' + className}>
            <span>{label}</span>
        </div>
    )
}
export default PosterSelector