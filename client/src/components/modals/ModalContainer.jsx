import React from 'react'

function ModalContainer({visible,children,onClose,ignoreContainer}) {

    if(!visible) return null;

    const handleClick =(e)=>{

        if(e.target.id === "modal-container") onClose()
    }
    const renderChildren =(e)=>{

        if(ignoreContainer) return children;

        return(
          <div className="dark:bg-main bg-white rounded w-[45rem] h-[40rem] overflow-auto custom-scroll-bar p-2">
      {children} </div>
        )

    }

  return (
    <div id='modal-container' onClick={handleClick} className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
      {renderChildren()}
        </div>
  )
}

export default ModalContainer