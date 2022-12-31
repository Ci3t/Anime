import React, { useEffect } from 'react'
import { useState } from 'react'
import { getTopRatedAnime } from '../../api/anime'
import { useNotification } from '../../hooks/themeHook'

import AnimeList from './AnimeList'

function TopRatedAnime() {
    
    const [animes,setAnimes] = useState([])
    const {updateNotification} = useNotification()

    const fetchAnime = async() =>{

      const {error,animes} = await getTopRatedAnime()
      if(error) return updateNotification('error',error)

      setAnimes([...animes])

    }

 

    useEffect(() => {

     fetchAnime()
    }, [])
  
  return (
    <AnimeList animes={animes} title='Viewers Choice (TV Series)' />
  )
}

export default TopRatedAnime