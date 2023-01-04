import React, { useState } from "react";
import { updateChar } from "../../api/character";
import { useNotification } from "../../hooks/themeHook";
import CharacterForm from "../form/CharacterForm";
import ModalContainer from "./ModalContainer";

function UpdateCharacter({ visible, onClose,initialState,onSuccess}) {
  const [busy, setBusy] = useState(false);
  const { updateNotification } = useNotification();

  const handleSubmit = async (data) => {
    setBusy(true);
    const {error,character} = await updateChar(initialState.id, data)
    setBusy(false)
    if(error) return updateNotification('error',error)
    onSuccess(character)
    updateNotification('success','Character updated Successfully')
    onClose()
  };
  return (
    <ModalContainer visible={visible} onClose={onClose} ignoreContainer>
      <CharacterForm
        busy={busy}
        onSubmit={!busy ? handleSubmit : null}
        title="Update Character"
        btnTitle="Update"
        initialState={initialState}
      />
    </ModalContainer>
  );
}

export default UpdateCharacter;
