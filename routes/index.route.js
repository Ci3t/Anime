import {Router} from 'express'
import { characterRoute } from './character.route.js'
import { userRoute } from './user.route.js'
export const indexRoute = Router()

indexRoute.use('/api/user',userRoute)
indexRoute.use('/api/character',characterRoute)