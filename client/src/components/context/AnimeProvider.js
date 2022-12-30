import React, { createContext, useState } from "react";
import { getAnimes } from "../../api/anime";
import { useNotification } from "../../hooks/themeHook";

export const AnimeContext = createContext();

const limit = 10;
let currentPageNo = 0;

const AnimeProvider = ({children}) =>{
    const [animes, setAnimes] = useState([]);
    const [latestUploads, setLatestUploads] = useState([]);
    const [reachedToEnd, setReachedToEnd] = useState(false);
    const { updateNotification } = useNotification();

    
  const fetchLatestAnimes = async (qty = 5) => {
    const { error, animes } = await getAnimes(0, qty);

    if (error) return updateNotification("error", error);

    setLatestUploads([...animes]);
  };


    const fetchAnimes = async (pageNo = currentPageNo) => {
        const { error, animes } = await getAnimes(pageNo, limit);
        if (error) return updateNotification("error", error);
    
        if (!animes.length) {
          currentPageNo = pageNo - 1;
          return setReachedToEnd(true);
        }
        setAnimes([...animes]);
        
      };

      
  const  fetchNextPage= () => {
    if (reachedToEnd) return;
    currentPageNo += 1;
    fetchAnimes(currentPageNo);
  };
  const fetchPrevPage = () => {
    if (currentPageNo <= 0) return;
    if (reachedToEnd) setReachedToEnd(false);
    currentPageNo -= 1;
    fetchAnimes(currentPageNo);
  };

    return <AnimeContext.Provider value={{animes,fetchAnimes,fetchNextPage,fetchPrevPage,fetchLatestAnimes,latestUploads}}>
        {children}
    </AnimeContext.Provider>
}

export default AnimeProvider;