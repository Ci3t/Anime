import React, { useEffect, useRef, useState } from "react";
import "./tagsInput.css";
import {AiOutlineClose} from 'react-icons/ai'

function TagsInput({name,onChange,value}) {
    const [tag ,setTag] = useState('')
    const [tags ,setTags] = useState([])

    const inputRef = useRef()
    const tagsInput = useRef()

    const handleOnChange = ({target})=>{
        const {value} = target
        
        if(value !== ',') setTag(value)

        onChange(tags);
    }
    const removeTag = (removeTag)=>{
        
        const newTags = tags.filter((tag)=>tag !==removeTag)
        setTags([...newTags])
    }

    const handleKeyDown = ({key})=>{
        
        if(key === ',' || key ==='Enter'){
            if(!tag) return ;

            if(tags.includes(tag)) return setTag('');

            setTags([...tags, tag]);
            setTag('')
        }

        if(key === 'Backspace' && !tag && tags.length){
            const newTags = tags.filter((_,index)=>index !==tags.length -1)
            setTags([...newTags])
        }

    }

    const handleOnFocus =()=>{
        tagsInput.current.classList.remove('TagsInputContainerBlurColor')
        tagsInput.current.classList.add('TagsInputContainerFocusColor')
    }
    const handleOnBlur =()=>{
        tagsInput.current.classList.add('TagsInputContainerBlurColor')
        tagsInput.current.classList.remove('TagsInputContainerFocusColor')
    }
    useEffect(()=>{
        if(value) setTags(value)
    },[value])

    useEffect(()=>{
        inputRef.current?.scrollIntoView(false)
    },[tag])

    const Tag = ({children,onClick}) =>{
       return (
        <span className=" bg-gray-700 text-white text-sm whitespace-nowrap ">{children}
        <button type="button" onClick={onClick}>
            <AiOutlineClose size={12}/>
        </button>
        </span>
       )
    }
  return (

    <div className="mt-3">
        Tags
      <div 
      ref={tagsInput}
      
      onKeyDown={handleKeyDown} className="TagsInputContainer TagsInputContainerBlurColor flex items-center space-x-2 px-2  overflow-x-auto custom-scroll-bar transition">
       {tags.map(t=> <Tag onClick={()=>removeTag(t)} key={t}>{t}</Tag>)}
        <input ref={inputRef} type="text" className="TagsInputField outline-none " placeholder="Tag 4, Tag 5"
        value={tag}
        onChange ={handleOnChange}
        onFocus={handleOnFocus}
      onBlur={handleOnBlur}
         />
        
      </div>
    </div>
  );
}

export default TagsInput;
