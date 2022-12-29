import React from "react";
import ModalContainer from "./ModalContainer";
import { GiSpinningSword } from "react-icons/gi";

function ConfirmModal({ visible, onClose, busy ,onConfirm,onCancel,title,subTitle}) {
  return (
    <ModalContainer visible={visible} onClose={onClose} ignoreContainer>
      <div className="rounded bg-slate-700 p-3">
        <h1 className="text-red-400 font-semibold text-2xl">{title}</h1>
        <p className="text-white text-sm">
         {subTitle}
        </p>

        <div className="flex items-center-space-x-3  ">
          {busy ? (
            <p className="flex  items-center space-x-2">
              <GiSpinningSword className="animate-spin" />
              <span>Please Wait</span>
            </p>
          ) : (
            <>
              {" "}
              <button onClick={onConfirm} className="bg-red-400 px-3 py-1 mx-2" type="button">
                Confirm
              </button>
              <button onClick={onCancel} className="bg-blue-400 px-3 py-1 mx-2" type="button">
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </ModalContainer>
  );
}

export default ConfirmModal;
