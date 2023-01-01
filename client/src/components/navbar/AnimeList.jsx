import React from 'react'
import GridContainer from '../GridContainer'
import {AiFillStar} from 'react-icons/ai'
import { Link } from 'react-router-dom';
import RatingStar from '../RatingStar';
import { getPoster } from '../utils/helper';

function AnimeList({title,animes = []}) {


    if(!animes.length) return null;
    return (
        <div>
    
            <h1 className='text-2xl mb-5 font-semibold'>{title}</h1>
        
        <GridContainer>
            {animes.map((anime)=>{
             return <ListItem key={anime.id} anime={anime}/>
            })}
        </GridContainer>
        </div>
     
  )
}

const ListItem = ({anime}) =>{

    const trimTitle = (text = '')=>{

        if (text.length <= 20 ) return text;
        return text.substring(0,20)+ '..'
     }

    const {title,poster,responsivePosters,reviews,id} = anime
    return (
         <Link to={`/anime/${id}`} >
        <img className='aspect-video object-cover w-full ' src={getPoster(responsivePosters) || poster} alt={title} />
        {title ? <h1 className='text-lg text-second font-semibold' title={title}> {trimTitle(title)} </h1> : null}

        <RatingStar rating={reviews.ratingAvg} />
    </Link>
    )
}
export default AnimeList