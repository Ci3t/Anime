import React from 'react'
import ModalContainer from './ModalContainer'
import {AiOutlineClose,AiOutlineCheck} from 'react-icons/ai'

function CastModel({
    cast = [],
    visible,
    onClose,
    onRemoveClick
}) {
  return (
    
        <ModalContainer ignoreContainer onClose={onClose} visible={visible}>

            <div className="space-y-2 bg-white text-black rounded max-w-[45rem] max-h-[40rem] overflow-auto p-2 custom-scroll-bar ">

                {cast.map(({profile,roleAs,leadChar})=>{
                    const {name,avatar,id} = profile

                    return(
                        <div key={id} className="flex space-x-3">
                            <img src={avatar} alt={name} className="w-16 h-16 aspect-square rounded object-cover" />

                            <div className=" w-full flex flex-col justify-between">
                            <div>

                            <p className=" font-semibold text-main">
                                {name}
                            </p>
                            <p className="text-sm text-main">
                                {roleAs}
                            </p>
                            </div>
                            {leadChar && <AiOutlineCheck/>}
                            </div>
                            <button onClick={()=>{onRemoveClick(id)}} className='bg-black hover:opacity-80 transition p-w'>
                            <AiOutlineClose/>
                            </button>
                        </div>
                    )
                })}
            </div>
        </ModalContainer>
    
  )
}

export default CastModel