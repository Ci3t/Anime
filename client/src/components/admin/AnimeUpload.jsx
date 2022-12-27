import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { uploadTrailer } from "../../api/anime";
import { useNotification } from "../../hooks/themeHook";
import ModalContainer from "../modals/ModalContainer";
import AnimeForm from "./AnimeForm";

function AnimeUpload({visible,onClose}) {
  const [videoSelected, setVideoSelected] = useState(false);
  const [videoUploaded, setVideoUploaded] = useState(false);
  const [videoInfo, setVideoInfo] = useState({});
  const [uploadProgress, setUploadProgress] = useState(0);
  const { updateNotification } = useNotification();

const handleUploadTrailer = async(data)=>{

    const {error,secure_url,public_id} = await uploadTrailer(data,setUploadProgress);
    if(error) return updateNotification('error',error)

    console.log(secure_url);

        setVideoUploaded(true)
    setVideoInfo({secure_url,public_id})
}

  const handleChange =  (file) => {
    const formData = new FormData();
    formData.append("video", file);

    setVideoSelected(true)
   handleUploadTrailer(formData)
  };
console.log(videoInfo);
  const handleTypeError = (error) => {
    updateNotification("error", error);
  };

  const getUploadProgressValue =()=>{
    if(!videoUploaded && uploadProgress >= 100){
        return 'Processing'
    } 

    return `Upload Progress ${uploadProgress} %`
  }

  return (
    // <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
    //   <div className="dark:bg-main bg-white rounded w-[45rem] h-[40rem] overflow-auto custom-scroll-bar p-2">
    <ModalContainer visible={visible}  >
      
<AnimeForm/>
     
      </ModalContainer>

        // {/* <UploadProgress visible={!videoUploaded && videoSelected} message={getUploadProgressValue()} width={uploadProgress}/>
        // <TrailerSelector
        //   visible={!videoSelected}
        //   onTypeError={handleTypeError}
        //   handleChange={handleChange}
        // /> */}

    //   </div>
    // </div>
  );
}

function TrailerSelector({ visible, handleChange, onTypeError }) {
  if (!visible) return null;
  return (
    <div className="h-full flex items-center justify-center">
      <FileUploader
        handleChange={handleChange}
        onTypeError={onTypeError}
        types={["mp4", "avi"]}
      >
        <div className="w-48 h-48 border border-dashed dark:border-dark-subtle rounded-full flex items-center justify-center flex-col dark:text-light-subtle cursor-pointer">
          <AiOutlineCloudUpload size={80} />
          <p>Drop your file here!</p>
        </div>
      </FileUploader>
    </div>
  );
}

function UploadProgress ({width,message,visible}){

    if(!visible) return null
    return (
       
        <div className="rounded p-3 dark:bg-second  drop-shadow-lg ">
            <div className="h-3 overflow-hidden relative bg-light-subtle dark:bg-dark-subtle">
                <div style={{width:width + '%'}} className="h-full absolute left-0 bg-second dark:bg-white"/>
                
            </div>
            <p className="font-semibold dark:text-dark-subtle text-light-subtle animate-pulse mt-1">{message}</p>
        </div>


    )
}
export default AnimeUpload;
