import { averageRatingPipeline, formatCharacter, getAverageRatings, relatedAnimeAggregation, sendError, topRatedAnimePipeline } from "../utils/helper.js";
import cloudinary from "../cloud/index.js";
import { Anime } from "../models/anime.schema.js";
import mongoose, { isValidObjectId } from "mongoose";
import { Review } from "../models/review.schema.js";

export const uploadTrailer = async (req, res) => {
  const { file } = req;

  if (!file) return sendError(res, "Video file missing!");

  const { secure_url: url, public_id } = await cloudinary.uploader.upload(
    file.path,
    { resource_type: "video" },
  );
  res.status(201).json({ secure_url: url, public_id });
};
export const createAnime = async (req, res) => {
  const { file, body } = req;

  const {
    title,
    description,
    releaseDate,
    status,
    type,
    genres,
    tags,
    cast,
    trailer,
    language,
  } = body;

  const newAnime = new Anime({
    title,
    description,
    releaseDate,
    status,
    type,
    genres,
    tags,
    cast,
    trailer,
    language,
  });

  //!uploading Poster

  if (file) {
    const {
      secure_url: url,
      public_id,
      responsive_breakpoints,
    } = await cloudinary.uploader.upload(file.path, {
      transformation: {
        width: 1280,
        height: 720,
      },
      responsive_breakpoints: {
        create_derived: true,
        max_width: 640,
        max_images: 3,
      },
    });

    const finalPoster = { url, public_id, responsive: [] };

    const { breakpoints } = responsive_breakpoints[0];

    if (breakpoints.length) {
      for (let imgObj of breakpoints) {
        const { secure_url } = imgObj;
        finalPoster.responsive.push(secure_url);
      }
    }

    newAnime.poster = finalPoster;
  }
  await newAnime.save();
  // console.log(secure_url)
  // console.log(url)
  res.status(201).json({
    anime:{ id: newAnime._id,
    title,}
  });
};

export const updateAnimeWithoutPoster = async (req, res) => {
  const { animeId } = req.params;

  if (!isValidObjectId(animeId)) return sendError(res, "Invalid anime id");

  const anime = await Anime.findById(animeId);

  if (!anime) return sendError(res, "Anime not found", 404);

  const {
    title,
    description,
    releaseDate,
    status,
    type,
    genres,
    tags,
    cast,
    trailer,
    language,
  } = req.body;

  anime.title = title;
  anime.description = description;
  anime.tags = tags;
  anime.releaseDate = releaseDate;
  anime.genres = genres;
  anime.status = status;
  anime.type = type;
  anime.cast = cast;
  anime.trailer = trailer;
  anime.language = language;

  await anime.save();

  res.json({ message: "Anime is Updated", anime });
};

export const updateAnime = async (req, res) => {
  const { animeId } = req.params;
  const { file } = req;

  if (!isValidObjectId(animeId)) return sendError(res, "Invalid anime id");
  // if (!req.file) return sendError(res, "Anime Poster is missing !!");
  const anime = await Anime.findById(animeId);

  if (!anime) return sendError(res, "Anime not found", 404);

  const {
    title,
    description,
    releaseDate,
    status,
    type,
    genres,
    tags,
    cast,

    language,
  } = req.body;

  anime.title = title;
  anime.description = description;
  anime.tags = tags;
  anime.releaseDate = releaseDate;
  anime.genres = genres;
  anime.status = status;
  anime.type = type;
  anime.cast = cast;

  anime.language = language;

  if (file) {
    const posterId = anime.poster?.public_id;
    if (posterId) {
      const { result } = await cloudinary.uploader.destroy(posterId);

      if (result !== "ok") {
        return sendError(res, "Could not update poster at the moment");
      }
    }

    const {
      secure_url: url,
      public_id,
      responsive_breakpoints,
    } = await cloudinary.uploader.upload(req.file.path, {
      transformation: {
        width: 1280,
        height: 720,
      },
      responsive_breakpoints: {
        create_derived: true,
        max_width: 640,
        max_images: 3,
      },
    });

    const finalPoster = { url, public_id, responsive: [] };

    const { breakpoints } = responsive_breakpoints[0];

    if (breakpoints.length) {
      for (let imgObj of breakpoints) {
        const { secure_url } = imgObj;
        finalPoster.responsive.push(secure_url);
      }
    }

    anime.poster = finalPoster;
  }
  await anime.save();

  res.json({
    message: "Anime is Updated",
    anime: {
      id: anime._id,
      title: anime.title,
      poster: anime.poster?.url,
      genres: anime.genres,
      status: anime.status,
    },
  });
};

export const removeAnime = async (req, res) => {
  const { animeId } = req.params;

  console.log(animeId);
  mongoose.Types.ObjectId(animeId);

  if (!isValidObjectId(animeId)) return sendError(res, "Invalid anime id");

  const anime = await Anime.findById(animeId);

  if (!anime) return sendError(res, "Anime not found", 404);

  const posterId = anime.poster?.public_id;

  if (posterId) {
    const { result } = await cloudinary.uploader.destroy(posterId);
    if (result !== "ok")
      return sendError(res, "Could not remove poster from cloud");
  }

  const trailerId = anime.trailer?.public_id;
  if (!trailerId) return sendError(res, "Could not find trailer in the cloud");

  const { result } = await cloudinary.uploader.destroy(trailerId, {
    resource_type: "video",
  });
  if (result !== "ok")
    return sendError(res, "Could not remove trailer from cloud");

  await Anime.findByIdAndDelete(animeId);

  res.json({ message: "Anime Removed Successfully " });
};

export const getAnimes = async (req, res) => {
  const { pageNo = 0, limit = 10 } = req.query;
  const animes = await Anime.find({})
    .sort({ createdAt: -1 })
    .skip(parseInt(pageNo) * parseInt(limit))
    .limit(parseInt(limit));

  const results = animes.map((anime) => ({
    id: anime._id,
    title: anime.title,
    poster: anime.poster?.url,
    responsivePosters:anime.poster.responsive,
    genres: anime.genres,
    status: anime.status,
  }));
  res.json({ animes: results });
};

export const getUpdateAnime = async (req, res) => {
  const { animeId } = req.params;
  if (!isValidObjectId(animeId)) return sendError(res, "Id is Invalid");

  const anime = await Anime.findById(animeId).populate("cast.character");
  res.json({
    anime: {
      id: anime._id,
      title: anime.title,
      description: anime.description,
      poster: anime.poster?.url,
      genres: anime.genres,
      releaseDate: anime.releaseDate,
      status: anime.status,
      type: anime.type,
      language: anime.language,
      tags: anime.tags,
      cast: anime.cast.map((c) => {
        return {
          id: c.id,
          profile: formatCharacter(c.character),
          roleAs: c.roleAs,
          leadChar: c.leadChar,
        };
      }),
    },
  });
};

export const searchAnime = async (req, res) => {
  const { title } = req.query;

  if (!title.trim()) return sendError(res, "Invalid request!");
  const animes = await Anime.find({ title: { $regex: title, $options: "i" } });

  res.json({
    results: animes.map((anime) => {
      return {
        id: anime._id,
        title: anime.title,
        poster: anime.poster?.url,
        genres: anime.genres,
        status: anime.status,
      };
    }),
  });
};

export const getLatestUploads = async (req, res) => {
  const { limit = 5 } = req.query;

  const results = await Anime.find({ status: "public" })
    .sort("-createdAt")
    .limit(parseInt(limit));
  const animes = results.map((ani) => {
    return {
      id: ani._id,
      title: ani.title,
      description: ani.description,
      poster: ani.poster?.url,
      responsivePosters:ani.poster.responsive,
      trailer: ani.trailer?.url,
    };
  });

  res.json({ animes });
};

export const getSingleAnime = async (req, res) => {
  const { animeId } = req.params;

  if (!isValidObjectId(animeId))
    return sendError(res, "Anime id is not valid !");

  const anime = await Anime.findById(animeId).populate("cast.character");

//  const [aggregatedResponse] = await Review.aggregate(averageRatingPipeline(anime._id))

//  const reviews = {};

//  if(aggregatedResponse){
//   const {ratingAvg,reviewCount} = aggregatedResponse;
//   reviews.ratingAvg = parseFloat(ratingAvg).toFixed(1),
//   reviews.reviewCount = reviewCount;
//  }

const reviews = await getAverageRatings(anime._id)



  const {
    _id: id,
    title,
    description,
    cast,
    releaseDate,
    genres,
    tags,
    language,
    poster,
    trailer,
    type,
  } = anime;
  res.json({
    anime: {
      id,
      title,
      description,
      releaseDate,
      genres,
      tags,
      type,
      language,
      poster:poster?.url,
      trailer:trailer?.url,
      cast: cast.map((c) => ({
        id: c._id,
        profile: {
          id: c.character._id,
          name: c.character.name,
          avatar: c.character?.avatar?.url,
        },
        leadChar:c.leadChar,
        roleAs:c.roleAs
      })),
     reviews:{...reviews}
     
     
    },
  });
};

export const getRelatedAnime =async (req, res) =>{

  const {animeId} = req.params;
  if(!isValidObjectId(animeId)) sendError(res,'Invalid anime ID');

  const anime = await Anime.findById(animeId);

  const animes = await Anime.aggregate(relatedAnimeAggregation(anime.tags,anime._id))

  const mapAnime = async (ani) => {
    const reviews =  await getAverageRatings(ani._id)
      return{
        id:ani._id,
        title:ani.title,
        poster:ani.poster,
        responsivePosters:ani.responsivePosters,
        reviews:{...reviews},
      }
    }

 const relatedAnime = await Promise.all(animes.map(mapAnime))

  res.json({animes:relatedAnime})
}

export const getTopRatedAnime = async (req,res)=>{

  const {type = 'TV Series'} = req.query;

const animes = await Anime.aggregate(topRatedAnimePipeline(type))

const mapAnimes = async (m) =>{
 const reviews = await getAverageRatings(m._id)

 return {
  id:m._id,
  title:m.title,
  poster:m.poster,
  responsivePosters:m.responsivePosters,
  reviews:{...reviews},
 }
}
const topRatedAnime = await Promise.all(animes.map(mapAnimes))

  res.json({animes:topRatedAnime})
}