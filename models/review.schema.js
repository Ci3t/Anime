import mongoose, { Schema } from "mongoose";

const reviewSchema = Schema({

    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    parentAnime:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Anime',
        required:true
    },
    content:{
        type:String,
        trim:true
    },
    rating:{
        type:Number,
        required:true
    }
})

export const Review = mongoose.model('Review',reviewSchema)

export default {reviewSchema}