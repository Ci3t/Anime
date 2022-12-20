import {Router} from 'express'
import { createChar,updateChar } from '../controllers/character.js'
import { uploadImage } from '../middlewares/multer.js'
import { characterInfoValidator, validate } from '../middlewares/validator.js'
export const characterRoute = Router()


characterRoute.post('/create',uploadImage.single('avatar'),characterInfoValidator,validate,createChar)

characterRoute.post('/update/:charId',uploadImage.single('avatar'),characterInfoValidator,validate,updateChar)