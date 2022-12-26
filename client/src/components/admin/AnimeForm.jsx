import React, { useState } from "react";
import Submit from "../form/Submit";
import LiveSearch from "./LiveSearch";
import TagsInput from "./TagsInput";

const results = [
  {
    id: "1",
    avatar:
      "https://plus.unsplash.com/premium_photo-1664202526374-4cb370cbc29f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    name: "John Doe",
  },
  {
    id: "2",
    avatar:
      "https://plus.unsplash.com/premium_photo-1664202526475-8f43ee70166d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    name: "Jane Doe",
  },
  {
    id: "3",
    avatar:
      "https://plus.unsplash.com/premium_photo-1664202526793-fca03a9cab29?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    name: "Jax Doe",
  },
  {
    id: "4",
    avatar:
      "https://plus.unsplash.com/premium_photo-1664202526374-4cb370cbc29f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    name: "Bob Doe",
  },
  {
    id: "5",
    avatar:
      "https://plus.unsplash.com/premium_photo-1664202526475-8f43ee70166d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    name: "Bale Doe",
  },
  {
    id: "6",
    avatar:
      "https://plus.unsplash.com/premium_photo-1664202526793-fca03a9cab29?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    name: "Bane Doe",
  },
];

const defaultAnimeInfo = {
    title:'',
    description:'',
    tags:[],
    cast:[],
    releaseDate:'',
    poster:null,
    genres:[],
    type:'',
    language:'',
    status: ''

}
function AnimeForm() {

    const [animeInfo,setAnimeInfo] = useState({...defaultAnimeInfo})
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(animeInfo);
  };
  const handleChange = ({target}) => {
    const {value,name} = target
    setAnimeInfo({...animeInfo,[name]:value})
  };
  const updateTags = (tags) => {
   
    setAnimeInfo({...animeInfo,tags})
  };

  const renderItem =(result) => {
    return (
      <div
        key={result.key}
        className="flex space-x-2 rounded overflow-hidden"
      >
        <img
          className="w-16 h-16 object-cover"
          src={result.avatar}
          alt={result.name}
        />
        <p className="text-black font-semibold">{result.name}</p>
      </div>
    );
  }


  const {title,description} = animeInfo
  return (
    <form onSubmit={handleSubmit} className="flex space-x-3 ">
      <div className="relative z-0 mb-6  group w-[70%] space-x-3">
        <div>
          <input
            type="text"
            name="title"
            id="title"
            className="block pt-3 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-t-0 border-x-0 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            value={title}
            onChange={handleChange}
          />
          <label
            htmlFor="title"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 pt-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Title
          </label>
        </div>

        <div className="mx-0 space-x-1">
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-black mt-2"
          >
            Description
          </label>
          <textarea
          value={description}
          onChange={handleChange}
          name='description'
            id="description"
            className="block pt-3 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-t-0 border-x-0 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 resize-none peer"
            placeholder="Enter Anime Story..."
          ></textarea>
        </div>

        <TagsInput name="tags" onChange={updateTags} />
        <div>
          <LiveSearch
            results={results}
            renderItem={renderItem}
            name='search'
            onSelect={(result)=>console.log(result)}
          />
        </div>
        <Submit value={'upload'}/>
      </div>
      <div className="w-[30%] h-5 bg-blue-400"></div>
    </form>
  );
}

export default AnimeForm;
