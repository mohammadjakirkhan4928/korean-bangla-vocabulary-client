import React, { useState } from "react";
import { useQuery } from "react-query";
import Loader from "../../shared/loader/Loader";
import useTitle from "../../shared/usetitle/useTitle";
import KoreanToBangla from "./KoreanToBangla";
import BanglaToKorean from "./BanglaToKorean";

const Editword = () => {
  useTitle("Edit Word");

  return (
    <div className="py-12 px-4 mx-auto max-w-screen-xl lg:py-16 m-12">
      <form class="max-w-md mx-auto">
        <label
          for="default-search"
          class="mb-2 text-sm font-medium text-gray-900 sr-only "
        >
          Search
        </label>
        <div class="relative">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              class="w-4 h-4 text-gray-500 "
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-gray-500 focus:border-gray-500 "
            placeholder="Search Mockups, Logos..."
            required
          />
          <button
            type="submit"
            class="text-white absolute end-2.5 bottom-2.5 bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 "
          >
            Search
          </button>
        </div>
      </form>

      <div className="flex flex-col md:flex-row items-center justify-center gap-4 ">
        <div className="md:w-1/2 mb-4 md:mb-0">
          <KoreanToBangla></KoreanToBangla>
        </div>
        <div className="md:w-1/2">
          <BanglaToKorean></BanglaToKorean>
        </div>
      </div>
    </div>
  );
};

export default Editword;
