import {Router} from 'express'
import { createUser, forgetPassword,resetPassword, resendVerifyToken, sendResetPassTokenStatus, verifyEmail, signIn } from '../controllers/user.js'
import { isValidPassResetToken } from '../middlewares/user.middle.js';

import { signInValidator, userValidator,validate, validatePassword } from '../middlewares/validator.js';





export const userRoute = Router()
//! USER ROUTES
userRoute.post('/create',userValidator,validate,createUser)
userRoute.post('/sign-in',signInValidator,validate,signIn)
userRoute.post('/verify-email',verifyEmail)
userRoute.post('/resend-verify-email',resendVerifyToken)
userRoute.post('/forget-password',forgetPassword)
userRoute.post('/verify-pass-resetToken',isValidPassResetToken,sendResetPassTokenStatus)
userRoute.post('/reset-password',validatePassword,validate,isValidPassResetToken,resetPassword)

