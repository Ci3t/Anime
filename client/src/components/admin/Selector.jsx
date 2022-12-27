import React from 'react'

function Selector({name,value,options,label,onChange}) {
  return (
    <select
    className='border-2 border-light-subtle mt-3 px-5 py-1 focus:border-blue-500 outline-none transition rounded bg-transparent text-light-subtle focus:text-blue-400'
    id={name} name={name} value={value} onChange={onChange}>
        <option value="">{label}</option>

        {options.map(({title,value})=>{
            return(
                <option value={value} key={title}>{title}</option>
            )
        })}
    </select>
  )
}

export default Selector