import React, { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import AppSearchForm from "../form/AppSearchForm";

function AdminHeader({onAddAnimeClick,onAddCharacterClick}) {
  const [showOptions, setShowOptions] = useState(false);

const navigate = useNavigate()

  const options = [{ title:'Add Anime',onClick: onAddAnimeClick },{ title:'Add Character',onClick: onAddCharacterClick }];

  console.log(showOptions);

  const CreateOptions = ({ options, visible, onClose }) => {
    // const container = useRef()
    // useEffect(()=>{
    //     const handleClose = (e)=>{
    //         console.log(e.target);

    //         if(!visible) return

    //        container.current.classList.remove("animate-scale")
    //        container.current.classList.add("animate-scale-reverse");

    //     };

    //     document.addEventListener('click',handleClose);
    //     return ()=>{
    //         document.removeEventListener('click',handleClose);

    //     }
    // },[visible])

    // ref={container}

    const handleClick =(fn)=>{
      fn()
      onClose()
    }
    if (!visible) return null;
    return (
      <div className="absolute right-0 top-12 flex flex-col space-y-3 p-5 dark:bg-main bg-main drop-shadow-lg rounded animate-scale">
        {options.map(({title,onClick})=>{
            return <Option key={title} onClick={()=>handleClick(onClick)}>{title}</Option>
        })}
      </div>
    );
  };
  const Option = ({ children, onClick }) => {
    return (
      <button
        onClick={onClick}
        className="dark:text-white text-second hover:opacity-80 transition"
      >
        {children}
      </button>
    );
  };
  
  const handleSearchSubmit = (query)=>{
    
    if(!query.trim()) return;
    navigate(`/search?title=${query}`);

  }

  return (
    <div className="flex items-center justify-between">
   
      <AppSearchForm onSubmit={handleSearchSubmit} placeholder='Search Anime...'/>
      <button
        onClick={() => {
          setShowOptions(!showOptions);
        }}
        className="flex items-center space-x-2 border-second hover:border-main text-second hover:opacity-80 transition font-semibold border-2 rounded text-lg px-3 py-1"
      >
        Create
      </button>

      <CreateOptions
      options={options}
        visible={showOptions}
        onClose={() => {
          setShowOptions(false);
        }}
      />
    </div>
  );
}

export default AdminHeader;
