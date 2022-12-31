import React from 'react'
import Container from './components/Container'
import NotVerified from './components/navbar/NotVerified'
import TopRatedAnime from './components/navbar/TopRatedAnime'


function Home() {


  return (
    <div className='bg-white min-h-screen'>
    <Container>
    
    <NotVerified/>

    <TopRatedAnime/>
    </Container>
    </div>
  )
}

export default Home