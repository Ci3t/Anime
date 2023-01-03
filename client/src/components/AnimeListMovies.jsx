import React, { useEffect, useState } from 'react'
import { getTvAnime } from '../api/anime'
import { useNotification } from '../hooks/themeHook';
import Container from './Container';
import GridContainer from './GridContainer';
import RatingStar from './RatingStar';
import { Link } from 'react-router-dom';
import styles from './style/animeListMovies.module.css'


function AnimeListMovies() {
    const [animes,setAnimes]=useState([])
    const { updateNotification } = useNotification();

    const fetchTvAnime =async() =>{

        const {animes,error} = await getTvAnime('Movie');
        if (error) return updateNotification("error", error);

        setAnimes([...animes])
      
    }

  


  

    useEffect(()=>{
        fetchTvAnime()
    },[])

    const {id,description,poster,title,genres = [],reviews ={},responsivePosters =[]} = animes
  return (
    <div className={styles.animeListMoviesBackground +' mx-auto px-2'}>
<Container className={'mx-2 xl:p-0 max-w-[72%] pt-4'}>
        <AnimeMoviesHeader/>
<GridContainer  className={'gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4'}>
{/* px-2 xl:p-0 */}
    <AnimeMovies animes={animes}/>
    </GridContainer>
    </Container>
</div>
  )
}


const AnimeMoviesHeader = ()=>{

    return (
        <React.Fragment className='relative'>
    <img className='max-h-[54em]' src="./images/cap_anime2.png" alt="" />
    {/* <h1 className={ styles.animeMoviesTitle+' text-center'}> <span>Anime </span> Movies</h1> */}
        </React.Fragment>
    )
}


const trimTitle = (text = '')=>{

    if (text.length <= 270 ) return text;
    return text.substring(0,270)+ '..'
 }


const AnimeMovies = ({animes})=>{
return (
    <>
    {animes.map(anime=>


<Link to={`/anime/${anime.id}`} className={styles.animeListMoviesBackgroundBlur +' overflow-hidden shadow-lg transition rounded-lg md:w-80 cursor-pointer mt-3 mb-3 no-underline w-[7em]'}>
     
    <img className={styles.animeListTvSeries +' w-full'} src={anime.responsivePosters?.[0]} alt={anime.title} />
    <div className=" px-2">
    <h1 className='text-[#f5cb57] text-2xl hover:underline  '>{anime.title}</h1>
    <p className='text-[#d9b9f3] font-light text-md'>{trimTitle(anime.description)}</p>
    <div className="flex flex-wrap justify-starts items-center py-1 border-b-2 text-xs text-white">
            {anime.genres.map(g=>{
                return <span className='m-1 px-2 py-1 rounded bg-[#7736e0]'>
                    {g}
                </span>
            })}
       
    </div>
    <div className="mt-2">

    <RatingStar rating={anime.reviews?.ratingAvg} />
    </div>
 
    </div>
    
    
</Link>
           
)}
    </>
)
}


export default AnimeListMovies