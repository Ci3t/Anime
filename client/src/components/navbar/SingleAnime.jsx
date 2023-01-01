import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { getSingleAnime } from "../../api/anime";
import { useAuth, useNotification } from "../../hooks/themeHook";
import Container from "../Container";
import CustomButtonLink from "../CustomButtonLink";
import AddRatingModal from "../modals/AddRatingModal";
import ProfileModal from "../modals/ProfileModal";
import RatingStar from "../RatingStar";
import RelatedAnime from "../RelatedAnime";
import { convertReviewCount } from "../utils/helper";



const convertDate = (date = "") => {
  return date.split("T")[0];
};

function SingleAnime() {
  const [ready, setReady] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState({});
  const [animes, setAnimes] = useState({});
  const { updateNotification } = useNotification();
  const { animeId } = useParams();
  const { authInfo } = useAuth();
  const { isLoggedIn } = authInfo;

  const navigate = useNavigate();

  const fetchAnime = async () => {
    const { error, anime } = await getSingleAnime(animeId);

    if (error) return updateNotification("error", error);
    setReady(true);
    setAnimes(anime);
  };

  const handleOnRateAnime = () => {
    if (!isLoggedIn) return navigate("/auth/signin");

    setShowRatingModal(true);
  };
  const hideRatingModal = () => setShowRatingModal(false);
  const handleOnRatingSuccess = (reviews) => {
    setAnimes({ ...animes, reviews: { ...reviews } });
  };

  const handleProfileClick =(profile)=>{
      setSelectedProfile(profile)
      setShowProfileModal(true)
      
    }
    console.log(animes.cast);
  const hideProfileModal =()=> setShowProfileModal(false)

 
  useEffect(() => {
    if (animeId) fetchAnime();
  }, [animeId, animes]);

  if (!ready)
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <p className="text-light-subtle animate-pulse">Please Wait...</p>
      </div>
    );

  const {
    trailer,
    poster,
    title,
    id,
    description,
    language,
    releaseDate,
    type,
    reviews = {},
    cast = [],
    genres = [],
  } = animes;
  return (
    <div className="bg-white min-h-screen pb-10 ">
      <Container className='xl:px-0 px-2'>
        <video poster={poster} controls src={trailer}></video>
        <div className="flex justify-between">
          <h1 className="xl:text-4xl lg:text-3xl text-2xl  text-highlight-dark font-semibold py-3">
            {title}
          </h1>
          <div className="flex flex-col items-end">
            <RatingStar rating={reviews.ratingAvg} />
            <CustomButtonLink
              label={convertReviewCount(reviews.reviewCount) + "Reviews"}
              onClick={() => navigate("/anime/reviews/" + id)}
            />
            <CustomButtonLink label="Rate Anime" onClick={handleOnRateAnime} />

            {/* <button
              type="button"
              className="text-highlight-dark no-underline hover:underline"
              onClick={handleOnRateAnime}
            >
              {" "}
              Rate Anime
            </button> */}
          </div>
        </div>
        <div className="">
          <p className="text-light-subtle"> {description} </p>

          
            <ListWithLabel label="Cast">
              {cast.map(({ id, profile, leadChar }) => {
                return leadChar ? (
                  <CustomButtonLink label={profile.name} key={id} onClick={()=>handleProfileClick(profile)}   />
                ) : null;
              })}
            </ListWithLabel>
              
            <ListWithLabel label="Release Date:">
                  <CustomButtonLink label={convertDate(releaseDate)} clickable={false} />
            </ListWithLabel>
            <ListWithLabel label="Language:">
                  <CustomButtonLink label={language} clickable={false} />
            </ListWithLabel>
            <ListWithLabel label="Genres:">
                <div className="flex flex-wrap space-x-3">

            {genres.map((g) => <CustomButtonLink label={g} key={g} clickable={false} /> )}
                </div>
            
            </ListWithLabel>
            <ListWithLabel label="Type:">
                  <CustomButtonLink label={type} clickable={false} />
            </ListWithLabel>
          
              <CastProfiles cast={cast}   />
             
       
        <RelatedAnime animeId={animeId} />
        </div>
        

      </Container>
      <ProfileModal
        profileId={selectedProfile.id}
        visible={showProfileModal}
        onClose={hideProfileModal }
      />
      <AddRatingModal
        onSuccess={handleOnRatingSuccess}
        visible={showRatingModal}
        onClose={hideRatingModal}
      />
    </div>
  );
}

const ListWithLabel = ({ children, label }) => {
  return (
    <div className="flex space-x-2 items-start">
      <p className="text-light-subtle font-semibold">{label}</p>
      {children}
    </div>
  );
};

const CastProfiles = ({cast,onClick})=>{
  
    return <div className="">
    <h1 className="font-semibold text-2xl">Characters:</h1>
    <div className="flex flex-wrap space-x-3">
      {cast.map(({profile,id,roleAs}) => {
        return (
          <div key={profile.id} className="basis-28 flex items-center flex-col text-center mb-4">
            <img
              className="w-20 h-20 aspect-square object-cover rounded-full"
              src={profile.avatar}
              alt={profile.name}
            />
            <CustomButtonLink label={profile.name}  />
           
            {roleAs ? <span>as</span> : null}
            <p className="text-light-subtle">{roleAs}</p>
          </div>
        );
      })}
    </div>
  </div>
}
export default SingleAnime;
