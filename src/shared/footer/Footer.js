import React from 'react'
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="px-5 py-16 text-white bg-gray-800 hover:bg-gray-900 grid md:grid-cols-2">
    <div>
      <div className="avatar">
        <div className="w-16 rounded-full ring ring-blue-700 ring-offset-base-100 ring-offset-2">
          <img src="https://i.ibb.co/0VvQDMz/FB-IMG-1662878529529.jpg" alt="jakir" />
        </div>
      </div>
      <div>
        <h3 className="text-xl text-white mt-2">
          Copyright © 2023 - All right reserved by{" "}
          <Link to='/adminlogin' className=" text-blue-700  font-bold">Admin</Link >
        </h3>
        <p className="text-white mt-3">
          I am passionate about developing affordable and accessible software
          for the world of intent, and am dedicated to making a positive
          impact in this exciting and rapidly-evolving field. Visit my{" "}
          <span className="text-blue-700 underline">
            <a target="blank" href="https://github.com/mohammadjakirkhan4928">
              github profile
            </a>
          </span>
        </p>
      </div>
    </div>

    <div className="text-xl text-white rightborder ml-24 mt-5 md:mt-0 flex items-center">
      <div>
        <a
          className="flex hover:text-blue-700 items-center mt-3"
          target="blank"
          href="https://www.facebook.com/mohammad.jakirkhan.79"
        >
          <FaFacebook className="mr-5"></FaFacebook> Facebook
        </a>
        <a
          className="flex hover:text-blue-700 items-center mt-3"
          target="blank"
          href="https://www.linkedin.com/in/mohammad-jakir-khan-36b26b244/"
        >
          <FaLinkedin className="mr-5"></FaLinkedin> Linkedin
        </a>
        <a
          className="flex hover:text-blue-700 items-center mt-3"
          target="blank"
          href="https://www.instagram.com/mohammad_jakir_khan/"
        >
          <FaInstagram className="mr-5"></FaInstagram> Instagram
        </a>

        <a
          className="flex hover:text-blue-700 items-center mt-3"
          target="blank"
          href="https://twitter.com/jakirkhan4928"
        >
          <FaTwitter className="mr-5"></FaTwitter> Twitter
        </a>

      </div>


    </div>
  </div>
  )
}

export default Footer