import React, { useEffect, useState } from 'react'
import { getUpdateAnime, updateAnimeForm } from '../../api/anime'
import { useNotification } from '../../hooks/themeHook'
import AnimeForm from '../admin/AnimeForm'
import ModalContainer from './ModalContainer'

function UpdateAnime({visible,onSuccess,onClose,animeId}) {
    const [busy,setBusy] = useState(false)
    const [ready,setReady] = useState(false)
    const [selectedAnime,setSelectedAnime] = useState(null)
   const {updateNotification} =  useNotification()

    const handleSubmit = async(data)=>{
        setBusy(true)
      const {error,anime,message} =  await updateAnimeForm(animeId,data)
        setBusy(false)

        if(error) return updateNotification('error',error)
 

        updateNotification('success',message)
        onSuccess(anime)
        onClose()
    }

      const fetchAnimeToUpdate = async () => {
    const { error, anime } = await getUpdateAnime(animeId);

    if (error) return updateNotification("error", error);
    setReady(true)
    setSelectedAnime(anime);

  };

  useEffect(()=>{
    if(animeId) fetchAnimeToUpdate()
  },[animeId])

  return (
    <ModalContainer visible={visible}>
      {ready?
        <AnimeForm busy={busy} btnTitle='Update' initialState={selectedAnime} onSubmit={!busy ? handleSubmit : null} />: <div className="w-full h-full flex justify-center items-center">
          <p className="text-light-subtle animate-pulse">Please wait...</p>
        </div> }
    </ModalContainer>
  )
}

export default UpdateAnime