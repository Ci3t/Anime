import Navbar from './components/navbar/Navbar';

import './App.css';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import EmailVerification from './components/auth/EmailVerification';
import ForgetPassword from './components/auth/ForgetPassword';
import ConfirmPassword from './components/auth/ConfirmPassword';
import NotFound from './components/NotFound';
import { useAuth } from './hooks/themeHook';
import AdminNav from './components/navigator/AdminNav';


function App() {
const {authInfo} = useAuth()

const isAdmin = authInfo.profile?.role === "admin"
const isMod = authInfo.profile?.role === "moderator"

if(isAdmin) return <AdminNav/>
  
  
  return (
    <>
      <Navbar/>
      
    <Routes>
      <Route path='/' element={<Home/>}/>
      
      <Route path='/auth/signin' element={<SignIn/>}/>
      <Route path='/auth/signup' element={<SignUp/>}/>
      <Route path='/auth/verification' element={<EmailVerification/>}/>
      <Route path='/auth/forget-password' element={<ForgetPassword/>}/>
      <Route path='/auth/reset-password' element={<ConfirmPassword/>}/>
      <Route path='*' element={<NotFound/>}/>
      
    </Routes>
    </>
  );
}

export default App;
