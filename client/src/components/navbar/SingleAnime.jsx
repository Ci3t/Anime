import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { getSingleAnime } from "../../api/anime";
import { useAuth, useNotification } from "../../hooks/themeHook";
import Container from "../Container";
import RatingStar from "../RatingStar";
import RelatedAnime from "../RelatedAnime";

const convertReviewCount = (count) => {
  if (count <= 999) return count;

  return parseFloat(count / 1000).toFixed(2) + "k";
};
const convertDate = (date = '') => {
    
    return date.split('T')[0]
};

function SingleAnime() {
  const [ready, setReady] = useState(false);
  const [animes, setAnimes] = useState({});
  const { updateNotification } = useNotification();
  const { animeId } = useParams();
   const { isLoggedIn } = useAuth()

   const navigate = useNavigate()

  const fetchAnime = async () => {
    const { error, anime } = await getSingleAnime(animeId);

    if (error) return updateNotification("error", error);
    setReady(true);
    setAnimes(anime);
  };

  const handleOnRateAnime = ()=>{
    if(!isLoggedIn) return navigate('/auth/signin')
  }

  useEffect(() => {
    if (animeId) fetchAnime();
  }, [animeId]);

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
    genres=[],
  } = animes;
  return (
    <div className="bg-white min-h-screen pb-10 ">
      <Container>
        <video poster={poster} controls src={trailer}></video>
        <div className="flex justify-between">
          <h1 className="text-4xl text-highlight-dark font-semibold py-3">
            {title}
          </h1>
          <div className="flex flex-col items-end">
            <RatingStar rating={reviews.ratingAvg} />
            <Link
              className="text-highlight-dark no-underline hover:underline"
              to={"/anime/reviews/" + id}
            >
              {convertReviewCount(reviews.reviewCount)} Reviews
            </Link>
            <button
              type="button"
              className="text-highlight-dark no-underline hover:underline"
              onClick={handleOnRateAnime}
            >
              {" "}
              Rate Anime
            </button>
          </div>
        </div>
        <div className="">
          <p className="text-light-subtle"> {description} </p>

          <div className="flex ">
            <p className="text-light-subtle mr-2">Cast:</p>
           
          
          <div className="flex space-x-2">
              {cast.map((c) => {
                return c.leadChar ? (
                  <p
                    key={c.profile.id}
                    className="text-highlight-dark hover:underline cursor-pointer"
                  >
                    {" "}
                    {c.profile.name}{" "}
                  </p>
                ) : null;
              })}
            </div>
            </div>
            <div className="flex space-x-2">
                <p className="text-light-subtle font-semibold">
                    Release Date :
                </p>
                <p className="text-highlight-dark">
                    {convertDate(releaseDate)}
                </p>
            </div>
            <div className="flex space-x-2">
                <p className="text-light-subtle font-semibold">
                    Language:
                </p>
                <p className="text-highlight-dark">
                    {language}
                </p>
            </div>
            <div className="flex ">
            <p className="text-light-subtle mr-2">Genres:</p>
           
          
          <div className="flex space-x-2">
              {genres.map((g) => {
                return  (
                  <p
                    key={g}
                    className="text-highlight-dark hover:underline"
                  >
                    {" "}
                    {g}{" "}
                  </p>
                ) 
              })}
            </div>
            </div>
            <div className="flex space-x-2">
                <p className="text-light-subtle font-semibold">
                    Type :
                </p>
                <p className="text-highlight-dark">
                    {type}
                </p>
            </div>
        </div>
        <div className="mt-5">

            <h1 className="font-semibold text-2xl">Characters:</h1>
        <div className="grid grid-cols-12 ">
            {cast.map(c=>{
                return <div key={c.profile.id} className="flex  items-center flex-col">
                    <img className="w-20 h-20 aspect-square object-cover rounded-full" src={c.profile.avatar} alt={c.profile.name} />
                    

                    <p className="hover:underline cursor-pointer text-highlight-dark">{c.profile.name}</p>

                    {c.roleAs ?
                    <span>as</span>: null
                     }
                     <p className="text-light-subtle">{c.roleAs}</p> 
                    </div>
              
            })}
        </div>
            </div>

            <RelatedAnime animeId={animeId}/>
      </Container>
    </div>
  );
}

export default SingleAnime;
