import { catchError, getToken } from "../components/utils/helper"
import client from "./client"

export const uploadTrailer = async(formData,onUploadProgress) =>{
    const token = getToken()
    try{

        const {data} = await client.post('/anime/upload-trailer',formData,{
            headers:{
                authorization: 'Bearer ' + token,
                'content-type':'multipart/form-data'
            },
            onUploadProgress:({loaded,total})=>{
                if(onUploadProgress) onUploadProgress(Math.floor((loaded/total)*100))
            }
        })
        return data
    }catch(error){
        return catchError(error)
     
    }

}
export const uploadAnime = async(formData) =>{
    const token = getToken()
    try{

        const {data} = await client.post('/anime/create',formData,{
            headers:{
                authorization: 'Bearer ' + token,
                'content-type':'multipart/form-data'
            },
           
        })
     
        return data
    }catch(error){
        return catchError(error)
     
    }

}
export const getAnimes = async(pageNo,limit) =>{
    const token = getToken()
    try{

        const {data} = await client(`/anime/animes?pageNo=${pageNo}&limit=${limit}`,{
            headers:{
                authorization: 'Bearer ' + token,
                'content-type':'multipart/form-data'
            },
           
        })
     
        return data
    }catch(error){
        return catchError(error)
     
    }

}