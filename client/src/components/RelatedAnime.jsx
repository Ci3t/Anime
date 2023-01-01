import React, { useEffect, useState } from 'react'
import { getRelatedAnime } from '../api/anime'
import { useNotification } from '../hooks/themeHook'
import AnimeList from './navbar/AnimeList';

function RelatedAnime({animeId}) {
    const [animes,setAnimes] = useState([])
    const {updateNotification} = useNotification();

    const fetchRelatedAnime = async()=>{

       const {error,animes} = await getRelatedAnime(animeId)
       if(error) return updateNotification('error',error);


       setAnimes([...animes])
    }

    useEffect(()=>{
        if(animeId) fetchRelatedAnime()
    },[animeId])
  return (
    <AnimeList title='Related Anime' animes={animes}/>
  )
}

export default RelatedAnime