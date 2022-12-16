
export const signUserCheck = (req,res,next)=>{

    const {email,password} = req.body;

    if(!email || !password){
        return res.status(401).json({error: "Email / Password missing!!"})
    }
    next()

}