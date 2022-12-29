import React, { useState } from 'react'
import { updateAnimeForm } from '../../api/anime'
import { useNotification } from '../../hooks/themeHook'
import AnimeForm from '../admin/AnimeForm'
import ModalContainer from './ModalContainer'

function UpdateAnime({visible,initialState,onSuccess,onClose}) {
    const [busy,setBusy] = useState(false)
   const {updateNotification} =  useNotification()

    const handleSubmit = async(data)=>{
        setBusy(true)
      const {error,anime,message} =  await updateAnimeForm(initialState.id,data)
        setBusy(false)

        if(error) return updateNotification('error',error)
        console.log(initialState.id);
        console.log(data);

        updateNotification('success',message)
        onSuccess(anime)
        onClose()
    }
  return (
    <ModalContainer visible={visible}>
        <AnimeForm busy={busy} btnTitle='Update' initialState={initialState} onSubmit={!busy ? handleSubmit : null} />
    </ModalContainer>
  )
}

export default UpdateAnime