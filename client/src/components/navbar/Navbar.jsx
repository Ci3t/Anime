import React from 'react'
import {BsFillSunFill} from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth, useTheme } from '../../hooks/themeHook'
import Container from '../Container'
import AppSearchForm from '../form/AppSearchForm'

function Navbar() {

    const {toggleTheme} = useTheme()
    const {authInfo,handleLogOut} = useAuth()
    const {isLoggedIn} = authInfo

    const navigate = useNavigate()

    const handleSearchSubmit = (query)=>{
        navigate('/anime/search?title=' + query)
    }
  return (
    <div className="bg-second">
            <Container className="p-2">
                <div className="flex justify-between items-center">
                    <Link to={'/'}>

                <img src="./images/logo.png" alt="logo" className="sm:h-10 h-8" />
                    </Link>
                <ul className='flex items-center sm:space-x-4 space-x-2'>
                <li>
                    <button onClick={toggleTheme} className='bg-dark-subtle p-1 rounded sm:text-2xl text-lg'>

                    <BsFillSunFill className='text-second' size={24}/>
                    </button>
                    </li>
                    <li>
                        <AppSearchForm placeholder={'Search...'} inputClassName='border-dark-subtle border-white focus:border-white text-white sm:w-auto w-40 sm:text-lg' onSubmit={handleSearchSubmit} />
                    </li>
                    <li >
                       {isLoggedIn? <button onClick={handleLogOut} className="text-white font-semibold-text-lg">Log Out</button> : <Link to={'/auth/signin'} className="text-white font-semibold-text-lg">
                        Login
                        </Link>}
                        </li>
                </ul>
                </div>
            </Container>
        </div>
  )
}

export default Navbar