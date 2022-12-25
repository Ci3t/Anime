import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminNavbar from '../admin/AdminNavbar'
import Animes from '../admin/Animes'
import Characters from '../admin/Characters'
import Dashboard from '../admin/Dashboard'
import NotFound from '../NotFound'

function AdminNav() {
  return (
    <div className='flex'>
    <AdminNavbar/>
    <div className="flex-1 p-2 max-w-screen-xl">

    <Routes>
        
    <Route path='/' element={<Dashboard/>}/>
    <Route path='/animes' element={<Animes/>}/>
    <Route path='/characters' element={<Characters/>}/>
    <Route path='*' element={<NotFound/>}/>
    
  </Routes>
    </div>
    </div>
  )
}

export default AdminNav