import React from "react";
import Pagination from "./Pagination";

const BanglaToKorean = () => {
  return (
    <div>
      <h1 className="p-4 font-bold text-gray-800 underline">
        Bangla To Korean Collection
      </h1>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" class="px-6 py-3">
                Serial No.
              </th>
              <th scope="col" class="px-6 py-3">
                Bangla Word
              </th>
              <th scope="col" class="px-6 py-3">
                Korean Translation
              </th>
              <th scope="col" class="px-6 py-3">
                Edit
              </th>
              <th scope="col" class="px-6 py-3">
                Remove
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="bg-white border-b ">
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
              >
                01
              </th>
              <td class="px-6 py-4">Bangla</td>
              <td class="px-6 py-4">Korean Translation</td>
              <td class="px-6 py-4">
                <a class="font-medium text-blue-600  hover:underline">Edit</a>
              </td>
              <td class="px-6 py-4">
                <a class="font-medium text-red-600  hover:underline">Remove</a>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="p-4">
          <Pagination></Pagination>
        </div>
      </div>
    </div>
  );
};

export default BanglaToKorean;
