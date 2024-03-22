import React from "react";
import { Link } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";

const Navbar = () => {
  const [isAdmin] = useAdmin();

  const menuItems = (
    <React.Fragment>
      {isAdmin && (
        <li className="text-black">
          <Link to="/admindashboard">Admin Dashboard</Link>
        </li>
      )}
      <li className="text-black">
        <Link to="/grammer">Grammer</Link>
      </li>
      {/* <li className="text-black">
        <Link to="/pdf">Ganarate-PDF</Link>
      </li> */}
    </React.Fragment>
  );

  return (
    <div className="navbar bg-gray-800 text-white hover:bg-gray-900">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost  btn-circle">
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
                d="M4 6h16M4 12h16M4 18h7"
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
      </div>
      <div className="navbar-center">
        <Link to="/" className="btn btn-ghost md:text-xl ">
          কোরিয়ান এবং বাংলা শব্দভান্ডার
        </Link>
      </div>
      <div className="navbar-end">
        {/* <Link to="/admindashboard" className="btn bg-gray-950 border-orange-100">
          Log-IN
        </Link> */}
      </div>
    </div>
  );
};

export default Navbar;
