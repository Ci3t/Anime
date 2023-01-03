import React, { useState } from 'react'
import { useEffect } from 'react'
import { getMostRatedAnime } from '../api/admin'
import { useNotification } from '../hooks/themeHook'
import RatingStar from './RatingStar'
import { convertReviewCount } from './utils/helper'
import styles from './style/appInfoBox.module.css'
const classBlur = styles.blurAppInfo

function MostRatedAnime() {
    const [animes,setAnimes] = useState([])
    const {updateNotification} = useNotification()
    const fetchMostRatedAnimes = async()=>{
        
        const {error,animes} = await getMostRatedAnime()
        if(error) return updateNotification('error',error)
        setAnimes([...animes])
    }

    




    useEffect(()=>{
        fetchMostRatedAnimes()
    },[])
  return (
    <div className={classBlur +' bg-[#22215c] shadow p-5 rounded'}>
        <h1 className="font-semibold text-[#a2dafa] text-2xl mb-2">
            Most Rated Anime's
        </h1>
        <ul className="space-y-3 text-white">

        {animes.map(anime=>{
            return (
            <li key={anime.id}>
                <h1 className="font-semibold text-lg">{anime.title}</h1>
                <div className="flex space-x-2">

                <RatingStar rating={anime.reviews?.ratingAvg} />
                <p className='text-highlight-dark'>{convertReviewCount(anime.reviews?.reviewCount)} Reviews</p>
                </div>
            </li>
            )
        })}
        </ul>
    </div>
  )
}

export default MostRatedAnime