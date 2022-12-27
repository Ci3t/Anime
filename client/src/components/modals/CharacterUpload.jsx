import React from 'react'
import CharacterForm from '../form/CharacterForm'
import ModalContainer from './ModalContainer'

function CharacterUpload({visible,onClose}) {
  return (
    <ModalContainer visible={visible} onClose={onClose} ignoreContainer>

      <CharacterForm title='Create New Actor' btnTitle='Create' />
    </ModalContainer>
  )
}

export default CharacterUpload