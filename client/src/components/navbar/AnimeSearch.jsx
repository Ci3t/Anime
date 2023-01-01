import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchPublicAnime } from "../../api/anime";


import { useNotification } from "../../hooks/themeHook";
import Container from "../Container";

import NotFoundText from "../NotFoundText";
import AnimeList from "./AnimeList";

function AnimeSearch() {
  const [animes, setAnimes] = useState([]);
  const [resultsNotFound, setResultsNotFound] = useState(false);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("title");

  const { updateNotification } = useNotification();

  const searchAnimes = async (val) => {
    const { error, results } = await searchPublicAnime(val);
    if (error) return updateNotification("error", error);
    if (!results.length) {
      setResultsNotFound(true);
      return setAnimes([]);
    }
    setResultsNotFound(false);
    setAnimes([...results]);
  };

  const handleAfterDelete = (anime)=>{
  const updatedAnime =  animes.filter(ani=> ani.id !== anime.id)
  setAnimes([...updatedAnime]);
  }
  const handleAfterUpdate = (anime)=>{
    const updatedAnime =  animes.map(ani=> {
        if(ani.id === anime.id) return anime;
        return ani
    })
    setAnimes([...updatedAnime]);
  }

  useEffect(() => {
    if (query.trim()) searchAnimes(query);
  }, [query]);
  return (
    <div className="min-h-screen py-8">
        <Container className='px-2 xl:p-0'>

      <NotFoundText text="Anime Not Found..." visible={resultsNotFound} />
        <AnimeList animes={animes} />
        </Container>
    </div>
  );
}



export default AnimeSearch