import { catchError, getToken } from "../components/utils/helper";
import client from "./client";


export const addReview= async (animeId,reviewData) => {
    const token = getToken();
    try {
      const { data } = await client.post(
        `/review/add/${animeId}`,reviewData,
        {
          headers: {
            authorization: "Bearer " + token,
          
          },
        },
      );
  
      return data;
    } catch (error) {
      return catchError(error);
    }
  };
export const getReviewByAnime= async (animeId) => {
 
    try {
      const { data } = await client(
        `/review/get-reviews-by-anime/${animeId}`,
      
      );
  
      return data;
    } catch (error) {
      return catchError(error);
    }
  };