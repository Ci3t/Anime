import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
const userSchema = Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        trim:true,
        required:true,
        unique:true,

    },
    password:{
        type:String,
        required:true
    }
})

userSchema.pre('save',async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,10)
    }

    next();
})

export const User = mongoose.model('User',userSchema)

export default {userSchema,User}