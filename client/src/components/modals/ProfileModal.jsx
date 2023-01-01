
import React, { useEffect, useState } from 'react'
import {  getCharactersProfile } from '../../api/character';
import { useNotification } from '../../hooks/themeHook';
import ModalContainer from './ModalContainer';

function ProfileModal({visible,profileId,onClose}) {
    const [profile,setProfile] = useState({});
    const {updateNotification} = useNotification()
    const fetchCharacters = async()=>{
      const {error,character} =  await getCharactersProfile(profileId)
      if(error) return updateNotification('error',error)

      setProfile(character)
      console.log(character);
    }

    const trimTitle = (text = '')=>{

      if (text.length <= 370 ) return text;
      return text.substring(0,370)+ '..'
   }

    useEffect(() => {
        
        if(profileId) fetchCharacters()
    }, [profileId])
    // console.log(profile);
    const {avatar,name,about} = profile
    return (
        <ModalContainer visible={visible} onClose={onClose} ignoreContainer >
                <div className="w-72 p-5 rounded flex flex-col items-center bg-white space-y-3">
                    <img className='w-28 h-28 rounded-full' src={avatar} alt={name}/>
                    <h1 className='font-semibold text-xl' >{name}</h1>
                    <p className=''> {trimTitle(about)}</p>
                   
                </div>
        </ModalContainer>
  )
}

export default ProfileModal