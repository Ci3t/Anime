import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

const defaultInputStyle = "border-light-subtle focus:border-main";
export default function AppSearchForm({
  placeholder,
  onSubmit,
  showResetIcon,
  inputClassName = defaultInputStyle,
  onReset,
}) {
  const [value, setValue] = useState("");

  const handleOnSubmit = (e) => {
    e.preventDefault();
    onSubmit(value);
  };
  const handleReset = () => {
    setValue("");
    onReset();
  };
  return (
    <form className="relative" onSubmit={handleOnSubmit}>
      <input
        type="text"
        className={"border-2 transition bg-transparent rounded text-lg p-1 outline-none relative "+ inputClassName}
        placeholder={placeholder}
        value={value}
        onChange={({ target }) => setValue(target.value)}
      />
      {showResetIcon ? (
        <button
          onClick={handleReset}
          type="button"
          className="absolute top-1/2 -translate-y-1/2 right-2"
        >
          <AiOutlineClose />
        </button>
      ) : null}
    </form>
  );
}
