import {Router} from 'express'
import { createChar,updateChar,removeChar, searchCharacter,getLatestCharacters,getSingleChar, getCharacters } from '../controllers/character.js'
import { isAdmin, isAuth, isMod } from '../middlewares/auth.js'
import { uploadImage } from '../middlewares/multer.js'
import { characterInfoValidator, validate } from '../middlewares/validator.js'
export const characterRoute = Router()


characterRoute.post('/create',isAuth,isAdmin,uploadImage.single('avatar'),characterInfoValidator,validate,createChar)

characterRoute.post('/update/:charId',isAuth,isAdmin,uploadImage.single('avatar'),characterInfoValidator,validate,updateChar)

characterRoute.delete('/:charId',isAuth,isAdmin,removeChar)

characterRoute.get('/search',isAuth,isMod,searchCharacter)
characterRoute.get('/latest-uploads',isAuth,isMod,getLatestCharacters)
characterRoute.get('/characters',isAuth,isMod,getCharacters)

characterRoute.get('/single/:id',getSingleChar)
