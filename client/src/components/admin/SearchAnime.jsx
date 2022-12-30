import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { searchAnimeForAdmin } from "../../api/anime";
import { useNotification } from "../../hooks/themeHook";
import AnimeListItem from "../AnimeListItem";
import NotFoundText from "../NotFoundText";

function SearchAnime() {
  const [animes, setAnimes] = useState([]);
  const [resultsNotFound, setResultsNotFound] = useState(false);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("title");

  const { updateNotification } = useNotification();

  const searchAnimes = async (val) => {
    const { error, results } = await searchAnimeForAdmin(val);
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
    <div className="p-5 space-y-3">
      <NotFoundText text="Anime Not Found..." visible={resultsNotFound} />
      {!resultsNotFound &&
        animes.map((anime) => {
          return (
            <AnimeListItem
              anime={anime}
              key={anime.id}
              afterDelete={handleAfterDelete}
              afterUpdate={handleAfterUpdate}
            />
          );
        })}
    </div>
  );
}

export default SearchAnime;
