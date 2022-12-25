import { Router } from "express";
import {
  createAnime,
  removeAnime,
  updateAnimeWithoutPoster,
  updateAnimeWithPoster,
  uploadTrailer,
} from "../controllers/anime.js";
import { isAdmin, isAuth, isMod } from "../middlewares/auth.js";
import { parseData } from "../middlewares/helperParse.js";
import { uploadImage, uploadVideo } from "../middlewares/multer.js";
import {
  validate,
  validateAnime,
  validateAnimeWithoutPoster,
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
  validate,
  createAnime,
);
animeRoute.patch(
  "/update-anime-without-poster/:animeId",
  isAuth,
  isAdmin,
//   parseData,
  validateAnimeWithoutPoster,
  validate,
  updateAnimeWithoutPoster,
);
animeRoute.patch(
  "/update-anime-with-poster/:animeId",
  isAuth,
  isAdmin,
  uploadImage.single("poster"),
  parseData,
  validateAnimeWithoutPoster,
  validate,
  updateAnimeWithPoster,
);
animeRoute.delete(
  "/:animeId",
  isAuth,
  isAdmin,

  removeAnime,
);
