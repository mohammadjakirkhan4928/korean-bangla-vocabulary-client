import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Adminnav from "../Dashboard/shared/Adminnav";

const Adminlayout = () => {
  const navigate = useNavigate();

  const menuItems = (
    <React.Fragment>
      <li>
        <Link
          className="bg-gray-700 font-bold  text-white"
          to="/admindashboard/addword"
        >
          Add Word
        </Link>
      </li>
      <li>
        <Link
         className="bg-gray-700 font-bold  text-white" to="/admindashboard/editword">Edit Word</Link>
      </li>
      <li>
        <Link  className="bg-gray-700 font-bold  text-white" to="/admindashboard/wordbookpdf">Multiple-Word Add</Link>
      </li>
    </React.Fragment>
  );
  return (
    <div>
      <Adminnav></Adminnav>
      <div className="drawer drawer-mobile pt-16 ">
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content">
          <Outlet></Outlet>
        </div>
        <div className="drawer-side bg-gray-400">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

          <ul className="menu gap-4 p-4 w-80 text-base-content">{menuItems}</ul>
        </div>
      </div>
    </div>
  );
};

export default Adminlayout;
