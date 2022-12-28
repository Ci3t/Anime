import { getToPathname } from '@remix-run/router';
import React, { useEffect, useState } from 'react'
import { BsPencilSquare, BsTrash } from 'react-icons/bs'
import { getCharacters } from '../../api/character'
import { useNotification } from '../../hooks/themeHook'
import NextAndPrevBtn from '../NextAndPrevBtn';

let currentPageNo = 0;
const limit = 4;
function Characters() {

  const [characters,setCharacters]=useState([])
  const [reachedToEnd,setReachedToEnd]=useState(false)
  const {updateNotification} = useNotification()
  async function fetchCharacters(pageNo){

    const {profiles,error} = await getCharacters(pageNo,limit)

    if(error) return updateNotification('error',error)
    if(!profiles.length){
      currentPageNo = pageNo - 1
      return setReachedToEnd(true)
    }
    setCharacters([...profiles]);
   }

const handleNextClick =()=>{
  if(reachedToEnd) return;
  currentPageNo += 1;
  fetchCharacters(currentPageNo)
}
const handlePrevClick =()=>{
  if(currentPageNo <= 0) return;
  if(reachedToEnd) setReachedToEnd(false)
  currentPageNo -= 1;
  fetchCharacters(currentPageNo)
}

  useEffect(()=>{
    
    fetchCharacters(currentPageNo)
  },[])


  return (
    <div className="p-5">

    <div className="grid grid-cols-4 gap-3 p-5">
     
     {characters.map(char=>{
       return <CharacterProfile profile={char} key={char.id}/>
      })}

      <NextAndPrevBtn className=' col-span-4' onNextClick={handleNextClick} onPrevClick={handlePrevClick} />
    
    </div>

  </div>
   
  )
}

const CharacterProfile = ({profile})=>{
  
  const [showOptions,setShowOptions] = useState(false)
  const acceptNameLength = 15;

  const handleOnMouseEnter = ()=>{
    setShowOptions(true)
  }
  const handleOnMouseLeave = ()=>{
    setShowOptions(false)
  }

  const getName = (name)=>{
   if( name.length <= acceptNameLength ) return name;

   return name.substring(0,acceptNameLength) + '..'
  }


  if(!profile) return null;

  const {name,avatar,about=''} = profile
  return (
    <div className="h-20 rounded overflow-hidden bg-slate-500">
    <div onMouseEnter={handleOnMouseEnter} onMouseLeave={handleOnMouseLeave} className="flex cursor-pointer relative">
      <img className='w-20 h-20 aspect-square object-cover' src={avatar} alt={name} />

      <div className='px-2'>
        <h1 className='text-xl font-semibold whitespace-nowrap'>{getName(name)}</h1>
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