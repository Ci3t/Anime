import React from 'react'
import { useParams } from 'react-router-dom'
import { addReview } from '../../api/review'
import { useNotification } from '../../hooks/themeHook'
import RatingForm from '../form/RatingForm'
import ModalContainer from './ModalContainer'

function AddRatingModal({visible,onClose,onSuccess}) {
    const {animeId} = useParams()
    const {updateNotification} = useNotification()

    const handleSubmit = async(data)=>{
    const{error,message,reviews} = await addReview(animeId,data)

    if(error) return updateNotification('error',error)

        updateNotification('success',message)
        onSuccess(reviews)
        onClose()
    }   
  return (
    <ModalContainer visible={visible} onClose={onClose} ignoreContainer >
        <RatingForm onSubmit={handleSubmit} />
    </ModalContainer>
  )
}

export default AddRatingModal