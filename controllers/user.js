
import { isValidObjectId } from "mongoose";
import { emailVerifyToken } from "../models/emailVerifyToken.schema.js";
import { passwordResetToken } from "../models/passwordResetToken.schema.js";
import {User} from "../models/user.schema.js"
import { generateRandomByte, sendError } from "../utils/helper.js";
import { resendVerificationOTP, resetPasswordOTP, resetPasswordSuccess, verificationOTP, verifiedOTP } from "../utils/sendVerifyOTP.js";

import jwt from "jsonwebtoken"



export const createUser = async(req,res)=>{

    const {name,email,password} = req.body
    //Check if userExist
    const oldUser = await User.findOne({ email });

    if(oldUser) return sendError(res,'Email already in Use',)
    //if no user exist add to DB
    const newUser = await User.create({name,email,password})

    //? Generate 6 digit OTP && store OTP to DB

    const verifyEmailOTP = verificationOTP(newUser)

    res.status(201).json({
       user:{
        id:newUser._id,
        name: newUser.name,
        email: newUser.email
       }
    })

};

export const verifyEmail = async (req,res)=>{

    const {userId,OTP} = req.body;

    if(!isValidObjectId(userId)) return res.json({error:"Invalid user!"})

    const user = await User.findById(userId);
    if(!user) return sendError(res,"user not found!",404)

    if(user.isVerified) return sendError(res,"user is already verified")

    const token = await emailVerifyToken.findOne({owner: userId})

    if(!token) return sendError(res,'token not found')

    const isMatched = await token.compareToken(OTP)
    if(!isMatched) return sendError(res,'Submit a valid OTP')

    user.isVerified = true;
    await user.save();
    await emailVerifyToken.findByIdAndDelete(token._id);
   const userVerified = verifiedOTP(user)
   const jwtToken = jwt.sign({userId:user._id},process.env.JWT_SECRET_KEY_S)

    res.json({user:{id:user._id,name:user.name,email:user.email,token:jwtToken,isVerified: user.isVerified},message:'Your Email is verified'})
}

export const resendVerifyToken = async(req,res)=>{
    const {userId} = req.body;
    const user = await User.findById(userId);
    if(!user) return sendError(res,"user not found!",404);

    if(user.isVerified) return sendError(res,"user is already verified")

    const tokenExist = await emailVerifyToken.findOne({owner: userId})

    if(tokenExist) return sendError(res,'Only after one hour you can request another token')

    const resendToken = resendVerificationOTP(user)
    res.status(200).json({message:'New Token has been sent'})
}

export const forgetPassword = async (req,res)=>{

    const {email} = req.body;

    if(!email) return sendError(res,'Email is Missing!');

    const user = await User.findOne({email});

    if(!user) return sendError(res,'User not found',404)
    
    const tokenExist = await passwordResetToken.findOne({owner:user._id})
    if(tokenExist) return sendError(res,'Only after one hour can you request new token');

   const token = await generateRandomByte();
   const newPasswordResetToken = await passwordResetToken({owner:user._id,token})
   await newPasswordResetToken.save()

   const resetPasswordUrl = `http://localhost:3000/auth/reset-password?token=${token}&id=${user._id}`;

   const resetPassLink = resetPasswordOTP(user,resetPasswordUrl)

   res.json({message:'Link Sent to your Email'})
}

export const sendResetPassTokenStatus = (req,res)=>{
    res.json({valid:true})
}
export const resetPassword = async(req,res)=>{
    
    const {newPassword,userId} = req.body

    const user = await User.findById(userId)
    const matched = await user.comparePassword(newPassword)

    if(matched) return sendError(res,'the new password must be different from the old one');

    user.password = newPassword
    await user.save();

    await passwordResetToken.findByIdAndDelete(req.resetToken._id)

    resetPasswordSuccess(user);

    res.json({message: 'Password reset successfully, now you can use new password'});

};

export const signIn = async(req,res)=>{
    const {email,password} = req.body;
try{

    const user = await User.findOne({email})
    if(!user) return sendError(res,'Email/Password mismatch');
    const matched = await user.comparePassword(password);
    
    if(!matched) return sendError(res,'Email/Password mismatch');
    
    const {_id,name,isVerified} = user
    const jwtToken = jwt.sign({userId:user._id},process.env.JWT_SECRET_KEY_S)
    res.json({user:{id:_id,name,email,token:jwtToken,isVerified}})
}catch(error){
    sendError(res,error.message)
}
    
}