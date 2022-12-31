
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getSingleAnime } from '../../api/anime'
import { useNotification } from '../../hooks/themeHook'
import Container from '../Container'

function SingleAnime() {

    const [ready,setReady] = useState(false)
    const [animes,setAnimes] = useState({})
const {updateNotification} = useNotification()
    const {animeId} = useParams()

    const fetchAnime=async()=>{
      const {error,anime} =  await getSingleAnime(animeId);

      if(error) return updateNotification('error',error)
      setReady(true)
      setAnimes(anime);
    }

    useEffect(()=>{
       if(animeId) fetchAnime()
    },[animeId])

    if(!ready) return <div className="w-screen h-screen flex justify-center items-center">
        <p className="text-light-subtle animate-pulse">Please Wait...</p>
    </div>

    const {trailer,poster,title,id,reviews={}} = animes
  return (
    <div>
        <Container>
            <video poster={poster} controls src={trailer} ></video>
            <div className="flex justify-between">

            <h1 className='text-4xl text-highlight-dark font-semibold py-3'>{title}</h1>
            <div>
                <Link className='text-highlight-dark no-underline hover:underline' to={'/anime/reviews/' + id}>
                {reviews.reviewCount} Reviews
                </Link>
            </div>
            </div>
        </Container>
    </div>
  )
}

export default SingleAnime