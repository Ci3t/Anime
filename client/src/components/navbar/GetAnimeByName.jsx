import React, {  useState } from 'react'


import Container from '../Container';
import GridContainer from '../GridContainer';
import RatingStar from '../RatingStar';

import styles from '../style/animeListMovies.module.css'
import { findAnimeByName} from '../../api/anime';


function GetAnimeByName() {
    const [animes,setAnimes]=useState([])
    const [searchAnime,setSearchAnime]=useState('')


    const fetchFindAnime =async() =>{

        const {data} = await findAnimeByName(searchAnime);
        // if (error) return updateNotification("error", error);
     
        setAnimes(data)
        setSearchAnime('')
    }

  console.log(searchAnime);


  


  return (
    <div className={styles.animeListMoviesBackground +' mx-auto px-2 min-h-screen'}>
<Container className={'mx-2 xl:p-0 max-w-[72%] pt-4'}>
        <AnimeMoviesHeader searchAnime={searchAnime} setSearchAnime={setSearchAnime} onClick={fetchFindAnime} />
<GridContainer  className={'gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4'}>
{/* px-2 xl:p-0 */}
    <AnimeMovies animes={animes}/>
    </GridContainer>
    </Container>
</div>
  )
}


const AnimeMoviesHeader = ({searchAnime,setSearchAnime,onClick})=>{
    
    return (
        <React.Fragment >
    {/* <img className='max-h-[54em]' src="./images/cap_anime2.png" alt="pic" /> */}
        <h1 className='text-center text-[#735dc2]'>Search an Anime</h1>
        <div className="flex justify-center ">

    <input className='bg-transparent outline-none text-white border-[#9058e9]'  type="text" value={searchAnime} onChange={(e)=>setSearchAnime(e.target.value)} />
    <button className=' hover:opacity-75 p-2 bg-[#50287e] text-white ' onClick={onClick}>Search</button>
        </div>
    {/* <label htmlFor="animeType" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Type</label> */}
{/* <select id="animeType" className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
  <option selected>Anime Type</option>
  <option onChan value={value}>tv</option>
  <option onChan value={value}>Movie</option>
  <option onChan value={value}>OVA</option>
  <option onChan value={value}>Special</option>
  <option onChan value={value}>Ona</option>
  <option onChan value={value}>Music</option>
</select> */}
    {/* <h1 className={ styles.animeMoviesTitle+' text-center'}> <span>Anime </span> Movies</h1> */}
        </React.Fragment>
    )
}


const trimTitle = (text = '')=>{

    if (text.length <= 50 ) return text;
    return text.substring(0,50)+ '..'
 }
const trimDesc = (text = '')=>{

    if (text.length <= 90 ) return text;
    return text.substring(0,90)+ '..'
 }


const AnimeMovies = ({animes})=>{
return (
    <>
    {animes.map(anime=>


<a href={`${anime.url}`} target='_blank' className={styles.animeListMoviesBackgroundBlur +' overflow-hidden shadow-lg transition rounded-lg md:w-80 cursor-pointer mt-3 mb-3 no-underline w-[7em]'}>
     
    <img className={styles.animeListTvSeries +' w-full'} src={anime.images?.webp?.large_image_url} alt={anime.title} />
    <div className=" px-2">
    <h1 className='text-[#f5cb57] text-2xl hover:underline  '>{trimTitle(anime.title)}</h1>
    <p className='text-[#a375e0] text-lg hover:underline  '>{anime.synopsis && trimDesc(anime.synopsis)}</p>
    
   
    <div className="mt-2 flex justify-between">
    {/* <p className='text-[#d9b9f3] font-light text-md'>{anime.score }</p> */}
    <p className='text-[#d9b9f3] font-light text-md'>{anime.status}</p>
    <p className='text-[#d9b9f3] font-light text-md'>{anime.type}</p>
    {anime.score && <RatingStar rating={anime.score} />}
    </div>
 
    </div>
    
    
</a>
           
)}
    </>
)
}



export default GetAnimeByName