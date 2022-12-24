
import multer from "multer";

const storage = multer.diskStorage({});

const imageFileFilter = (req,file,callback)=>{
    console.log(file);

    if(!file.mimetype.startsWith('image')){

        callback('Supported Only Image Files',false)
    }

    callback(null,true)
}
const videoFileFilter = (req,file,callback)=>{
    console.log(file);

    if(!file.mimetype.startsWith('video')){

        callback('Supported Only video Files',false)
    }

    callback(null,true)
}

export const uploadImage = multer({storage,fileFilter:imageFileFilter})
export const uploadVideo = multer({storage,fileFilter:videoFileFilter})

