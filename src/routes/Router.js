import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../component/home/Home/Home";
import Addword from "../Dashboard/dashhome/Addword";
import AdminHome from "../Dashboard/shared/AdminHome";
import Search from "../component/home/search/Search";
import Grammer from "../component/grammer/Grammer";
import Signup from "../Dashboard/shared/Signup";
import Editword from "../Dashboard/editword/Editword";
import Ganarateword from "../component/home/ganarateword/Ganarateword";
import Adminlogin from "../Dashboard/shared/Adminlogin";
import Adminroute from "./Adminroute";
import Adminlayout from "../layout/Adminlayout";
import Pasteword from "../Dashboard/pasteword/Pasteword";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/search",
        element: <Search></Search>,
      },
      {
        path: "/grammer",
        element: <Grammer></Grammer>,
      },
      {
        path: "/signup",
        element: <Signup></Signup>,
      },

      {
        path: "/pdf",
        element: <Ganarateword></Ganarateword>,
      },
      {
        path: "/adminlogin",
        element: <Adminlogin></Adminlogin>,
      },
    ],
  },

  {
    path: "/admindashboard",
    element: (
      <Adminroute>
        <Adminlayout></Adminlayout>
      </Adminroute>
    ),
    children: [
      {
        path: "/admindashboard",
        element: <AdminHome></AdminHome>,
      },
      {
        path: "/admindashboard/addword",
        element: <Addword></Addword>,
      },
      {
        path: "/admindashboard/wordbookpdf",
        element: <Pasteword></Pasteword>,
      },
      {
        path: "/admindashboard/editword",
        element: <Editword></Editword>,
      },
    ],
  },
]);
