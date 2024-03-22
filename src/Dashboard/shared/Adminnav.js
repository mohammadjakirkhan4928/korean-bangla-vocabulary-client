import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AdminProvider";

const Adminnav = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const menuItems = (
    <React.Fragment>
      <li>
        <Link className="font-bold  text-gray-900" to="/admindashboard/addword">
          Add Word
        </Link>
      </li>
      <li>
        <Link className="font-bold text-gray-900" to="/admindashboard/editword">
          Edit Word
        </Link>
      </li>
      <li>
        <Link
          className=" font-bold text-gray-900"
          to="/admindashboard/wordbookpdf"
        >
          Multiple-Word Add
        </Link>
      </li>
    </React.Fragment>
  );

  return (
    <nav class="bg-gray-700 fixed w-full z-20 top-0 start-0 border-b border-gray-900 ">
      <div className="navbar bg-gray-400">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {menuItems}
            </ul>
          </div>
          <Link to="/admindashboard" className="btn btn-ghost text-xl font-bold text-gray-900">
            Admin
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{menuItems}</ul>
        </div>
        <div className="navbar-end">
          <button
            className="btn text-white bg-slate-700"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Adminnav;
