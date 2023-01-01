import React, { useState } from 'react'

import { updateReview } from '../../api/review'

import { useNotification } from '../../hooks/themeHook'
import RatingForm from '../form/RatingForm'
import ModalContainer from './ModalContainer'

function EditRatingModal({visible,onClose,onSuccess,initialState}) {
    const [busy,setBusy] = useState(false)
    const {updateNotification} = useNotification()

    const handleSubmit = async(data)=>{
        setBusy(true)
        const{error,message}= await updateReview(initialState.id,data);
        setBusy(false)

       if(error) return updateNotification('error',error);
       onSuccess({...data})
       updateNotification('success',message)
       onClose()
    }   
    
  return (
    <ModalContainer visible={visible} onClose={onClose} ignoreContainer >
        <RatingForm  busy={busy} initialState={initialState} onSubmit={handleSubmit}  />
    </ModalContainer>
  )
}


export default EditRatingModal