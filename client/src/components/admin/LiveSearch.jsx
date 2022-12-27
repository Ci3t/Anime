import React, { forwardRef, useEffect, useRef, useState } from "react";
import "./tagsInput.css";



function LiveSearch({
  results=[],
  selectedResultStyle,
  resultContainerStyle,
  renderItem=null,
  name,
  value='',
  onChange=null,
  onSelect=null,
  visible,
}) {
  const [displaySearch, setDisplaySearch] = useState(false);
  const [focusIndex, setFocusIndex] = useState(-1);

  const handleOnFocus = () => {
    if (results.length) setDisplaySearch(true);
  };

  const closeSearch = () => {
    setDisplaySearch(false);
    setFocusIndex(-1);
  };

  const handleOnBlur = () => {
    setTimeout(() => {
      closeSearch();
    }, 100);
  };
  const handleSelection = (selectedItem) => {

    if(selectedItem) {
      onSelect(selectedItem);
      closeSearch()
    }
    
  };
  const handleKeyDown = ({ key }) => {
    let nextCount;
    const keys = ["ArrowDown", "ArrowUp", "Enter", "Escape"];


    if (!keys.includes(key)) return;

    //Handle Selection up and down

    if (key === "ArrowDown") {
      nextCount = (focusIndex + 1) % results.length;
    }
    if (key === "ArrowUp") {
      nextCount = (focusIndex + results.length - 1) % results.length;
    }

    if (key === "Enter") return handleSelection(results[focusIndex]);
    setFocusIndex(nextCount);
    if (key === "Escape") return closeSearch()
  };

  useEffect(()=>{
    if(visible) return setDisplaySearch(visible)
    setDisplaySearch(false);
  },[visible])

  return (
    <div className="relative">
      <input
        onKeyDown={handleKeyDown}
        onBlur={handleOnBlur}
        onFocus={handleOnFocus}
        type="text"
        name={name}
        id={name}
        className="block pt-3 px-0  text-sm text-gray-900 bg-transparent border-b-2 border-t-0 border-x-0 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
        value={value}
        onChange={onChange}
      />
      <label
        htmlFor={name}
        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 bottom-3 pt-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
      >
        Search Profile
      </label>

      <SearchResult
        onSelect={handleSelection}
        focusIndex={focusIndex}
        visible={displaySearch}
        results={results}
        renderItem={renderItem}
        resultContainerStyle={resultContainerStyle}
        selectedResultStyle={selectedResultStyle}
      />
    </div>
  );
}

const SearchResult = ({
  visible,
  results = [],
  focusIndex,
  onSelect,
  renderItem,
  resultContainerStyle,
  selectedResultStyle,
}) => {
  const resultContainer = useRef();

  useEffect(() => {
    resultContainer.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [focusIndex]);
  if (!visible) return null;
  return (
    <div className="absolute z-50 right-0 left-0 top-10 bg-white shadow-md mt-1 space-y-2 p-2 max-h-64 overflow-auto pMargin-0 custom-scroll-bar">
      {results.map((result, index) => {
        const getSelectedClass = () => {
          return selectedResultStyle ? selectedResultStyle : "bg-dark-subtle";
        };

        return (
          <ResultCard
            ref={index === focusIndex ? resultContainer : null}
            key={index.toString()}
            item={result}
            renderItem={renderItem}
            resultContainerStyle={resultContainerStyle}
            selectedResultStyle={index === focusIndex ? getSelectedClass : ""}
            onClick={() => onSelect(result)}
          />
        );
      })}
    </div>
  );
};

const ResultCard = forwardRef((props, ref) => {
  const {
    item,
    renderItem,
    resultContainerStyle,
    selectedResultStyle,
    onClick,
  } = props;

  const getClasses = () => {
    if (resultContainerStyle)
      return resultContainerStyle + " " + selectedResultStyle;

    return (
      selectedResultStyle +
      ` cursor-pointer rounded overflow-hidden hover:bg-dark-subtle hover:flex transition`
    );
    // `${index ===focusIndex? 'bg-blue-300':''} cursor-pointer rounded overflow-hidden hover:bg-dark-subtle hover:flex transition`
  };
  return (
    <div onClick={onClick} ref={ref} className={getClasses()}>
      {renderItem(item)}
    </div>
  );
});

export default LiveSearch;
