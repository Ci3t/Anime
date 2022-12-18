import React from 'react'
import {BsFillSunFill} from 'react-icons/bs'
import { Link } from 'react-router-dom'
import Container from '../Container'

function Navbar() {
  return (
    <div className="bg-second">
            <Container className="p-2">
                <div className="flex justify-between items-center">
                    <Link to={'/'}>

                <img src="./images/logo.png" alt="logo" className="h-10" />
                    </Link>
                <ul className='flex items-center space-x-4'>
                <li>
                    <button className='bg-dark-subtle p-1 rounded'>

                    <BsFillSunFill className='text-second' size={24}/>
                    </button>
                    </li>
                    <li>
                        <input type="text" className='border-2 border-dark-subtle focus:border-white outline-none p-1 rounded bg-transparent text-xl transition text-white' placeholder='Search...'/>
                    </li>
                    <li >
                        <Link to={'/auth/signin'} className="text-white font-semibold-text-lg">
                        Login
                        </Link>
                        </li>
                </ul>
                </div>
            </Container>
        </div>
  )
}

export default Navbar