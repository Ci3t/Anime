import React, { useEffect, useState } from "react";
import { useNotification, useSearch } from "../../hooks/themeHook";
import CastForm from "../form/CastForm";
import Submit from "../form/Submit";
import LabelWithBadge from "../LabelWithBadge";
import CastModel from "../modals/CastModel";
import GenresModal from "../modals/GenresModal";
import ModalContainer from "../modals/ModalContainer";
import { genres } from "../utils/genres";
import { languageOptions, statusOptions, typeOptions } from "../utils/options";
import { validateAnime } from "../utils/validator";
import ViewAllBtn from "../ViewAllBtn";
import GenresSelector from "./GenresSelector";
import LiveSearch from "./LiveSearch";
import PosterSelector from "./PosterSelector";
import Selector from "./Selector";
import TagsInput from "./TagsInput";
import styles from '../style/appInfoBox.module.css'
const classBlur = styles.blurAppInfo


export const renderItem =(result) => {
    return (
      <div
        key={result.id}
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


function AnimeForm({onSubmit,initialState,busy,btnTitle}) {

    const [animeInfo,setAnimeInfo] = useState({...defaultAnimeInfo})
    const [showCastModal,setShowCastModal] = useState(false)
    const [showModal,setShowModal] = useState(false)
    const [showGenresModal,setShowGenresModal] = useState(false)
    const [selectedPosterUI,setSelectedPosterUI] = useState('')

  const {updateNotification} = useNotification()

  
  const handleSubmit = (e) => {
    e.preventDefault();
   const {error} = validateAnime(animeInfo);
   if(error) return updateNotification('error',error);
   
   const {tags,genres,cast,poster} = animeInfo
   const formData = new FormData();
   
   const finalAnimeInfo = {
     ...animeInfo,
    }
    finalAnimeInfo.tags = JSON.stringify(tags)
    finalAnimeInfo.genres = JSON.stringify(genres)
    
    const finalCast = cast.map(c=>({
      character:c.profile.id,
      roleAs:c.roleAs,
      leadChar:c.leadChar
    }))
    finalAnimeInfo.cast = JSON.stringify(finalCast)
    
    if(poster) finalAnimeInfo.poster = poster

    for(let key in finalAnimeInfo){
      formData.append(key,finalAnimeInfo[key])
      console.log(finalAnimeInfo[key] );
    }


   onSubmit(formData);
  };

  const updatePosterUI = (file) => {
    const url = URL.createObjectURL(file)
    setSelectedPosterUI(url)
  }
  const handleChange = ({target}) => {
    const {value,name,files} = target

    if(name === 'poster'){
      const poster = files[0]
      updatePosterUI(poster)
     return setAnimeInfo({...animeInfo,poster})
    }
    setAnimeInfo({...animeInfo,[name]:value})
  };
  const updateTags = (tags) => {
   
    setAnimeInfo({...animeInfo,tags})
  };
  const updateCast = (castInfo) => {
   const {cast} = animeInfo
    setAnimeInfo({...animeInfo,cast:[...cast,castInfo]})
  };
  const updateGenres = (genres) => {
 
    setAnimeInfo({...animeInfo,genres})
  };
  const hideCastModel = () => {
    setShowCastModal(false)
    
};
const displayCastModel = () => {
      setShowCastModal(true)
 
  };
  const hideGenresModel = () => {
    setShowGenresModal(false)
    
};
const displayGenresModel = () => {
    setShowGenresModal(true)
 
  };
const handleCharacterRemove = (profileId) => {
      const {cast} = animeInfo
      const newCast = cast.filter(({profile})=> profile.id !== profileId);
      if(!newCast.length) hideCastModel()
      setAnimeInfo({...animeInfo,cast:[...newCast]})
 
  };

  useEffect(()=>{
    if(initialState){
      setAnimeInfo({...initialState,releaseDate:initialState.releaseDate.split('T')[0],poster:null})
      setSelectedPosterUI(initialState.poster)
    }
  },[initialState])

  const {title,description,cast,tags,genres,type,language,status,releaseDate} = animeInfo
  return (
    <>
   
    <div  className={classBlur +" flex space-x-3 "}>
      <div className="relative z-0 mb-6  group w-[70%] space-x-3">
        <div>
          <input
            type="text"
            name="title"
            id="title"
            className="block pt-3 px-2 w-full text-sm text-white bg-transparent border-b-2 border-t-0 border-x-0 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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
            className="block mb-2 text-sm font-medium text-[#90bee4]  mt-2"
          >
            Description
          </label>
          <textarea
          value={description}
          onChange={handleChange}
          name='description'
            id="description"
            className="block pt-3 px-0 w-full text-sm text-white bg-transparent border-b-2 border-t-0 border-x-0 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 resize-none peer"
            placeholder="Enter Anime Story..."
          ></textarea>
          {/* <button type="button" onClick={()=>setShowModal(true)}>Close</button> */}
        </div>

        <TagsInput value={tags} name="tags" onChange={updateTags} />

       
        {/* <div>
          <LiveSearch
            results={results}
            renderItem={renderItem}
            name='search'
            onSelect={(result)=>console.log(result)}
          />
        </div> */}
        <div className="mt-3 text-white">

        <LabelWithBadge  badge={cast.length} >Add Characters</LabelWithBadge>
        <ViewAllBtn onClick={displayCastModel} visible={cast.length}>ViewAll</ViewAllBtn>
        <CastForm onSubmit={updateCast}/>
        </div>
        <input type="date" className="border-2 rounded p-1 w-auto mt-3 mb-2" onChange={handleChange} name='releaseDate' value={releaseDate} />
        <Submit busy={busy} onClick={handleSubmit} value={btnTitle} type={'button'} />
      </div>
      <div className="w-[30%] h-5 ">
        <PosterSelector name='poster' label='Select Poster' onChange={handleChange} selectedPoster={selectedPosterUI} accept='image/jpg,image/jpeg,image/png image/webp' />

        <GenresSelector badge={genres.length} onClick={displayGenresModel}/>

        <Selector value={type} name='type' onChange={handleChange} options={typeOptions} label='Type'/>
        <Selector value={language} name='language' onChange={handleChange} options={languageOptions} label='Language'/>
        <Selector value={status} name='status' onChange={handleChange} options={statusOptions} label='Status'/>

      </div>
    </div>

    <CastModel
    onClose={hideCastModel}
    visible={showCastModal}
    cast={cast}
    onRemoveClick={handleCharacterRemove}
    />

    <GenresModal
    visible={showGenresModal}
    onClose={hideGenresModel}
    onSubmit={updateGenres}
    previousSelection={genres}
    />

    <ModalContainer visible={showModal} onClose={()=>setShowModal(false)} >
        <div className="p-20 "></div>
    </ModalContainer>
    </>
  );
}



export default AnimeForm;
