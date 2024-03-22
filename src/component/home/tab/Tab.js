import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Tab = () => {
  const [totalWordsCount, setTotalWordsCount] = useState(0);
  const [showTab, setShowTab] = useState(true);

  useEffect(() => {
    const count = localStorage.getItem("totalWordsCount");
    setTotalWordsCount(parseInt(count) || 0);
  }, []);

  const removeTab = () => {
    setShowTab(false);
    // Additional logic can be added here if needed
  };

  return (
    <div>
      {showTab && (
        <div className="bg-indigo-600">
          <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-start justify-between text-white sm:items-center md:px-8">
            <div className="flex-1 justify-center flex items-start gap-x-4 sm:items-center">
              <div className="flex-none p-1.5 px-4 rounded-full bg-indigo-800 flex items-center justify-center font-medium text-sm">
                News
              </div>
              <p className="font-medium p-2">
                We just launched a new version of our library!{" "}
                <a
                  href="javascript:(0)"
                  className="font-semibold underline duration-150 hover:text-indigo-100 inline-flex items-center gap-x-1"
                >
                  <Link to="/pdf">Learn more</Link>
                  {totalWordsCount > 0 && (
                    <>
                      <span className="text-white mx-1">|</span>
                      <span>Total Words: {totalWordsCount}</span>
                    </>
                  )}
                </a>
              </p>
            </div>
            {totalWordsCount > 0 && (
              <button
                className="p-2 rounded-lg duration-150 hover:bg-indigo-500 ring-offset-2 focus:ring"
                onClick={removeTab}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                </svg>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Tab;
