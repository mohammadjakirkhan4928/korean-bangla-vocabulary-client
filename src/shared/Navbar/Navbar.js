import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
<div className="navbar text-white bg-gray-800 hover:bg-gray-900  ">
      <div className="navbar-start">

      </div>

      <div className="navbar-center">
        <Link to='/' className="btn btn-ghost normal-case md:text-2xl  font-bold">কোরিয়ান এবং বাংলা শব্দভান্ডার</Link>
      </div>

      <div className="navbar-end">

      </div>
    </div>
  )
}

export default Navbar