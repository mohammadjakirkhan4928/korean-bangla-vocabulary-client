import React, { useState } from "react";
import { toast } from "react-hot-toast";

const Search = () => {
  const [inputMode, setInputMode] = useState("korean");
  const [searchWord, setSearchWord] = useState("");
  const [translation, setTranslation] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toggleInputMode = () => {
    const newInputMode = inputMode === "korean" ? "bangla" : "korean";
    setInputMode(newInputMode);
    toast.success(`Switched to ${newInputMode === "korean" ? "Korean" : "Bangla"} input mode`);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(
        inputMode === "korean"
          ? `https://eps-client-server.vercel.app/koreantobangla/${searchWord}`
          : `https://eps-client-server.vercel.app/banglatokorean/${searchWord}`
      );
      const data = await response.json();
      if (data.error) {
        setTranslation("Translation not found");
      } else {
        setTranslation(data.translation);
      }
    } catch (error) {
      console.error(error);
      setTranslation("Translation not found");
    }

    setIsLoading(false);
  };

  return (
    <div className="py-12 px-4 mx-auto max-w-screen-xl lg:py-16 ">



      <label className="inline-flex items-center cursor-pointer p-2">
        <span className="ms-3 text-sm font-medium text-gray-900 p-2">
          {inputMode === "korean" ? "Bangla" : "Korean"}
        </span>
        <input
          type="checkbox"
          value=""
          className="sr-only peer"
          onChange={toggleInputMode}
        />
        <div className="relative w-14 h-7 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-gray-600"></div>
        <span className="ms-3 text-sm font-medium text-gray-900">
          {inputMode === "korean" ? "Korean" : "Bangla"}
        </span>
      </label>

      <form onSubmit={onSubmit}>
        <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only">
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
            placeholder={`Enter ${inputMode === "korean" ? "Korean" : "Bangla"} word`}
            value={searchWord}
            onChange={(e) => setSearchWord(e.target.value)}
            required
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2"
          >
            {isLoading ? "Loading..." : "Search"}
          </button>
        </div>
      </form>

      {translation && (
  <div className="mt-4">
    <div className="bg-gray-200 p-4 rounded-lg">
      <p className="text-gray-900" style={{ fontSize: '1.1 rem' }}>
        {translation === "Translation not found"
          ? <span style={{ fontWeight: 'bold' }}>{translation}</span>
          : inputMode === "korean"
          ? <span style={{ fontWeight: 'bold' }}>{`${searchWord} in Bangla: ${translation}`}</span>
          : <span style={{ fontWeight: 'bold' }}>{`${searchWord} in Korean: ${translation}`}</span>}
      </p>
    </div>
  </div>
)}

    </div>
  );
};

export default Search;
