import React, { useEffect, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

import Submit from "./Submit";

import styles from '../style/ratingForm.module.css'

const createArray = (count) =>{
    return new Array(count).fill("");
}

const ratings = createArray(10)

function RatingForm({busy,initialState,onSubmit}) {
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [content, setContent] = useState('');

  const handleMouseEnter = (index) => {
    const ratings = createArray(index+1)
    setSelectedRatings([...ratings]);
  };
  const handleOnChange = ({target})=>{
    setContent(target.value)
  }
  const handleSubmit = ()=>{
    if(!selectedRatings.length) return;

    const data = {
        rating: selectedRatings.length,
        content
    }

    onSubmit(data)
  }

  useEffect(()=>{
    if(initialState){
        setContent(initialState.content)
        setSelectedRatings(createArray(initialState.rating))
    }
  },[initialState])
  return (
    <div >
      <div className={styles.ratingFormBg + " p-5 rounded space-y-3"}>
        <div className="text-highlight-dark flex items-center relative">
         <StarsOutlined ratings={ratings} onMouseEnter={handleMouseEnter}/>
        <div className="flex items-center absolute top-1/2 -translate-y-1/2">
        <StarsFilled ratings={selectedRatings} onMouseEnter={handleMouseEnter}/>
        </div>
        </div>
      

        <textarea value={content} onChange={handleOnChange} className="w-full h-24 border-2 p-2 text-highlight-dark rounded outline-none bg-transparent resize-none"></textarea>

        <Submit busy={busy} className={styles.submitButtonRateForm} onClick={handleSubmit} value="Rate This Anime" />
      </div>
    </div>
  );
}

const StarsOutlined = ({ratings, onMouseEnter})=>{
    return  ratings.map((_, index) => {
        return (
          <AiOutlineStar
            onMouseEnter={() =>  onMouseEnter(index)}
            className="cursor-pointer"
            key={index}
            size={24}
          />
        );
      })
}
const StarsFilled = ({ratings, onMouseEnter})=>{
    return ratings.map((_, index) => {
        return (
          <AiFillStar
            onMouseEnter={() => onMouseEnter(index)}
            className="cursor-pointer"
            key={index}
            size={24}
          />
        );
      })
}

export default RatingForm