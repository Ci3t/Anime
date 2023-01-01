import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../../hooks/themeHook'

function AdminNavbar() {
    const NavItem = ({children,to})=>{
        return(
            <NavLink className={({isActive})=>isActive?'text-white':'text-gray-400'} to={to}>{children}</NavLink>
        )
    }
    
    const {handleLogOut} = useAuth()
     
  return (
    <nav className='w-48 min-h-screen bg-slate-900 border-r border-gray-300 '>
        <div className="flex flex-col justify-between pl-5 h-screen sticky top-0">

        <ul >
            <li className='mb-8'>
                <Link to='/'>
                    <img src='./images/logo.png' alt='logo' className='h-14 p-2'/>
                </Link>
            </li>
            <li className='mb-8'>
                <NavItem to={'/admin/dashboard'}>Home</NavItem>
            </li>
            <li className='mb-8'>
                <NavItem to={'/admin/animes'}>Animes</NavItem>
            </li>
            <li className='mb-8'>
                <NavItem to={'/admin/characters'}>Characters</NavItem>
            </li>
        </ul>

        <div className='flex flex-col items-start'>
            <span className='font-semibold text-white text-xl'>Admin</span>
            <button onClick={handleLogOut} className='flex items-center text-white'>Log Out</button>
        </div>
        </div>
    </nav>
  )
}

export default AdminNavbar