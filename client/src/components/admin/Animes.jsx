import React, { useEffect, useState } from "react";
import { deleteAnimes, getAnimes, getUpdateAnime } from "../../api/anime";
import { useNotification } from "../../hooks/themeHook";
import AnimeListItem from "../AnimeListItem";
import ConfirmModal from "../modals/ConfirmModal";
import UpdateAnime from "../modals/UpdateAnime";
import NextAndPrevBtn from "../NextAndPrevBtn";

const limit = 10;
let currentPageNo = 0;
function Animes() {
  const [animes, setAnimes] = useState([]);
  const [reachedToEnd, setReachedToEnd] = useState(false);
  const [busy, setBusy] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedAnime, setSelectedAnime] = useState(null);
  const { updateNotification } = useNotification();

  const fetchAnimes = async (pageNo) => {
    const { error, animes } = await getAnimes(pageNo, limit);
    if (error) return updateNotification("error", error);

    if (!animes.length) {
      currentPageNo = pageNo - 1;
      return setReachedToEnd(true);
    }

    setAnimes([...animes]);
  };

  const handleNextClick = () => {
    if (reachedToEnd) return;
    currentPageNo += 1;
    fetchAnimes(currentPageNo);
  };
  const handlePrevClick = () => {
    if (currentPageNo <= 0) return;
    if (reachedToEnd) setReachedToEnd(false);
    currentPageNo -= 1;
    fetchAnimes(currentPageNo);
  };
  const handleOnEditClick = async ({ id }) => {
    const { error, anime } = await getUpdateAnime(id);

    if (error) return updateNotification("error", error);
    setSelectedAnime(anime);
    setShowUpdateModal(true);
  };
  const handleOnDeleteClick = (anime) => {
    setSelectedAnime(anime);
    setShowConfirmModal(true);
  };
  const handleOnDeleteConfirm = async () => {
    setBusy(true)
  const {error,message} = await deleteAnimes(selectedAnime.id)
    setBusy(false)

    if(error) return updateNotification('error',error);

    updateNotification('success',message);
    hideConfirmModal();
    fetchAnimes(currentPageNo)
  };
  const handleOnUpdate = async (anime) => {
    const updatedAnime = animes.map((ani) => {
      if (ani.id === anime.id) return anime;
      return ani;
    });

    setAnimes([...updatedAnime]);
  };

  const hideUpdateForm = () => setShowUpdateModal(false);
  const hideConfirmModal = () => setShowConfirmModal(false);

  useEffect(() => {
    fetchAnimes();
  }, []);
  return (
    <>
      <div className="space-y-3 p-5">
        {animes.map((anime) => {
          return (
            <AnimeListItem
              key={anime.id}
              anime={anime}
              onEditClick={() => handleOnEditClick(anime)}
              onDeleteClick={() => handleOnDeleteClick(anime)}
            />
          );
        })}
        <NextAndPrevBtn
          className=" col-span-4"
          onNextClick={handleNextClick}
          onPrevClick={handlePrevClick}
        />
      </div>
      <ConfirmModal
      busy={busy}
        visible={showConfirmModal}
        onConfirm={handleOnDeleteConfirm}
        onCancel={hideConfirmModal}
        title="Are you sure?"
        subTitle="This action will remove this movie permanently!"
      />
      <UpdateAnime
        onClose={hideUpdateForm}
        onSuccess={handleOnUpdate}
        visible={showUpdateModal}
        initialState={selectedAnime}
      />
    </>
  );
}

export default Animes;
