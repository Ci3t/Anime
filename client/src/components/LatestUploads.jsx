import React, { useEffect } from "react";
import { useState } from "react";
import { deleteAnimes, getAnimes, getUpdateAnime } from "../api/anime";
import { useAnime, useNotification } from "../hooks/themeHook";
import AnimeListItem from "./AnimeListItem";
import ConfirmModal from "./modals/ConfirmModal";
import UpdateAnime from "./modals/UpdateAnime";

const pageNo = 0;
const limit = 5;

function LatestUploads() {
  // const [animes, setAnimes] = useState([]);
  // const [showConfirmModal, setShowConfirmModal] = useState(false);
  // const [showUpdateModal, setShowUpdateModal] = useState(false);
  // const [busy, setBusy] = useState(false);
  // const [selectedAnime, setSelectedAnime] = useState(null);

  // const { updateNotification } = useNotification();
const {latestUploads,fetchLatestAnimes} = useAnime()
  // const fetchLatestAnimes = async () => {
  //   const { error, animes } = await getAnimes(pageNo, limit);

  //   if (error) return updateNotification("error", error);

  //   setAnimes([...animes]);
  // };
  // const handleOnEditClick = async ({id}) => {
  // const {anime,error} =  await getUpdateAnime(id)
  // setShowUpdateModal(true)
  // if(error) return updateNotification('error',error);

  // setSelectedAnime(anime) 
  // };
  // const handleOnDeleteClick = (anime) => {
  //   setSelectedAnime(anime);
  //   setShowConfirmModal(true);
  // };
  // const handleOnDeleteConfirm = async () => {
  //   setBusy(true)
  //  const {error,message} = await deleteAnimes(selectedAnime.id)
  //   setBusy(false)

  //   if(error) return updateNotification('error',error);

  //   updateNotification('success',message);
  //   fetchLatestAnimes();
  //   hideConfirmModal()
  // };
  // const handleOnUpdate = (anime) => {
  //  const updateAnime = animes.map(ani=>{
  //     if(ani.id === anime.id) return anime;
  //     return ani
  //   })

  //   setAnimes([...updateAnime])
  // }
  // const hideConfirmModal = () => setShowConfirmModal(false)
  // const hideUpdateModal = () => setShowUpdateModal(false)
  
  useEffect(() => {
    fetchLatestAnimes();
  }, []);
  const handleUIUpdate = () => fetchLatestAnimes()

  return (
    <>
      <div className="bg-white shadow  p-5 rounded col-span-2">
        <h1 className="text-2xl mb-2 font-semibold">Recent Uploads</h1>
        <div className="space-y-3">
          {latestUploads.map((anime) => {
            return (
              <AnimeListItem
                anime={anime}
                key={anime.id}
                afterDelete={handleUIUpdate}
                afterUpdate={handleUIUpdate}
                // onDeleteClick={()=>handleOnDeleteClick(anime)}
                // onEditClick={()=>handleOnEditClick(anime)}
              />
            );
          })}
        </div>
      </div>
      {/* <ConfirmModal
        busy={busy}
        visible={showConfirmModal}
        onConfirm={handleOnDeleteConfirm}
        onCancel={hideConfirmModal}
        title="Are you sure?"
        subTitle="This action will remove this movie permanently!"
      />
      <UpdateAnime
        onClose={hideUpdateModal}
        onSuccess={handleOnUpdate}
        visible={showUpdateModal}
        initialState={selectedAnime}
      /> */}
    </>
  );
}

export default LatestUploads;
