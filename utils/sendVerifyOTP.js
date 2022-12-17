import nodemailer from "nodemailer";
import { emailVerifyToken } from "../models/emailVerifyToken.schema.js";
import HTML_TEMPLATE from "./mail-Template.js";
import dotenv from 'dotenv'
dotenv.config()

export const generateTransporter = ()=>{
 const transport =  nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS,
     
    }
  });
  return transport
}



export const verificationOTP = async(user)=>{

    let OTP = ''
    for(let i =0; i<= 5;i++){
      const randomVal =  Math.round(Math.random()* 9)
      OTP += randomVal;
    }
    const newEmailVerfiyToken = await emailVerifyToken.create({owner: user._id, token: OTP})
    let transport = generateTransporter()


      transport.sendMail({
        from: 'verification@Ci3tAnime.com',
        to: user.email,
        subject: 'Email Verification',
        html: HTML_TEMPLATE('Your Verification Code',OTP,'Enjoy your stay')
      })
}
export const resendVerificationOTP = async(user)=>{

    let OTP = ''
    for(let i =0; i<= 5;i++){
      const randomVal =  Math.round(Math.random()* 9)
      OTP += randomVal;
    }
    const newEmailVerfiyToken = await emailVerifyToken.create({owner: user._id, token: OTP})
    let transport = generateTransporter()


      transport.sendMail({
        from: 'verification@Ci3tAnime.com',
        to: user.email,
        subject: 'Email Verification',
        html: HTML_TEMPLATE('Your Verification Code',OTP,'Enjoy your stay')
      })
}
export const verifiedOTP = async(userID)=>{

   
  let transport = generateTransporter()


      transport.sendMail({
        from: 'verification@Ci3tAnime.com',
        to: userID.email,
        subject: 'Welcome',
        html: HTML_TEMPLATE('Welcome to Our Site','Enjoy Your Stay and have fun','thanks for choosing us')
      })
}
export const resetPasswordOTP = async(userID,passLink)=>{

   
  let transport = generateTransporter()


      transport.sendMail({
        from: 'Security@Ci3tAnime.com',
        to: userID.email,
        subject: 'Reset Password Link',
        html: `
          <p>Click me to reset Password</p>
          <a href=${passLink}>Change Password</a>
        `
      })
}
export const resetPasswordSuccess = async(userID)=>{

   
  let transport = generateTransporter()


      transport.sendMail({
        from: 'Security@Ci3tAnime.com',
        to: userID.email,
        subject: 'Reset Password Successfully ',
        html: `
          <h1>Password Reset Successfully/h1>
          
        `
      })
}