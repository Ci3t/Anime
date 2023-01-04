import React, { useEffect} from "react";

import { useAnime } from "../../hooks/themeHook";
import AnimeListItem from "../AnimeListItem";

import NextAndPrevBtn from "../NextAndPrevBtn";


function Animes() {




  const {fetchAnimes, animes:newAnimes,fetchPrevPage,fetchNextPage} = useAnime()


  const handleUIUpdate  = () => fetchAnimes()

  useEffect(() => {
    fetchAnimes();
  
  }, []);
  return (
    <>
      <div className="space-y-3 md:p-5 text-white ">
        {newAnimes.map((anime) => {
          return (
            <AnimeListItem
              key={anime.id}
              anime={anime}
              afterDelete={ handleUIUpdate }
              afterUpdate={ handleUIUpdate }
              // onEditClick={() => handleOnEditClick(anime)}
              // onDeleteClick={() => handleOnDeleteClick(anime)}
            />
          );
        })}
        <NextAndPrevBtn
          className=" col-span-4 text-white"
          onNextClick={fetchPrevPage}
          onPrevClick={fetchNextPage}
        />
      </div>

    </>
  );
}

export default Animes;
