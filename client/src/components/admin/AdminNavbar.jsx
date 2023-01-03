import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../../hooks/themeHook'

import styles from '../style/adminNavbar.module.css'

function AdminNavbar() {
    const NavItem = ({children,to,className})=>{
        return(
            <NavLink className={({isActive})=>isActive?'text-highlight-dark':'text-purple-400 ' + className} to={to}>{children}</NavLink>
        )
    }
    
    const {handleLogOut} = useAuth()
     
  return (
    <nav className={styles.sideNavImg +' w-48 min-h-screen  border-gray-300 '}>
        <div className={styles.sideNav +" flex flex-col justify-between pl-3  h-screen sticky top-0"}>

        <ul className={styles.ulNavAdmin}>
            <li className='mb-8'>
                <Link to='/'>
                    <img src='./images/cap_logo.png' alt='logo' className='sm:h-16 pr-2 pt-2 pl-0 h-10'/>
                </Link>
            </li>
            <li className='mb-8 '>
                <NavItem  to={'/admin/dashboard'}>Home</NavItem>
            </li>
            <li className='mb-8 no-underline'>
                <NavItem to={'/admin/animes'}>Animes</NavItem>
            </li>
            <li className='mb-8 no-underline'>
                <NavItem to={'/admin/characters'}>Characters</NavItem>
            </li>
        </ul>

        <div className='flex flex-col items-start pb-4'>
            <span className='font-semibold text-white text-xl'>Admin</span>
            <button onClick={handleLogOut} className='flex items-center text-white'>Log Out</button>
        </div>
        </div>
    </nav>
  )
}

export default AdminNavbar