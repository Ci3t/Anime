import crypto from 'crypto';
import cloudinary from '../cloud/index.js';
import { Review } from '../models/review.schema.js';


export const sendError = (res,error,statusCode = 401)=>{
    res.status(statusCode).json({error});
}

export const generateRandomByte = ()=>{

    return new Promise((resolve,reject)=>{
        crypto.randomBytes(30,(err,buff)=>{
            if(err) reject(err)
           const buffString = buff.toString('hex')
            console.log(buffString);
           resolve(buffString)
        })
    })
}

export const handleNotFound =(req,res)=>{

    this.sendError(res,'Not found',404)
}

export const uploadImageToCloud = async (file)=>{
    const {secure_url:url,public_id} = await cloudinary.uploader.upload(file,{gravity: "face", height: 250, width: 250, crop: "thumb"})

    return {url,public_id}
}

export const formatCharacter = char =>{

    const {name,gender,about,_id,avatar} = char


    return {id:_id,name,about,gender,avatar:avatar?.url}
}
    
export const averageRatingPipeline = (animeId) =>{
    return [
        {
          $lookup:{
            from:"Review",
            localField:"rating",
            foreignField:'_id',
            as:"avgRat"
          },
          
        },
        {
          $match:{parentAnime:animeId}
        },
        {
          $group:{
            _id:null,
            ratingAvg:{
              $avg:'$rating'
            },
            reviewCount:{
              $sum: 1
            }
          }
        }
      ]
}

export const relatedAnimeAggregation = (tags,id) =>{

   return [
        {
          $lookup:{
            from:'Anime',
            localField:'tags',
            foreignField:'_id',
            as:'relatedAnime',
          }
        },
        {
          $match:{
            tags:{$in:[...tags]},
            _id:{$ne:id},
          }
        },
        {
          $project:{
            
            title: 1,
            poster: '$poster.url',
          }
        },
        {
          $limit: 5
        }
      ]
}

export const getAverageRatings = async (animeId)=>{
    const [aggregatedResponse] = await Review.aggregate(averageRatingPipeline(animeId))

    const reviews = {};
   
    if(aggregatedResponse){
     const {ratingAvg,reviewCount} = aggregatedResponse;
     reviews.ratingAvg = parseFloat(ratingAvg).toFixed(1),
     reviews.reviewCount = reviewCount;
    }

    return reviews
}