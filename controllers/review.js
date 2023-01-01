import { isValidObjectId } from "mongoose";
import { Anime } from "../models/anime.schema.js";
import { Review } from "../models/review.schema.js";
import { getAverageRatings, sendError } from "../utils/helper.js";


export const addReview = async(req,res)=>{

    const{animeId} = req.params;
    const {content,rating} = req.body;
    const userId = req.user._id;

    if(!isValidObjectId(animeId)) return sendError(res,'Invalid Anime!!!');

   const anime = await Anime.findOne({_id:animeId,status:'public'});

   if(!anime) return sendError(res,'Anime not found!!',404);

 const isAlreadyReviewed =  await Review.findOne({owner:userId,parentAnime: anime._id});

 if(isAlreadyReviewed) return sendError(res,'Invalid request review is already there!');

 //create and update review!

 const newReview = new Review({
    owner:userId,
    parentAnime:anime._id,
    content,
    rating

});
//updating review for anime
    anime.reviews.push(newReview._id);
    await anime.save()
    //saving new rating || review
    await newReview.save()

   const reviews = await getAverageRatings(anime.id)
    res.json({message:'Your review has been added!',reviews})

};


export const updateReview= async(req,res)=>{

    const{reviewId} = req.params;
    const {content,rating} = req.body;
    const userId = req.user._id;

    if(!isValidObjectId(reviewId)) return sendError(res,'Invalid review ID');

   const review = await Review.findOne({owner:userId,_id:reviewId})

   
   console.log( await Review.findOne({owner:userId,_id:reviewId}));

   if(!review) return sendError(res,'Review not found',404);
   
   review.content=content;
   review.rating = rating;
   
   await review.save();

   res.json({message:'Your review has been updated.'});

}

export const removeReview = async (req,res)=>{

    const {reviewId} = req.params;
    const userId = req.user._id;

    if(!isValidObjectId(reviewId)) return sendError(res,'Invalid review ID!');

  const review =   await Review.findOne({owner:userId,_id:reviewId});

  if(!review)  return sendError(res,'Invalid request, review Not found!',404);

  const anime = await Anime.findById(review.parentAnime).select('reviews');
    anime.reviews = anime.reviews.filter(rId => rId.toString() !== reviewId);

    await Review.findByIdAndDelete(reviewId);
    await anime.save();
    res.json({message:'Review removed successfully!'})


}

export const getReviewsByAnime = async (req,res)=>{
        const {animeId} = req.params;

        if(!isValidObjectId(animeId)) return sendError(res,'Invalid anime ID!');

        const anime = await Anime.findById(animeId)
        .populate({
            path:'reviews',
            populate:{
                path:'owner',
                select:'name',
            },
        }).select('reviews');

       const reviews =  anime.reviews.map(r=>{
            const {owner,content,rating,_id:reviewId} = r
            const {name,_id:ownerId} = owner
            return {

                id:reviewId,
                owner:{
                    id:ownerId,
                    name,
                },
                content,
                rating,
            }
        })
        res.json({reviews});
}