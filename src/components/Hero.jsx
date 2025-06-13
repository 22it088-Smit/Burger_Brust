import React from "react";
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import heroImage from "../assets/img/hero.jpg"; // Correctly import the image

const Hero = () => {
  return (
    <div
      className="relative min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Optional overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-50 dark:bg-black dark:bg-opacity-70 z-0"></div>

      <div className="relative z-10 container flex flex-col justify-center items-center text-center px-4 text-white dark:text-gray-200">
        <div className="w-full md:w-2/3 space-y-6 text-center">
          <h3 className="font-bold text-4xl md:text-5xl text-white dark:text-gray-200">Dive into our</h3>
          <h1 className="font-bold text-5xl md:text-7xl text-primary mt-2">
            Cheesy Bluster!
          </h1>
          <p className="text-lg text-white dark:text-gray-300">
            We know you're obviously a fan of desi flavours and have your heart set on it. 
            Your search for the best Indian fusion burgers ends here. With the taste of India in every bite, 
            we have thoughtfully curated our menu to serve the Indian palette. Bursting with flavours, our wide range 
            of burgers will always make you crave for more.
          </p>
          <Link
            to="/menu"
            className="bg-white text-primary px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition duration-300 inline-flex items-center dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
          >
            Order Now
            <FaArrowRight className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
