import React from 'react'


function Dashboard() {
  
  return (
    <div className='flex items-center justify-between'>
        <input type='text' className='border-2 border-light-subtle focus:border-main transition bg-transparent rounded text-lg p-1 outline-none relative' placeholder='Search Anime...'/>

        <button className='flex items-center space-x-2 border-second hover:border-main text-second hover:opacity-80 transition font-semibold border-2 rounded text-lg px-3'>Create</button>
        
        <div className='absolute right-0 top-12 flex flex-col space-y-3 p-5'>
            <button>Add Anime</button>
            <button>Add Character</button>
        </div>
    </div>
  )
}

export default Dashboard