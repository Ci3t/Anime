
import multer from "multer";

const storage = multer.diskStorage({});

const fileFilter = (req,file,callback)=>{
    console.log(file);

    if(!file.mimetype.startsWith('image')){

        callback('Supported Only Image Files',false)
    }

    callback(null,true)
}

export const uploadImage = multer({storage,fileFilter})

