import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Adminnav from "../shared/Adminnav";
import useTitle from "../../shared/usetitle/useTitle";

const Addword = () => {
  useTitle("Add New Word");
  const [koreanWord, setKoreanWord] = useState("");
  const [banglaWord, setBanglaWord] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if both Korean and Bangla words are provided
    if (koreanWord.trim() === "" || banglaWord.trim() === "") {
      toast.error("Please provide both Korean and Bangla translations.");
      return;
    }

    try {
      // Send the form data to your server for processing
      const response = await fetch("http://localhost:9000/addword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          koreanWord: koreanWord,
          banglaWord: banglaWord,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Clear input fields after successful submission
        setKoreanWord("");
        setBanglaWord("");
        toast.success(data.message);
      } else {
        // Handle the case where the request fails
        toast.error(data.error);
      }
    } catch (error) {
      console.error("Error adding word:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="py-12 px-4 mx-auto max-w-screen-xl lg:py-16 m-12">
      <Adminnav />
      <div className="border p-12">
        <div className="text-blue-800 font-bold text-2xl underline">
          <h1>Add New Word</h1>
        </div>
        <form className="p-4 md:p-5" onSubmit={handleSubmit}>
          <div className="grid gap-4 mb-4 grid-cols-2">
            <div className="col-span-2 sm:col-span-1">
              <label
                htmlFor="korean"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Korean Word
              </label>
              <input
                type="text"
                name="korean"
                id="korean"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Enter Korean word"
                value={koreanWord}
                onChange={(e) => setKoreanWord(e.target.value)}
                required
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label
                htmlFor="bangla"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Bangla Word
              </label>
              <input
                type="text"
                name="bangla"
                id="bangla"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Enter Bangla translation"
                value={banglaWord}
                onChange={(e) => setBanglaWord(e.target.value)}
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="text-white inline-flex items-center bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Add New Word
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addword;
