import Navbar from './components/navbar/Navbar';

import './App.css';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import EmailVerification from './components/auth/EmailVerification';
import ForgetPassword from './components/auth/ForgetPassword';
import ConfirmPassword from './components/auth/ConfirmPassword';


function App() {

  
  
  return (
    <>
      <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      
      <Route path='/auth/signin' element={<SignIn/>}/>
      <Route path='/auth/signup' element={<SignUp/>}/>
      <Route path='/auth/verification' element={<EmailVerification/>}/>
      <Route path='/auth/forget-password' element={<ForgetPassword/>}/>
      <Route path='/auth/confirm-password' element={<ConfirmPassword/>}/>
      
    </Routes>
    </>
  );
}

export default App;
