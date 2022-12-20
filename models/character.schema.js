import mongoose, { Schema } from "mongoose";



const characterSchema = Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    about:{
        type:String,
        trim:true,
        required:true,
      

    },
    gender:{
        type:String,
        trim:true,
        required:true
    },
    avatar:{
        type:Object,
        url:String,
        public_id:String
    }
},{timestamps:true})



export const Character = mongoose.model('Character',characterSchema)

export default {characterSchema: characterSchema,Character}