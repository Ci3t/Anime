import React from 'react'
import { createChar } from '../../api/character'
import { useNotification } from '../../hooks/themeHook'
import CharacterForm from '../form/CharacterForm'
import ModalContainer from './ModalContainer'

function CharacterUpload({visible,onClose}) {
  const {updateNotification} = useNotification()

  const handleSubmit = async(data)=>{

    const {error,character} = await createChar(data)
   
    if(error) return updateNotification('error',error)
    updateNotification('success','Character Added Successfully')
    onClose()


  }
  return (
    <ModalContainer visible={visible} onClose={onClose} ignoreContainer>

      <CharacterForm onSubmit={handleSubmit} title='Add New Character' btnTitle='Create' />
    </ModalContainer>
  )
}

export default CharacterUpload