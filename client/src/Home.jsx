import React from 'react'
import Container from './components/Container'
import HeroSlideShow from './components/navbar/HeroSlideShow'
import NotVerified from './components/navbar/NotVerified'
import TopRatedAnime from './components/navbar/TopRatedAnime'
import TopRatedAnimeMovies from './components/navbar/TopRatedAnimeMovies'


function Home() {


  return (
    <div className='bg-white dark:bg-second min-h-screen'>
    <Container className={'px-2 xl:p-0'}>
    
    <NotVerified/>
    <HeroSlideShow/>
    <div className="space-y-3 py-8">
      
    <TopRatedAnime/>
    <TopRatedAnimeMovies/>
    </div>
    </Container>
    </div>
  )
}

export default Home