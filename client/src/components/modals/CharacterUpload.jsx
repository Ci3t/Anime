import React, { useState } from 'react'
import { createChar } from '../../api/character'
import { useNotification } from '../../hooks/themeHook'
import CharacterForm from '../form/CharacterForm'
import ModalContainer from './ModalContainer'

function CharacterUpload({visible,onClose}) {
  const [busy,setBusy] = useState(false)
  const {updateNotification} = useNotification()

  const handleSubmit = async(data)=>{
    setBusy(true);
    const {error,character} = await createChar(data)
    setBusy(false)
    if(error) return updateNotification('error',error)
    updateNotification('success','Character Added Successfully')
    onClose()


  }
  return (
    <ModalContainer visible={visible} onClose={onClose} ignoreContainer>

      <CharacterForm busy={busy} onSubmit={!busy?handleSubmit:null} title='Add New Character' btnTitle='Create' />
    </ModalContainer>
  )
}

export default CharacterUpload