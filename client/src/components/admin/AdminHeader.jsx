import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import AppSearchForm from "../form/AppSearchForm";

function AdminHeader({onAddAnimeClick,onAddCharacterClick}) {
  const [showOptions, setShowOptions] = useState(false);

const navigate = useNavigate()

  const options = [{ title:'Add Anime',onClick: onAddAnimeClick },{ title:'Add Character',onClick: onAddCharacterClick }];



  const CreateOptions = ({ options, visible, onClose }) => {
 

    const handleClick =(fn)=>{
      fn()
      onClose()
    }
    if (!visible) return null;
    return (
      <div className="absolute right-0 top-12 z-10 flex flex-col space-y-3 p-5 bg-[#2b299c] drop-shadow-lg rounded animate-scale">
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
        className="text-white hover:opacity-80 hover:underline transition"
      >
        {children}
      </button>
    );
  };
  
  const handleSearchSubmit = (query)=>{
    
    if(!query.trim()) return;
    navigate(`/admin/search?title=${query}`);

  }

  return (
    <div className="flex items-center mb-4 justify-between relative">
   
      <AppSearchForm className='text-white' onSubmit={handleSearchSubmit} placeholder='Search Anime...'/>
      <div>

      <button
        onClick={() => {
          setShowOptions(!showOptions);
        }}
        className="flex items-center space-x-2 border-[#2e378d] hover:border-[#f3bc46] hover:text-[#f3bc46] text-[#8daedf] hover:opacity-80 transition font-semibold border-2 rounded text-lg px-3 py-1"
        >
        <span>Create</span>
      </button>

      <CreateOptions
      options={options}
      visible={showOptions}
      onClose={() => {
        setShowOptions(false);
      }}
      />
      </div>
    </div>
  );
}

export default AdminHeader;
