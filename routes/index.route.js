import {Router} from 'express'

export const indexRoute = Router()

indexRoute.get('/',(req,res)=>{
    res.send('2nd Level')
})