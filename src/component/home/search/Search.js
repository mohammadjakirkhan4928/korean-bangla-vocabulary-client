import React, { useState } from "react";

const Search = () => {
  const [koreanWord, setKoreanWord] = useState("");
  const [banglaWord, setBanglaWord] = useState("");
  const [koreanTranslation, setKoreanTranslation] = useState("");
  const [banglaTranslation, setBanglaTranslation] = useState("");
  const [isLoading, setIsLoading] = useState(false); // add loading state

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // set loading state to true

    try {
      const response = await fetch(
        `http://localhost:5000/koreantobangla/${koreanWord}`
        // `https://korean-bangla-vocabulary.vercel.app/koreantobangla/${koreanWord}`
      );
      const data = await response.json();
      setBanglaTranslation(data);
    } catch (error) {
      console.error(error);
      setBanglaTranslation("Translation not found");
    }

    setIsLoading(false); // set loading state to false after data is fetched
  };

  const onBanglaSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // set loading state to true

    try {
      const response = await fetch(
        `http://localhost:5000/banglatokorean/${banglaWord}`
        //  `https://korean-bangla-vocabulary.vercel.app/banglatokorean/${banglaWord}`
      );
      const data = await response.json();
      setKoreanTranslation(data);
    } catch (error) {
      console.error(error);
      setKoreanTranslation("Translation not found");
    }

    setIsLoading(false); // set loading state to false after data is fetched
  };

  return (
    <div className="m-12">
      <form className="m-12" onSubmit={onSubmit}>
        <p className="text-2xl text-sky-500 font-bold">কোরিয়ান শব্দ:</p>
        <label>
          <input
            type="text"
            value={koreanWord}
            onChange={(e) => setKoreanWord(e.target.value)}
            placeholder="কোরিয়ান শব্দটি লিখুন..."
            className="input input-bordered input-primary w-full max-w-xs"
          />
        </label>
        <button type="submit" className="btn btn-outline  btn-primary m-3">
          Translate to Bangla
        </button>
      </form>

      <div className="p-12 m-4 border-box rounded-2xl  bg-sky-300 text-2xl font-bold">
        {isLoading ? (
          <progress className="progress w-56"></progress>
        ) : (

          <p> Bangla translation:<span className="text-primary">{banglaTranslation}</span> </p>
        )}
        {/* add loader */}
      </div>

      <form onSubmit={onBanglaSubmit}>
        <p className="text-2xl text-sky-500 font-bold">বাংলা শব্দ:</p>
        <label>
          <input
            type="text"
            value={banglaWord}
            onChange={(e) => setBanglaWord(e.target.value)}
            placeholder="বাংলা শব্দটি লিখুন...."
            className="input input-bordered input-primary w-full max-w-xs"
          />
        </label>

        <button type="submit" className="btn btn-outline  btn-primary m-3">
          Translate to Korean
        </button>
      </form>
      <div className="p-12 m-4 border-box rounded-2xl  bg-sky-300 text-2xl font-bold">
        {isLoading ? (
          <progress className="progress w-56"></progress>
        ) : (
          <p>Korean translation:<span className="text-primary"> {koreanTranslation} </span> </p>
        )}
      </div>
    </div>
  );
};

export default Search;
