import React, { useEffect, useState } from 'react'
import { getTvAnime } from '../api/anime'
import { useNotification } from '../hooks/themeHook';
import RatingStar from './RatingStar';

import './animeListTv.scss'

function AnimeListTV() {
    const [animes,setAnimes]=useState([])
    const { updateNotification } = useNotification();
    const fetchTvAnime =async() =>{

        const {animes,error} = await getTvAnime('TV Series');
        if (error) return updateNotification("error", error);

        setAnimes([...animes])
      
    }

    const trimTitle = (text = '')=>{

        if (text.length <= 270 ) return text;
        return text.substring(0,270)+ '..'
     }


  

    useEffect(()=>{
        fetchTvAnime()
    },[])

    const {id,description,poster,title,genres = [],reviews ={},responsivePosters =[]} = animes
  return (
    <div>
        {animes.map(anime=>
            <div className='cardAnimeListHomePage'>
                <h1>{anime.title}</h1>
                <img src={anime.responsivePosters?.[1]} alt={anime.title} />
                <p>{trimTitle(anime.description)}</p>
                <RatingStar rating={anime.reviews?.ratingAvg} />
                {/* <p className='text-main'>{convertReviewCount(anime.reviews?.reviewCount)} Reviews</p> */}

                

            </div>
            )}
    </div>
  )
}

export default AnimeListTV