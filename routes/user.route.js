import {Router} from 'express'
import { createUser } from '../controllers/user.js'

import { userValidtor,validate } from '../middlewares/validator.js';




export const userRoute = Router()

userRoute.post('/create',userValidtor,validate,createUser)

