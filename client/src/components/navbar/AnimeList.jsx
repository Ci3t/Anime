import React from 'react'
import GridContainer from '../GridContainer'

import { Link } from 'react-router-dom';
import RatingStar from '../RatingStar';
import { getPoster } from '../utils/helper';

import styles from  '../style/animelist.module.css'

function AnimeList({title,animes = []}) {


    if(!animes.length) return null;
    return (
        <div >
    
            <h1 className={styles.infoCardAnimeListHomePageTitle +' text-2xl my-4 py-2 font-semibold'}>{title}</h1>
        
        <GridContainer className={'gap-3 '}>

            {animes.map((anime)=>{
             return <ListItem key={anime.id} anime={anime}/>
            })}
        </GridContainer>
        </div>
     
  )
}

const ListItem = ({anime}) =>{

    const trimTitle = (text = '')=>{

        if (text.length <= 17 ) return text;
        return text.substring(0,17)+ '..'
     }

    const {title,poster,responsivePosters,reviews,id} = anime
    return (
        <Link className='no-underline ' to={`/anime/${id}`} >
            
            {/* rounded-lg  */}
        <div className={
            styles.cardAnimeListHomePage +
            '  max-w-sm  shadow-md'
            }>
        <img className={  'aspect-video object-cover w-full rounded-tl-xl '} src={getPoster(responsivePosters) || poster} alt={title} />
            <div className={styles.infoCardAnimeListHomePage + ' py-1 px-2 flex justify-between'}>

        {title ? <h1 className='' title={title}> {trimTitle(title)} </h1> : null}

        <RatingStar rating={reviews.ratingAvg} />
            </div>
        </div>
           
    </Link>
    )
}
export default AnimeList