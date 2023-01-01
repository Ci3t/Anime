import Navbar from './components/navbar/Navbar';

import './App.css';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './Home';
import EmailVerification from './components/auth/EmailVerification';
import ForgetPassword from './components/auth/ForgetPassword';
import ConfirmPassword from './components/auth/ConfirmPassword';
import NotFound from './components/NotFound';
import { useAuth } from './hooks/themeHook';
import AdminNav from './components/navigator/AdminNav';
import SingleAnime from './components/navbar/SingleAnime';
import AnimeReviews from './components/navbar/AnimeReviews';
import AnimeSearch from './components/navbar/AnimeSearch';
import AnimeListTV from './components/AnimeListTV';
import AnimeListMovies from './components/AnimeListMovies';




function App() {

  const location = useLocation()
const {authInfo} = useAuth()

const isAdmin = authInfo.profile?.role === "admin"
const isMod = authInfo.profile?.role === "moderator"

// if(isAdmin) return <AdminNav/>
  //  { isAdmin? <Route path='/admin' element={<AdminNav/>}/> : null}
  
  const excludedRoutes = ['/admin/dashboard', '/admin/animes','/admin/characters','/admin/search','/admin/','/admin/*'];
  
  return (
    <>
       
       {!excludedRoutes.includes(location.pathname) && <Navbar />}
      <Routes>
      { isAdmin? <Route path='/admin/*' element={<AdminNav/>}/> : null}
      <Route path='/' element={<Home/>}/>
      <Route path='/auth/signin' element={<SignIn/>}/>
      <Route path='/auth/signup' element={<SignUp/>}/>
      <Route path='/auth/verification' element={<EmailVerification/>}/>
      <Route path='/auth/forget-password' element={<ForgetPassword/>}/>
      <Route path='/auth/reset-password' element={<ConfirmPassword/>}/>
      <Route path='/anime/:animeId' element={<SingleAnime/>}/>
      <Route path='/anime/reviews/:animeId' element={<AnimeReviews/>}/>
      <Route path='/anime/search' element={<AnimeSearch/>}/>
      <Route path='/anime/tv-series' element={<AnimeListTV/>}/>
      <Route path='/anime/movies' element={<AnimeListMovies/>}/>
      <Route path='*' element={<NotFound/>}/>

      </Routes>
   {/* <Route element={<NormalRoutes/>}/> */}
      
    
   {/* {isAdmin? <Route path='/admin/*' element={<AdminNav/>}/> : null} */}


      {/* <Navbar/>
      <Route path='/' element={<Home/>}/>
      <Route path='/auth/signin' element={<SignIn/>}/>
      <Route path='/auth/signup' element={<SignUp/>}/>
      <Route path='/auth/verification' element={<EmailVerification/>}/>
      <Route path='/auth/forget-password' element={<ForgetPassword/>}/>
      <Route path='/auth/reset-password' element={<ConfirmPassword/>}/>
      <Route path='/anime/:animeId' element={<SingleAnime/>}/>
      <Route path='/anime/reviews/:animeId' element={<AnimeReviews/>}/>
      <Route path='/anime/search' element={<AnimeSearch/>}/>
      
      <Route path='*' element={<NotFound/>}/>

    </Routes>
       */}
    {/* </Routes> */}
    </>
  );
}

// {isAdmin? <Route path='/admin/*' element={<AdminNav/>}/> : null}



export default App;
