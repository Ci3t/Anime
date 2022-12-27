import React, { useState } from "react";
import { GiSpinningSword } from "react-icons/gi";
import { useNotification } from "../../hooks/themeHook";
import PosterSelector from "../admin/PosterSelector";
import Selector from "../admin/Selector";

const defaultCharInfo = {
  name: "",
  about: "",
  avatar: null,
  gender:''
};


const genderOptions =
[
    {title:'Male',value:'male'},
    {title:'Female',value:'female'},
    {title:'Other',value:'other'},
]

const validateChar = ({avatar,name,about,gender})=>{
    if(!name.trim()) return {error:'Character name is missing!'}
    if(!about.trim()) return {error:'About Section is empty!'}
    if(!gender.trim()) return {error:'Character gender is missing!'}

    if(avatar && !avatar.type?.startsWith('image')) return {error:'Invalid Image/ avatar file!'}

    return {error:null};
}

function CharacterForm({ title, btnTitle,busy,onSubmit }) {
  const [charInfo, setCharInfo] = useState({ ...defaultCharInfo });
  const [selectedAvatarUI, setSelectedAvatarUI] = useState("");

  const {updateNotification} = useNotification()
  
  const updatePosterUI = (file) => {
    const url = URL.createObjectURL(file)
    setSelectedAvatarUI(url)
  }

  const handleChange = ({ target }) => {
    const { value, files, name } = target;

    if(name === 'avatar') {
        const file = files[0];
        updatePosterUI(file)
        return setCharInfo({...charInfo,avatar:file})
    }

    setCharInfo({...charInfo,[name]:value})
  };

  const handleSubmit = (e)=>{
        e.preventDefault()
        const {error} = validateChar(charInfo)
        if(error) return updateNotification ('error',error)
        const formData = new FormData();
        for(let key in charInfo){
            if(key) formData.append(key,charInfo[key])
        }
        onSubmit(formData)

  }

  const {name,about,gender} = charInfo
  return (
    
      <form onSubmit={handleSubmit} className="p-3 w-[35rem] bg-white rounded">
      <div className="flex justify-between items-center mb-2">
        <h1 className="font-semibold text-xl text-main">{title}</h1>
        <button
          className="h-8 w-24 bg-main text-white hover:opacity-80 tranisiton flex items-center justify-center"
          type="submit"
        >
          {busy ? <GiSpinningSword className='animate-spin'/> :btnTitle }
        </button>
      </div>
        {/* <img className='w-36 h-36 aspect-square object-cover rounded mr-3' src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVvcGxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=80" alt="a" /> */}
        <div className="flex space-x-2">
        <PosterSelector
          name="avatar"
          label='Select Avatar'
          onChange={handleChange}
          selectedPoster={selectedAvatarUI}
          className="w-36 h-36 aspect-square object-cover"
          accept='image/jpg,image/jpeg,image/png'
        />
        <div className="flex-grow flex flex-col">
          {/* <input type="text" className='border-b-2' />
                <textarea className='border-b-2 resize-none' ></textarea> */}
          <input
            type="text"
            name="name"
            value={name}
          onChange={handleChange}
            className="block pt-1 px-0  text-sm text-gray-900 bg-transparent border-b-2 border-t-0 border-x-0 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder="Enter Name..."
            // value={title}
            // onChange={handleChange}
          />
          <textarea
          name="about"
          value={about}
          onChange={handleChange}
            className="block pt-3 px-0 h-full text-sm text-gray-900 bg-transparent border-b-2 border-t-0 border-x-0 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 resize-none peer"
            placeholder="Enter About Character..."
          ></textarea>
        </div>
        </div>
            <div className="">

        <Selector options={genderOptions} label='Gender' value={gender} onChange={handleChange} name={'gender'} />
            </div>
      </form>
   
  );
}

export default CharacterForm;
