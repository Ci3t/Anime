import { Character } from "../models/character.schema.js";
import { isValidObjectId } from "mongoose";
import { formatCharacter, sendError, uploadImageToCloud } from "../utils/helper.js";
import cloudinary from "../cloud/index.js";



export const createChar = async(req,res)=>{
    const {name,about,gender} = req.body;
    const {file} = req

   const newCharacter = new Character({name,about,gender} )

   if(file){

    const {url,public_id} = await uploadImageToCloud(file.path)
       newCharacter.avatar = {url,public_id};

      
   }

  await newCharacter.save()
  res.status(201).json({character:formatCharacter(newCharacter)})


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

    const {url,public_id} = await uploadImageToCloud(file.path)
    character.avatar = {url,public_id};

}
character.name=name;
character.about=about;
character.gender=gender;

await character.save()
res.status(201).json(formatCharacter())
}

export const removeChar = async (req,res)=>{
    

    const {charId} = req.params
    if(!isValidObjectId(charId)) return sendError(res,'Invalid request')
   const character =  await Character.findById(charId)

   if(!character) return sendError(res,'Invalid request,Character not found')

   const public_id = character.avatar?.public_id;

   if(public_id ){
   const {result} = await cloudinary.uploader.destroy(public_id);

   if(result !== 'ok'){
    return sendError(res,"Couldn't remove image from cloud");
   }
   }

   await Character.findByIdAndDelete(charId)

   res.json({message:'Character Removed Successfully'})

}

export const searchCharacter = async (req,res)=>{
    const {query} = req
    query.name
   const result = await Character.find({$text:{$search:`"${query.name}"`}})

   const characters = result.map(char => formatCharacter(char))
   res.json(characters)

}
export const getLatestCharacters = async (req,res)=>{
  
   const result = await Character.find().sort({createdAt: '-1'}).limit(15)

   const characters = result.map(char => formatCharacter(char))
   res.json(characters)
}


export const getSingleChar = async (req,res)=>{

    const {id} = req.params
    
    if(!isValidObjectId(id)) return sendError(res,'Invalid request')
    
    const character = await Character.findById(id)
    
    if(!character) return sendError(res,'Invalid request Character not found',404)
    
    res.json(formatCharacter(character))
   
}