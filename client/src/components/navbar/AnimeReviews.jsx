import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReviewByAnime } from "../../api/review";
import { useNotification } from "../../hooks/themeHook";
import Container from "../Container";
import CustomButtonLink from "../CustomButtonLink";
import RatingStar from "../RatingStar";
const getNameInitial = (name = "") => {
  return name[0].toUpperCase();
};
function AnimeReviews() {

    const [reviews,setReviews] = useState([])
    const {animeId}= useParams()

    const {updateNotification} = useNotification()

    const fetchReviews = async()=>{
      const{reviews,error} = await getReviewByAnime(animeId);

      if(error) return updateNotification('error',error);

      setReviews([...reviews])
    }

    useEffect(() => {
        if(animeId) fetchReviews()
    }, [animeId])
    
  return (
    <div className="pb-10 min-h-screen">
      <Container className="xl:px-0 px-2 py-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">
            <span className="text-red-300">Reviews for :</span>
          </h1>

          <CustomButtonLink label="Find My Review" />
        </div>
        <div className="space-y-3 mt-3">
        {reviews.map(review=> <ReviewCard review={review} key={review.id} />)}
       
        </div>
      </Container>
    </div>
  );
}

const ReviewCard =({review})=>{
    const {owner, content,rating} = review
    return <div className="flex space-x-3">
    <div className="flex items-center justify-center w-14 h-14 rounded-full bg-main select-none">

      {getNameInitial(owner.name)}
    </div>
    <div>
      <h1 className="text-second font-semibold text-lg">{owner.name}</h1>
      <RatingStar rating={rating} />
      <p>
        {content}
        
      </p>
    </div>
  </div>
}
export default AnimeReviews;
