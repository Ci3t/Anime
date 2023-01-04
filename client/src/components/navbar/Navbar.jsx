import React, { useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import { useAuth, useTheme } from '../../hooks/themeHook'
import Container from '../Container'
import AppSearchForm from '../form/AppSearchForm'
import AdminNav from '../navigator/AdminNav'
import { Sling as Hamburger, Sling } from 'hamburger-react'

import styles from '../style/navbar.module.css'

function Navbar() {
    const [toggleMenu,setToggleMenu] = useState(false)
    const {toggleTheme} = useTheme()
    const {authInfo,handleLogOut} = useAuth()
    const {isLoggedIn,profile} = authInfo

//     const isAdmin = authInfo.profile?.role === "admin"
// const isMod = authInfo.profile?.role === "moderator"

// if(isAdmin) return <AdminNav/>

    const navigate = useNavigate()

    const handleSearchSubmit = (query)=>{
        navigate('/anime/search?title=' + query)
    }

    const handleAdminPanel = ()=>{
        if(profile?.role === 'admin') return <AdminNav/>
    }
  return (
    <div className={styles.backgroundImageForNav +" "}>
        <div className={styles.backgroundForNav}>
            <Container className="p-2">
                <div className="flex justify-between items-center">
                    <Link to={'/'}>

                <img src="./images/Cap_logo.png" alt="logo" className="sm:h-16 h-12" />
                    </Link>
                <ul className='flex items-center sm:space-x-4 space-x-2'>
                <li>
                {/* onClick={toggleTheme} */}
                    <div type='button' onClick={()=>setToggleMenu(!toggleMenu)} className={' p-1 rounded sm:text-2xl text-lg text-[#fac156] '}>
                      
                      <Sling toggled={toggleMenu} toggle={setToggleMenu}/>
                    </div>
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
            <div className={styles.bgColor2ndNav +' flex'}>
               {toggleMenu &&
              

               <Container className={styles.navbarAnimation }>
                    <ul className='flex space-x-6'>
                    <li>
                    {profile?.role === 'admin' ? <Link to='/admin/dashboard' className={styles.menuText} >Admin Panel</Link>:null}
                    </li>
                    <li>
                    <Link to='/anime/tv-series' className={styles.menuText} >Anime Series</Link>
                    </li>
                    <li>
                    <Link to='/anime/movies' className={styles.menuText}  >Anime Movies</Link>
                    </li>
                    <li>
                    <Link to='/anime/search-anime' className={styles.menuText}  >Find Anime</Link>
                    </li>
                    <li>
                    <Link to='/anime/search-manga' className={styles.menuText}  >Find Manga</Link>
                    </li>
                    </ul>
                </Container>
             }
            </div>
        </div>
  )
}

export default Navbar