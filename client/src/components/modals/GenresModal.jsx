import React from "react";
import ModalContainer from "./ModalContainer";
import { genres } from "../utils/genres";
import { useState } from "react";
import Submit from "../form/Submit";
import { useEffect } from "react";

function GenresModal({ visible, onClose, onSubmit,previousSelection }) {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const handleGenresSelector = (gen) => {
    let newGenres = [];

    if (selectedGenres.includes(gen))
      newGenres = selectedGenres.filter((genre) => genre !== gen);
    else newGenres = [...selectedGenres, gen];
    setSelectedGenres([...newGenres]);
  };

  const handleSubmit = () => {
    onSubmit(selectedGenres);
    onClose();
  };
  const handleClose = () => {
    setSelectedGenres(previousSelection);
    onClose();
  };

  useEffect(()=>{
    setSelectedGenres(previousSelection);

  },[])
  return (
    <ModalContainer visible={visible} onClose={handleClose}>
      <div className="flex flex-col justify-between h-full">
        <div>
          <h1 className="font-semibold text-2xl text-white text-center">Select Genres</h1>
          <div className="space-y-3 ">


          {genres.map((gen) => {
              return (
              <Genre
                onClick={() => handleGenresSelector(gen)}
                selected={selectedGenres.includes(gen)}
                key={gen}
                >
                {gen}
              </Genre>
            );
        })}
        </div>
        </div>
        <div className="w-56 self-end text-white bg-[#4b89e6] rounded hover:opacity-80">
          <Submit value="Select" type="button" onClick={handleSubmit} />
        </div>
      </div>
    </ModalContainer>
  );
}

const Genre = ({ children, selected, onClick }) => {
  const getSelectedStyle = () => {
    return selected
      ? "bg-[#2265b3] text-white px-1 py-1 mr-2 rounded border-[#90e0ee]"
      : "text-white ";
  };
  return (
    <button
      onClick={onClick}
      className={getSelectedStyle() + " border-2  p-1 rounded mr-3 "}
    >
      {children}
    </button>
  );
};

export default GenresModal;
