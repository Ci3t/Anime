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
    <nav className={styles.sideNavImg +'  lg:w-48 lg:min-h-screen  border-gray-300 '}>
        <div id='mbSideNav' className={styles.sideNav +" flex lg:flex p-2 lg:flex-col  justify-between pl-3 max-h-20 lg:mb-0 lg:min-h-screen mb-5 lg:h-screen lg:fixed sticky top-0 lg:w-[11.4em] "}>

        <ul className={styles.ulNavAdmin + ' lg:block flex lg:gap-0 gap-4 justify-between'}>
            <li className='mb-8'>
                <Link to='/'>
                    <img src='./images/cap_logo.png' alt='logo' className='sm:h-16 pr-2 pt-2 pl-0 h-10'/>
                </Link>
            </li>
            <li className='mt-3 '>
                <NavItem  to={'/admin/dashboard'}>Home</NavItem>
            </li>
            <li className='mt-3 no-underline'>
                <NavItem to={'/admin/animes'}>Animes</NavItem>
            </li>
            <li className='mt-3 no-underline'>
                <NavItem to={'/admin/characters'}>Characters</NavItem>
            </li>
            <li className='mt-3 no-underline'>
                <NavItem to={'/admin/stats'}>Stats</NavItem>
            </li>
        </ul>

        <div className='flex gap-4 p-2 lg:flex lg:flex-col items-start pb-4'>
            {/* <span className='font-semibold text-white text-xl'>Admin</span> */}
            <button onClick={handleLogOut} className='flex items-center text-white'>Log Out</button>
        </div>
        </div>
    </nav>
  )
}

export default AdminNavbar