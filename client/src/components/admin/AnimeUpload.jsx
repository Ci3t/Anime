import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { uploadAnime, uploadTrailer } from "../../api/anime";
import { useNotification } from "../../hooks/themeHook";
import ModalContainer from "../modals/ModalContainer";
import AnimeForm from "./AnimeForm";
import styles from '../style/appInfoBox.module.css'
const classBlur = styles.blurAppInfo


function AnimeUpload({visible,onClose}) {
  const [videoSelected, setVideoSelected] = useState(false);
  const [videoUploaded, setVideoUploaded] = useState(false);
  const [busy, setBusy] = useState(false);
  const [videoInfo, setVideoInfo] = useState({});
  const [uploadProgress, setUploadProgress] = useState(0);
  const { updateNotification } = useNotification();

  const resetState = () =>{

    setVideoSelected(false)
    setVideoUploaded(false)
    setUploadProgress(0)
    setVideoInfo({})
  }

const handleUploadTrailer = async(data)=>{

    const {error,secure_url,public_id} = await uploadTrailer(data,setUploadProgress);
    if(error) return updateNotification('error',error)


        setVideoUploaded(true)
    setVideoInfo({url:secure_url,public_id})
}

  const handleChange =  (file) => {
    const formData = new FormData();
    formData.append("video", file);

    setVideoSelected(true)
   handleUploadTrailer(formData)
  };

  const handleTypeError = (error) => {
    updateNotification("error", error);
  };

  const getUploadProgressValue =()=>{
    if(!videoUploaded && uploadProgress >= 100){
        return 'Processing'
    } 

    return `Upload Progress ${uploadProgress} %`
  }


  const handleSubmit =async(data) =>{
  if(!videoInfo.url || !videoInfo.public_id)
   return updateNotification('error','Trailer is missing');

   setBusy(true)
   data.append('trailer',JSON.stringify(videoInfo))
   const {error,anime} = await uploadAnime(data);
   setBusy(false)

   if(error) return updateNotification('error',error)
   updateNotification('success','Anime Uploaded Successfully')
   resetState()
   onClose()

//  console.log(videoInfo.secure_url);
  }
  return (
    // <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
    //   <div className="dark:bg-main bg-white rounded w-[45rem] h-[40rem] overflow-auto custom-scroll-bar p-2">
    <ModalContainer visible={visible}  >
      <div className="mb-4">

      <UploadProgress visible={!videoUploaded && videoSelected} message={getUploadProgressValue()} width={uploadProgress}/>
      </div>

       {!videoSelected ?  
        (<TrailerSelector
          visible={!videoSelected}
          onTypeError={handleTypeError}
          handleChange={handleChange}
          /> ):
          ( <AnimeForm btnTitle='Upload' busy={busy} onSubmit={!busy ?handleSubmit:null}/>)}
          </ModalContainer>

    //   </div>
    // </div>
  );
}

function TrailerSelector({ visible, handleChange, onTypeError }) {
  if (!visible) return null;
  return (
    <div className={classBlur +" h-full flex items-center justify-center border-[#61cbf5] "}>
      <FileUploader
        handleChange={handleChange}
        onTypeError={onTypeError}
        types={["mp4", "avi"]}
      >
        <div className="w-48 h-48 border border-dashed dark:border-[#61cbf5] rounded-full flex items-center justify-center flex-col  cursor-pointer">
          <AiOutlineCloudUpload className="text-[#61cbf5] " size={80} />
          <p className="text-[#61cbf5] ">Drop your file here!</p>
        </div>
      </FileUploader>
    </div>
  );
}

function UploadProgress ({width,message,visible}){

    if(!visible) return null
    return (
       
        <div className="rounded p-3 bg-[#062e77]  drop-shadow-lg ">
            <div className="h-3 overflow-hidden relative bg-[#1371a7] ">
                <div style={{width:width + '%'}} className="h-full absolute left-0 bg-second dark:bg-white"/>
                
            </div>
            <p className="font-semibold dark:text-dark-subtle text-light-subtle animate-pulse mt-1">{message}</p>
        </div>


    )
}
export default AnimeUpload;
