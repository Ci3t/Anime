import { Anime } from "../models/anime.schema.js"
import { Review } from "../models/review.schema.js"
import { User } from "../models/user.schema.js"
import { getAverageRatings, topRatedAnimePipeline } from "../utils/helper.js"

export const getAppInfo = async (req,res)=>{

    const animeCount = await Anime.countDocuments()
    const reviewCount = await Review.countDocuments()
    const userCount = await User.countDocuments()

    res.json({appInfo:{animeCount,reviewCount,userCount}})
}
export const getMostRated = async (req,res)=>{
   

    const animes = await Anime.aggregate(topRatedAnimePipeline())
    
    const mapAnimes = async (m) =>{
     const reviews = await getAverageRatings(m._id)
    
     return {
      id:m._id,
      title:m.title,

      reviews:{...reviews},
     }
    }
    const topRatedAnime = await Promise.all(animes.map(mapAnimes))
    
      res.json({animes:topRatedAnime})
}

