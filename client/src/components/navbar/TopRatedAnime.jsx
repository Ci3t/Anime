import React, { useEffect } from 'react'
import { useState } from 'react'
import { getTopRatedAnime } from '../../api/anime'
import { useNotification } from '../../hooks/themeHook'

import AnimeList from './AnimeList'

function TopRatedAnime() {
    
    const [animes,setAnimes] = useState([])
    const {updateNotification} = useNotification()

    const fetchAnime = async(signal) =>{

      const {error,animes} = await getTopRatedAnime(null,signal)
      if(error) return updateNotification('error',error)

      setAnimes([...animes])

    }

 

    useEffect(() => {
        const ac = new AbortController()
        fetchAnime(ac.signal)
        return ()=>{
            ac.abort()
        }
    
    }, [])
  
  return (
    <AnimeList animes={animes} title='Viewers Choice (TV Series)' />
  )
}

export default TopRatedAnime