import React from 'react'
import AnimeForm from '../admin/AnimeForm'
import ModalContainer from './ModalContainer'

function UpdateAnime({visible}) {
  return (
    <ModalContainer visible={visible}>
        <AnimeForm/>
    </ModalContainer>
  )
}

export default UpdateAnime