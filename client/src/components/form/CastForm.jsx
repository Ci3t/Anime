import React, { useState } from "react";
import { useNotification } from "../../hooks/themeHook";
import { renderItem, results } from "../admin/AnimeForm";
import LiveSearch from "../admin/LiveSearch";

const defaultCastInfo = {
  profile: {},
  roleAs: "",
  leadChar: false,
};

function CastForm({onSubmit}) {
  const [castInfo, setCastInfo] = useState({ ...defaultCastInfo });

  const {updateNotification} = useNotification()

  const handleOnChange = ({target}) =>{
    const {checked,name,value} = target

    if(name === 'leadChar') return setCastInfo({...castInfo,leadChar:checked})

    setCastInfo({...castInfo,[name]:value});
    
  }
  const handleProfileSelect = (profile) =>{
    

    setCastInfo({...castInfo,profile});

  }
  const handleSubmit = () =>{
    const {  profile, roleAs } = castInfo;

    if(!profile.name) return updateNotification('error','Profile is Missing');
    if(!roleAs.trim()) return updateNotification('error','Role is Missing');

    onSubmit(castInfo);
    setCastInfo({...defaultCastInfo})

    // setCastInfo({...castInfo,profile});

    
    

  }

  const { leadChar, profile, roleAs } = castInfo;
  return (
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        name="leadChar"
        className="w-4 h-4"
        checked={leadChar}
        onChange={handleOnChange}
        title="Set as lead character"
      />

      <LiveSearch value={profile.name} results={results} onSelect={handleProfileSelect} renderItem={renderItem}/>
      <span className="text-light-subtle font-semibold">as</span>

      <div className="flex-grow">
        <input
          type="text"
          name="roleAs"
          // id="roleAs"
          className="block pt-3 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-t-0 border-x-0 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder="Role as..."
          value={roleAs}
          onChange={handleOnChange}
        />
      </div>
      {/* <label
            htmlFor="roleAs"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 bottom-3 pt-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" 
          >Role</label> */}
      <button onClick={handleSubmit} type="button" className="bg-second text-white rounded px-1 mt-3">
        Add
      </button>
    </div>
  );
}

export default CastForm;
