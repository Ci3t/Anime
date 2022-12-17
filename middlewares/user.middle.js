
// export const signUserCheck = (req,res,next)=>{

import { isValidObjectId } from "mongoose";
import { passwordResetToken } from "../models/passwordResetToken.schema.js";
import { sendError } from "../utils/helper.js";

//     const {email,password} = req.body;

//     if(!email || !password){
//         return res.status(401).json({error: "Email / Password missing!!"})
//     }
//     next()

// }

export const isValidPassResetToken = async (req,res,next)=>{
    const {token , userId} = req.body;

    if(!token.trim() || !isValidObjectId(userId)) return sendError(res,'Invalid Request')

    const resetToken = await passwordResetToken.findOne({owner: userId})
    if(!resetToken) return sendError(res,'Unauthorized access, Invalid request!')

    const matched = await resetToken.compareToken(token)

    if(!matched) return sendError(res,'Unauthorized access,invalid request');

    req.resetToken = resetToken

    next()
}

