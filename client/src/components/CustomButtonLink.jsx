import React from 'react'

function CustomButtonLink({label,clickable = true,onClick}) {

    const className = clickable ? 'text-highlight-dark no-underline hover:underline  ' : 'text-highlight-dark no-underline cursor-default'
  return (
    <button onClick={onClick} className={className} type='button' > {label} </button>
  )
}

export default CustomButtonLink