import { sendError } from "../utils/helper.js";
import cloudinary from "../cloud/index.js";
import { Anime } from "../models/anime.schema.js";

export const uploadTrailer = async(req,res)=>{

    const {file} = req;

    if(!file) return sendError(res,'Video file missing!')

    const {secure_url:url,public_id} = await cloudinary.uploader.upload(file.path,{resource_type:'video'});
    res.status(201).json({secure_url:url,public_id})

}
export const createAnime = async(req,res)=>{

    const {file , body} = req;

    const {
        title,
        description,
        releaseDate,
        status,
        genres,
        tags,
        cast,
        trailer,
        language



    } = body;

    const newAnime = new Anime({
        title,
        description,
        releaseDate,
        status,
        genres,
        tags,
        cast,
        trailer,
        language
    })

    const {secure_url:url,public_id,responsive_breakpoints} = await cloudinary.uploader.upload(file.path,{
transformation:{
    width:1280,
    height:720,
},
        responsive_breakpoints:{
            create_derived:true,
            max_width: 640,
            max_images:3
        }
    });
    
    console.log(req.body.genres);

    const finalPoster = {url , public_id,responsive:[]}

    const {breakpoints} = responsive_breakpoints[0]

    if(breakpoints.length){

        
        for (let imgObj of breakpoints){
            
            const {secure_url} = imgObj
            finalPoster.responsive.push(secure_url)
        }
    }

    newAnime.poster = finalPoster

    await newAnime.save()

    res.status(201).json({
        id:newAnime._id,
        title,

    })
    

}

