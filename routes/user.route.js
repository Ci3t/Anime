import {Router} from 'express'
import { createUser, forgetPassword,resetPassword, resendVerifyToken, sendResetPassTokenStatus, verifyEmail, signIn } from '../controllers/user.js'
import { isValidPassResetToken } from '../middlewares/user.middle.js';

import { signInValidator, userValidator,validate, validatePassword } from '../middlewares/validator.js';

import { isAuth } from '../middlewares/auth.js';




export const userRoute = Router()
//! USER ROUTES
userRoute.post('/create',userValidator,validate,createUser)
userRoute.post('/sign-in',signInValidator,validate,signIn)
userRoute.get('/is-auth',isAuth,(req,res)=>{
    const {user} = req
    res.json({user:{id:user._id,name:user.name,email:user.email,isVerified:user.isVerified,role:user.role}})
})
userRoute.post('/verify-email',verifyEmail)
userRoute.post('/resend-verify-email',resendVerifyToken)
userRoute.post('/forget-password',forgetPassword)
userRoute.post('/verify-pass-resetToken',isValidPassResetToken,sendResetPassTokenStatus)
userRoute.post('/reset-password',validatePassword,validate,isValidPassResetToken,resetPassword)

