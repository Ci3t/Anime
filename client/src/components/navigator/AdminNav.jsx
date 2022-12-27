import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminHeader from '../admin/AdminHeader'
import AdminNavbar from '../admin/AdminNavbar'
import Animes from '../admin/Animes'
import AnimeUpload from '../admin/AnimeUpload'
import Characters from '../admin/Characters'
import Dashboard from '../admin/Dashboard'
import CharacterUpload from '../modals/CharacterUpload'
import NotFound from '../NotFound'

function AdminNav() {
  const [showAnimeUploadModel,setShowAnimeUploadModel] = useState(false)
  const [showCharUploadModel,setShowCharUploadModel] = useState(false)

  const hideAnimeUploadModel =()=>{
    setShowAnimeUploadModel(false)
  }
  const displayAnimeUploadModel =()=>{
    setShowAnimeUploadModel(true)
  }
  const hideCharUploadModel =()=>{
    setShowCharUploadModel(false)
  }
  const displayCharUploadModel =()=>{
    setShowCharUploadModel(true)
  }
  return (
    <>
    <div className='flex'>
    <AdminNavbar/>
    <div className="flex-1 p-2 max-w-screen-xl">
        <AdminHeader onAddAnimeClick={displayAnimeUploadModel} onAddCharacterClick={displayCharUploadModel} />
    <Routes>
        
    <Route path='/' element={<Dashboard/>}/>
    <Route path='/animes' element={<Animes/>}/>
    <Route path='/characters' element={<Characters/>}/>
    <Route path='*' element={<NotFound/>}/>
    
  </Routes>
    </div>
    </div>
    <AnimeUpload visible={showAnimeUploadModel} onClose={hideAnimeUploadModel} />
    <CharacterUpload visible={showCharUploadModel} onClose={hideCharUploadModel} />
    </>
  )
}

export default AdminNav