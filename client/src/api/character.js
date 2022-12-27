 import { catchError, getToken } from "../components/utils/helper"
import client from "./client"

export const createChar = async(formData) =>{
    const token = getToken()
    try{

        const {data} = await client.post('/character/create',formData,{
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