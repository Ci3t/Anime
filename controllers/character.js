import { Character } from "../models/character.schema.js";
import { v2 as cloudinary } from 'cloudinary'
import { isValidObjectId } from "mongoose";
import { sendError } from "../utils/helper.js";

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_API_KEY, 
    api_secret: process.env.CLOUD_SECRET,
    secure: true
  });

export const createChar = async(req,res)=>{
    const {name,about,gender} = req.body;
    const {file} = req

   const newCharacter = new Character({name,about,gender} )

   if(file){

       const {secure_url,public_id} =  await cloudinary.uploader.upload(file.path,{gravity: "face", height: 250, width: 250, crop: "thumb"});
       newCharacter.avatar = {url:secure_url,public_id};

      
   }

  await newCharacter.save()
  res.status(201).json({id:newCharacter._id,name,about,gender,avatar:newCharacter.avatar?.url})


}

export const updateChar = async(req,res)=>{
    const {name,about,gender} = req.body;
    const {file} = req

    const {charId} = req.params
    if(!isValidObjectId(charId)) return sendError(res,'Invalid request')
   const character =  await Character.findById(charId)

   if(!character) return sendError(res,'Invalid request,Character not found')

   const public_id = character.avatar?.public_id;

   if(public_id && file){
   const {result} = await cloudinary.uploader.destroy(public_id);

   if(result !== 'ok'){
    return sendError(res,"Couldn't remove image from cloud");
   }
   }

   if(file){

    const {secure_url,public_id} =  await cloudinary.uploader.upload(file.path,{gravity: "face", height: 250, width: 250, crop: "thumb"})
    character.avatar = {url:secure_url,public_id};

}
character.name=name;
character.about=about;
character.gender=gender;

await character.save()
res.status(201).json({id:character._id,name,about,gender,avatar:character.avatar?.url})
}