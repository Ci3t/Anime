import React, { useState } from 'react'
import './tagsInput.css'

const result = [
    {
        id:"1",
        avatar:"https://plus.unsplash.com/premium_photo-1664202526374-4cb370cbc29f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
        name:"John Doe"
    },
    {
        id:"2",
        avatar:"https://plus.unsplash.com/premium_photo-1664202526475-8f43ee70166d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
        name:"Jane Doe"
    },
    {
        id:"3",
        avatar:"https://plus.unsplash.com/premium_photo-1664202526793-fca03a9cab29?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
        name:"Jax Doe"
    },
    {
        id:"4",
        avatar:"https://plus.unsplash.com/premium_photo-1664202526374-4cb370cbc29f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
        name:"Bob Doe"
    },
    {
        id:"5",
        avatar:"https://plus.unsplash.com/premium_photo-1664202526475-8f43ee70166d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
        name:"Bale Doe"
    },
    {
        id:"6",
        avatar:"https://plus.unsplash.com/premium_photo-1664202526793-fca03a9cab29?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
        name:"Bane Doe"
    },
]

function LiveSearch() {

    const [displaySearch,setDisplaySearch] = useState(false)
    const [focusIndex,setFocusIndex] = useState(-1)

    const handleOnFocus = ()=>{
        if(result.length) setDisplaySearch(true);
    }
    const handleOnBlur = ()=>{
        setDisplaySearch(false);
    }
    const handleKeyDown= ({key})=>{
        let nextCount;
        const keys = ['ArrowDown','ArrowUp','Enter','Escape']

        console.log(key);
        if(!keys.includes(key)) return;

        //Handle Selection up and down

        if(key ==='ArrowDown'){
            nextCount = (focusIndex + 1) % result.length
            
        }
        if(key ==='ArrowUp'){
            
            nextCount =  (focusIndex + result.length -1 ) % result.length
        }

        setFocusIndex(nextCount)
    }
    console.log(focusIndex);
  return (
    <div className='relative'>
       <input onKeyDown={handleKeyDown} onBlur={handleOnBlur} onFocus={handleOnFocus} type="text" name="search" id="search" className="block pt-3 px-0  text-sm text-gray-900 bg-transparent border-b-2 border-t-0 border-x-0 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
        <label htmlFor="search" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 bottom-3 pt-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3">Search Profile</label>

       <SearchResult focusIndex={focusIndex} visible={displaySearch} results={result}/>
    
    </div>
  )
}

const SearchResult =({visible,results = [],focusIndex})=>{


    if(!visible) return null;
return (
    <div className="absolute right-0 left-0 top-10 bg-white shadow-md mt-1 space-y-2 p-2 max-h-64 overflow-auto pMargin-0 custom-scroll-bar">
    {result.map(({id,name,avatar},index)=>{

       return (

        <div key={id} className={`${index ===focusIndex? 'bg-blue-300':''} cursor-pointer rounded overflow-hidden hover:bg-dark-subtle hover:flex transition flex space-x-2`}>
           <img src={avatar} alt={name} className='w-16 h-16 rounded object-cover'/>

           <p className='text-black font-semibold'>{name}</p>
           </div>
   )

    })}
   </div>
)
}

export default LiveSearch