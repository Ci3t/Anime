import React, { useState } from 'react'
import { BsPencilSquare, BsTrash } from 'react-icons/bs'

function Characters() {

  return (
    <div className="grid grid-cols-4 gap-3 my-5">
     <CharacterProfile profile={{name:'Jane Doe',avatar:"https://images.unsplash.com/photo-1618336753974-aae8e04506aa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGFuaW1lfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=80",about:" Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam non expedita quod. Ducimus voluptas, fugiat dignissimos laborum beatae optio similique. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam non expedita quod. Ducimus voluptas, fugiat dignissimos laborum beatae optio similique."}}/>
     <CharacterProfile profile={{name:'Jane Doe',avatar:"https://images.unsplash.com/photo-1618336753974-aae8e04506aa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGFuaW1lfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=80",about:" Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam non expedita quod. Ducimus voluptas, fugiat dignissimos laborum beatae optio similique. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam non expedita quod. Ducimus voluptas, fugiat dignissimos laborum beatae optio similique."}}/>
     <CharacterProfile profile={{name:'Jane Doe',avatar:"https://images.unsplash.com/photo-1618336753974-aae8e04506aa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGFuaW1lfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=80",about:" Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam non expedita quod. Ducimus voluptas, fugiat dignissimos laborum beatae optio similique. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam non expedita quod. Ducimus voluptas, fugiat dignissimos laborum beatae optio similique."}}/>
     <CharacterProfile profile={{name:'Jane Doe',avatar:"https://images.unsplash.com/photo-1618336753974-aae8e04506aa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGFuaW1lfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=80",about:" Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam non expedita quod. Ducimus voluptas, fugiat dignissimos laborum beatae optio similique. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam non expedita quod. Ducimus voluptas, fugiat dignissimos laborum beatae optio similique."}}/>
    </div>
   
  )
}

const CharacterProfile = ({profile})=>{
  
  const [showOptions,setShowOptions] = useState(false)

  const handleOnMouseEnter = ()=>{
    setShowOptions(true)
  }
  const handleOnMouseLeave = ()=>{
    setShowOptions(false)
  }

  if(!profile) return null;

  const {name,avatar,about=''} = profile
  return (
    <div className="h-20 rounded overflow-hidden bg-slate-500">
    <div onMouseEnter={handleOnMouseEnter} onMouseLeave={handleOnMouseLeave} className="flex cursor-pointer relative">
      <img className='w-20 h-20 aspect-square object-cover' src={avatar} alt={name} />

      <div className='px-2'>
        <h1 className='text-xl font-semibold'>{name}</h1>
        <p className='text-xs'>{about.substring(0,50)}</p>

      </div>
     <Options visible={showOptions}/>
    </div>
  </div>
  )
}

const Options = ({visible,onDeleteClick,onEditClick})=>{
  if(!visible) return null;

  return (
   <div className='absolute inset-0 bg-main bg-opacity-25 backdrop-blur-sm text-white flex justify-center items-center space-x-5'>

    <button onClick={onDeleteClick} className='p-2 rounded-full bg-white text-main hover:opacity-80 transition ' type='button'>
      <BsTrash/>
    </button>
    <button onClick={onEditClick} className='p-2 rounded-full bg-white text-main hover:opacity-80 transition ' type='button'>
      <BsPencilSquare/>
    </button>
   

  </div>
  )
}
export default Characters