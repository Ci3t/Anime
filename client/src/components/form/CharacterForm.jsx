import React from 'react'
import PosterSelector from '../admin/PosterSelector'

function CharacterForm({title,btnTitle}) {
  return (
    <div className='p-3 w-[35rem] bg-white rounded'>
        <div className="flex justify-between items-center mb-2">
            <h1 className='font-semibold text-xl text-main'>{title}</h1>
            <button className='px-3 py-1 bg-main text-white hover:opacity-80 tranisiton' type='submit'>{btnTitle}</button>
        </div>
        <div className="flex space-x-2">
            {/* <img className='w-36 h-36 aspect-square object-cover rounded mr-3' src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVvcGxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=80" alt="a" /> */}
            <PosterSelector className='w-36 h-36 aspect-square object-cover' />
            <div className="flex-grow flex flex-col">
                {/* <input type="text" className='border-b-2' />
                <textarea className='border-b-2 resize-none' ></textarea> */}
                 <input
            type="text"
            // name="title"
            // id="title"
            className="block pt-1 px-0  text-sm text-gray-900 bg-transparent border-b-2 border-t-0 border-x-0 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder="Enter Name..."
            // value={title}
            // onChange={handleChange}
          />
            <textarea
        //   value={description}
        //   onChange={handleChange}
        //   name='description'
        //     id="description"
            className="block pt-3 px-0 h-full text-sm text-gray-900 bg-transparent border-b-2 border-t-0 border-x-0 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 resize-none peer"
            placeholder="Enter About Character..."
          ></textarea>
          
            </div>
        </div>
    </div>

  )
}

export default CharacterForm