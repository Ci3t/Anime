import {User} from "../models/user.schema.js"

export const createUser = async(req,res)=>{

    const {name,email,password} = req.body

    const oldUser = await User.findOne({ email });

    if(oldUser) return res.status(401).json({error:'Email already in Use'})

    const newUser = await User.create({name,email,password})

    res.status(201).json({
        user:newUser
    })

}