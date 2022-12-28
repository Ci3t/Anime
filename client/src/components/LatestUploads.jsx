import React from 'react'


import AnimeListItem from './AnimeListItem'

function LatestUploads() {
  return (
    <div className="bg-white shadow  p-5 rounded col-span-2">

            <h1 className='text-2xl mb-2 font-semibold'>Recent Uploads</h1>

            <AnimeListItem anime={{poster:"https://images.unsplash.com/photo-1541562232579-512a21360020?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGFuaW1lfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=300&q=80",title:' Lorem ipsum dolor sit amet.',status:'public',genres:['Action','Romance'],}} />
           
    </div>
  )
}



export default LatestUploads