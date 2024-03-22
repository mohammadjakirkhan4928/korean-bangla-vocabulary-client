import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const AdminHome = () => {


  return (
    <div>

        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold"></h1>
              <p className="py-6"></p>
              <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
                <Link
                  to="/admindashboard/addword"
                  className="px-8 py-3 text-lg font-semibold border rounded border-gray-800"
                >
                  Add Word
                </Link>
                <Link
                  to="/admindashboard/editword"
                  className="px-8 py-3 text-lg font-semibold border rounded border-gray-800"
                >
                  Edit Word
                </Link>
                <Link
                  to="/admindashboard/wordbookpdf"
                  className="px-8 py-3 text-lg font-semibold border rounded border-gray-800"
                >
                  Multiple-Word Add
                </Link>
              </div>
            </div>
          </div>
        </div>

    </div>
  );
};

export default AdminHome;
