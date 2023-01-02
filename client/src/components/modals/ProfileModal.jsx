
import React, { useEffect, useState } from 'react'
import {  getCharactersProfile } from '../../api/character';
import { useNotification } from '../../hooks/themeHook';
import ModalContainer from './ModalContainer';

import styles from './profileModal.module.css'

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
                <div className={styles.profileModalBackground +" w-72 p-5 rounded flex flex-col items-center space-y-3"}>
                    <img className='w-28 h-28 rounded-full border-2 border-[#f3d264]' src={avatar} alt={name}/>
                    <h1 className='font-semibold text-xl text-[#f1de2e]' >{name}</h1>
                    <p className='text-[#d3aef1]'> {trimTitle(about)}</p>
                   
                </div>
        </ModalContainer>
  )
}

export default ProfileModal