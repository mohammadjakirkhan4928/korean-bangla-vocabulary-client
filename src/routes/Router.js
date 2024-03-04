import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Main from '../layout/Main'
import Home from '../component/home/Home/Home'
import Dashhome from '../Dashboard/dashhome/Dahhome'


export const routes = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/admindashboard',
                element: <Dashhome></Dashhome>
            },

        ]
    },
   


])