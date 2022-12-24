import {Router} from 'express'
import { createAnime, uploadTrailer } from '../controllers/anime.js'
import { isAdmin, isAuth, isMod } from '../middlewares/auth.js'
import { parseData } from '../middlewares/helperParse.js'
import { uploadImage, uploadVideo } from '../middlewares/multer.js'
import { validate, validateAnime } from '../middlewares/validator.js'
export const animeRoute = Router()

animeRoute.post('/upload-trailer',isAuth,isAdmin,uploadVideo.single('video'),uploadTrailer)
animeRoute.post('/create',isAuth,isAdmin,uploadImage.single('poster'),parseData,validateAnime,validate,createAnime)