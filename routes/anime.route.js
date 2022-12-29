import { Router } from "express";
import {
  createAnime,
  getAnimes,
  getUpdateAnime,
  removeAnime,
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
  isAdmin,

  getAnimes,
);
animeRoute.get(
  "/update-anime/:animeId",
  isAuth,
  isAdmin,

  getUpdateAnime,
);
