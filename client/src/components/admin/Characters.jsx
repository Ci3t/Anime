import React, { useEffect, useState } from "react";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { charSearch, getCharacters } from "../../api/character";
import { useNotification, useSearch } from "../../hooks/themeHook";
import AppSearchForm from "../form/AppSearchForm";
import UpdateCharacter from "../modals/UpdateCharacter";
import NextAndPrevBtn from "../NextAndPrevBtn";
import NotFoundText from "../NotFoundText";

let currentPageNo = 0;
const limit = 20;
function Characters() {
  const [characters, setCharacters] = useState([]);
  const [reachedToEnd, setReachedToEnd] = useState(false);
  const [results, setResults] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const { updateNotification } = useNotification();

  const { handleSearch,resetSearch,resultNotFound } = useSearch();

  async function fetchCharacters(pageNo) {
    const { profiles, error } = await getCharacters(pageNo, limit);

    if (error) return updateNotification("error", error);
    if (!profiles.length) {
      currentPageNo = pageNo - 1;
      return setReachedToEnd(true);
    }
    setCharacters([...profiles]);
  }

  const handleNextClick = () => {
    if (reachedToEnd) return;
    currentPageNo += 1;
    fetchCharacters(currentPageNo);
  };
  const handlePrevClick = () => {
    if (currentPageNo <= 0) return;
    if (reachedToEnd) setReachedToEnd(false);
    currentPageNo -= 1;
    fetchCharacters(currentPageNo);
  };

  const handleOnEditClick = (profile) => {
    setShowUpdateModal(true);
    setSelectedProfile(profile);
  };
  const hideUpdateModal = () => {
    setShowUpdateModal(false);
  };
  const handleOnCharUpdate = (profile) => {
    const updatedCharacters = characters.map((char) => {
      if (profile.id === char.id) {
        return profile;
      }
      return char;
    });

    setCharacters([...updatedCharacters]);
  };
  const handleOnSearchSubmit = (value) => {
    handleSearch(charSearch, value, setResults);
  };
  const handleSearchFormReset = (value) => {
   resetSearch();
   setResults([])
  };

  useEffect(() => {
    fetchCharacters(currentPageNo);
  }, []);

  return (
    <>
      <div className="p-5">
        <div className="flex justify-end">
          <AppSearchForm
            onSubmit={handleOnSearchSubmit}
            placeholder="Search Characters..."
            showResetIcon={results.length || resultNotFound}
            onReset={handleSearchFormReset}
          />
        </div>
     <NotFoundText text="Character Not Found" visible={resultNotFound}/> :
       <div className="grid grid-cols-4 gap-3 p-5">
          {results.length || resultNotFound
            ? results.map((char) => (
                <CharacterProfile
                  onEditClick={() => handleOnEditClick(char)}
                  profile={char}
                  key={char.id}
                />
              ))
            : characters.map((char) => (
                <CharacterProfile
                  onEditClick={() => handleOnEditClick(char)}
                  profile={char}
                  key={char.id}
                />
              ))}
</div>

       {!results.length && !resultNotFound?   <NextAndPrevBtn
            className=" col-span-4"
            onNextClick={handleNextClick}
            onPrevClick={handlePrevClick}
          />: null}
      </div>
      <UpdateCharacter
        visible={showUpdateModal}
        onClose={hideUpdateModal}
        initialState={selectedProfile}
        onSuccess={handleOnCharUpdate}
      />
    </>
  );
}

const CharacterProfile = ({ profile, onEditClick, onDeleteClick }) => {
  const [showOptions, setShowOptions] = useState(false);
  const acceptNameLength = 15;

  const handleOnMouseEnter = () => {
    setShowOptions(true);
  };
  const handleOnMouseLeave = () => {
    setShowOptions(false);
  };

  const getName = (name) => {
    if (name.length <= acceptNameLength) return name;

    return name.substring(0, acceptNameLength) + "..";
  };

  if (!profile) return null;

  const { name, avatar, about = "" } = profile;
  return (
    <div className="h-20 rounded overflow-hidden bg-slate-500">
      <div
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
        className="flex cursor-pointer relative"
      >
        <img
          className="w-20 h-20 aspect-square object-cover"
          src={avatar}
          alt={name}
        />

        <div className="px-2">
          <h1 className="text-xl font-semibold whitespace-nowrap">
            {getName(name)}
          </h1>
          <p className="text-xs">{about.substring(0, 50)}</p>
        </div>
        <Options onEditClick={onEditClick} visible={showOptions} />
      </div>
    </div>
  );
};

const Options = ({ visible, onDeleteClick, onEditClick }) => {
  if (!visible) return null;

  return (
    <div className="absolute inset-0 bg-main bg-opacity-25 backdrop-blur-sm text-white flex justify-center items-center space-x-5">
      <button
        onClick={onDeleteClick}
        className="p-2 rounded-full bg-white text-main hover:opacity-80 transition "
        type="button"
      >
        <BsTrash />
      </button>
      <button
        onClick={onEditClick}
        className="p-2 rounded-full bg-white text-main hover:opacity-80 transition "
        type="button"
      >
        <BsPencilSquare />
      </button>
    </div>
  );
};
export default Characters;
