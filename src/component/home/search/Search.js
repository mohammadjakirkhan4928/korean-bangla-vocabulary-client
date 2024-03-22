import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useQuery } from "react-query";
import useTitle from "../../../shared/usetitle/useTitle";

const Search = () => {
  useTitle("Search Word");
  const [inputMode, setInputMode] = useState("korean");
  const [searchWord, setSearchWord] = useState("");
  const [translation, setTranslation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const toggleInputMode = () => {
    const newInputMode = inputMode === "korean" ? "bangla" : "korean";
    setInputMode(newInputMode);
    toast.success(
      `Switched to ${
        newInputMode === "korean" ? "Korean" : "Bangla"
      } input mode`
    );
  };

  const fetchSuggestions = async (word) => {
    try {
      const response = await fetch(`http://localhost:9000/suggestions/${word}`);
      if (response.ok) {
        const data = await response.json();
        setSuggestions(data.suggestions);
        refetch();
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  useEffect(() => {
    if (searchWord.trim() !== "") {
      fetchSuggestions(searchWord);
    } else {
      setSuggestions([]);
    }
  }, [searchWord]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(
        inputMode === "korean"
          ? `http://localhost:9000/koreantobangla/${searchWord}`
          : `http://localhost:9000/banglatokorean/${searchWord}`
      );

      if (response.ok) {
        const data = await response.json();
        if (data.error) {
          setTranslation("Translation not found");
        } else {
          setTranslation(data.translation);
          refetch();
        }
      } else {
        console.error(
          `Failed to fetch translation. Status: ${response.status}`
        );
        setTranslation("Translation not found");
      }
    } catch (error) {
      console.error("Error fetching translation:", error);
      setTranslation("Translation not found");
    }

    setIsLoading(false);
  };

  const handleSuggestionClick = async (word) => {
    setSearchWord(word);
    setSuggestions([]);

    try {
      const response = await fetch(
        inputMode === "korean"
          ? `http://localhost:9000/koreantobangla/${word}`
          : `http://localhost:9000/banglatokorean/${word}`
      );

      if (response.ok) {
        const data = await response.json();
        if (data.error) {
          setTranslation("Translation not found");
        } else {
          setTranslation(data.translation);
        }
      } else {
        console.error(
          `Failed to fetch translation. Status: ${response.status}`
        );
        setTranslation("Translation not found");
      }
    } catch (error) {
      console.error("Error fetching translation:", error);
      setTranslation("Translation not found");
    }
  };

  const {
    data: suggestionsData,
    isLoading: suggestionsLoading,
    isError: suggestionsError,
    refetch,
  } = useQuery(["suggestions", searchWord], async () => {
    if (searchWord.trim() !== "") {
      const response = await fetch(
        `http://localhost:9000/suggestions/${searchWord}`
      );
      if (response.ok) {
        const data = await response.json();
        return data.suggestions;
      }
    }
    return [];
  });

  useEffect(() => {
    if (!suggestionsLoading && !suggestionsError) {
      setSuggestions(suggestionsData || []);
    }
    refetch();
  }, [suggestionsData, suggestionsLoading, suggestionsError]);

  return (
    <div className="py-12 px-4 mx-auto max-w-screen-xl lg:py-16 m-12">
      <label className="inline-flex items-center cursor-pointer p-2">
        <span className="ms-3 text-sm font-medium text-black p-2">
          {inputMode === "korean" ? "Bangla" : "Korean"}
        </span>
        <input
          type="checkbox"
          value=""
          className="sr-only peer"
          onChange={toggleInputMode}
        />
        <div className="relative w-14 h-7 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-gray-600"></div>
        <span className="ms-3 text-sm font-medium text-black">
          {inputMode === "korean" ? "Korean" : "Bangla"}
        </span>
      </label>

      <form onSubmit={onSubmit}>
        <label
          htmlFor="search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only"
        >
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
            placeholder={`Enter ${
              inputMode === "korean" ? "Korean" : "Bangla"
            } word`}
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

      {suggestions.length > 0 && (
        <div className="mt-2">
          <ul className="bg-gray-100 border border-gray-300 divide-y divide-gray-300 rounded-lg">
            {suggestions.map((word, index) => (
              <li
                key={index}
                className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                onClick={() => handleSuggestionClick(word)}
              >
                {word}
              </li>
            ))}
          </ul>
        </div>
      )}

      {translation && (
        <div className="mt-4">
          <div className="bg-gray-200 p-4 rounded-lg">
            <p className="text-gray-900" style={{ fontSize: "1.1 rem" }}>
              {translation === "Translation not found" ? (
                <span style={{ fontWeight: "bold" }}>{translation}</span>
              ) : inputMode === "korean" ? (
                <span style={{ fontWeight: "bold" }}>
                  <span className="text-gray-700">{searchWord}</span> :{" "}
                  {translation}
                </span>
              ) : (
                <span style={{ fontWeight: "bold" }}>
                  <span className="text-gray-700">{searchWord}</span> :{" "}
                  {translation}
                </span>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
