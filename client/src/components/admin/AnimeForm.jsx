import React from 'react'
import TagsInput from './TagsInput'

function AnimeForm() {
    const handleSubmit =(e)=>{
        e.preventDefault()
    }
  return (
    
    <form onSubmit={handleSubmit} className='flex space-x-3 '>
       <div className="relative z-0 mb-6  group w-[70%] space-x-3">

        <div>

      <input type="text" name='title'  id="title" className="block pt-3 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-t-0 border-x-0 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
      <label htmlFor="title" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 pt-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Title</label>
      
  
        </div>

      
    <div className='mx-0 space-x-1'>

    
      <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black mt-2">Description</label>
<textarea id="description"  className="block pt-3 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-t-0 border-x-0 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 resize-none peer"  placeholder="Enter Anime Story..."></textarea>
 
    </div>
        <TagsInput/>
     </div>
        <div className="w-[30%] h-5 bg-blue-400"></div>
    </form>
  )
}

export default AnimeForm