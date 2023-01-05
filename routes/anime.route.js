import { Router } from "express";
import {
  createAnime,
  getAnimeListByType,
  getAnimes,
  getLatestUploads,
  getRelatedAnime,
  getSingleAnime,
  getTopRatedAnime,
  getUpdateAnime,
  removeAnime,
  searchAnime,
  searchPublicAnime,
  updateAnime,

  uploadTrailer,
} from "../controllers/anime.js";
import { isAdmin, isAuth, isMod } from "../middlewares/auth.js";
import { parseData } from "../middlewares/helperParse.js";
import { uploadImage, uploadVideo } from "../middlewares/multer.js";
import {
  validate,
  validateAnime,

  validateTrailer,
} from "../middlewares/validator.js";

export const animeRoute = Router();

animeRoute.post(
  "/upload-trailer",
  isAuth,
  isAdmin,
  uploadVideo.single("video"),
  uploadTrailer,
);
animeRoute.post(
  "/create",
  isAuth,
  isAdmin,
  uploadImage.single("poster"),
  parseData,
  validateAnime,
  validateTrailer,
  validate,
  createAnime,
);
// animeRoute.patch(
//   "/update-anime-without-poster/:animeId",
//   isAuth,
//   isAdmin,
// //   parseData,
//   validateAnimeWithoutPoster,
//   validate,
//   updateAnimeWithoutPoster,
// );
animeRoute.patch(
  "/update/:animeId",
  isAuth,
  isAdmin,
  uploadImage.single("poster"),
  parseData,
  validateAnime,
  validate,
  updateAnime,
);
animeRoute.delete(
  "/:animeId",
  isAuth,
  isAdmin,

  removeAnime,
);
animeRoute.get(
  "/animes",
  isAuth,
  isMod,

  getAnimes,
);
animeRoute.get(
  "/update-anime/:animeId",
  isAuth,
  isMod,

  getUpdateAnime,
);
animeRoute.get(
  "/search",
  isAuth,
  isMod,

  searchAnime,
);
//! Normal users routes

animeRoute.get(
  "/latest-uploads",getLatestUploads);
animeRoute.get(
  "/single/:animeId",getSingleAnime);
animeRoute.get(
  "/related/:animeId",getRelatedAnime);
animeRoute.get(
  "/top-rated",getTopRatedAnime);

  animeRoute.get(
    "/search-public",
 
    searchPublicAnime,
  );
  animeRoute.get(
    "/anime-list",
 
    getAnimeListByType,
  );
