import {Router} from 'express'
import { userRoute } from './user.route.js'
export const indexRoute = Router()

indexRoute.use('/api',userRoute)