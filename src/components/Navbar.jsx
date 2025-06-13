import React, { useState, useEffect } from "react";
import { Link as ScrollLink, scroller } from "react-scroll";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import DarkMode from "../layouts/DarkMode";
import logo from "../assets/img/logo.png";
import { FaBars, FaTimes, FaShoppingCart, FaHeart, FaHistory } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { cartItemsCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleReviewClick = () => {
    if (location.pathname !== '/') {
      navigate('/#review');
    } else {
      scroller.scrollTo('review', {
        smooth: true,
        duration: 500,
        offset: -70,
      });
    }
  };

  return (
    <header className=" fixed w-full z-10 py-4 bg-tertiary shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
      {/* desktop navigation section  */}
      <div className="container flex flex-row justify-between items-center">
        <div>
          <RouterLink to="/">
            <div className="flex items-center gap-2">
              <img
                src={logo}
                alt="Logo"
                className="w-8 h-8 object-contain transition-transform duration-300 ease-in-out hover:rotate-12 hover:scale-110"
              />

              <h1 className="font-semibold text-2xl text-secondary">BurgerBurst.</h1>
            </div>
          </RouterLink>
        </div>

        <nav className=" hidden lg:flex gap-10 text-secondary font-semibold text-lg">
          <RouterLink
            to="/menu"
            className="cursor-pointer hover:text-primary transition duration-300 ease-in-out"
          >
            Menu
          </RouterLink>
          <ScrollLink
            to="deals"
            spy={true}
            smooth={true}
            duration={500}
            offset={-70} 
            className="cursor-pointer hover:text-primary transition duration-300 ease-in-out"
          >
            Hot Deals
          </ScrollLink>
          <RouterLink
            to="/customize"
            className="cursor-pointer hover:text-primary transition duration-300 ease-in-out"
          >
            Customize Burger
          </RouterLink>
          <button
            onClick={handleReviewClick}
            className="cursor-pointer hover:text-primary transition duration-300 ease-in-out bg-transparent border-none text-secondary font-semibold text-lg p-0"
          >
            Review
          </button>
        </nav>
        <div className=" flex items-center gap-4">
          <div>
            <DarkMode />
          </div>
          {isLoggedIn ? (
            <div className="flex gap-4 items-center">
              <RouterLink
                to="/favorites"
                className="text-secondary hover:text-primary transition duration-300 ease-in-out"
              >
                <FaHeart className="text-xl" />
              </RouterLink>
              <RouterLink
                to="/order-history"
                className="text-secondary hover:text-primary transition duration-300 ease-in-out"
              >
                <FaHistory className="text-xl" />
              </RouterLink>
              <button
                onClick={handleLogout}
                className=" bg-secondary py-2 px-4 text-white font-semibold rounded-md hover:scale-105 transition duration-300 ease-in-out"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-4">
              <RouterLink 
                to="/login"
                className=" bg-secondary py-2 px-4 text-white font-semibold rounded-md hover:scale-105 transition duration-300 ease-in-out flex items-center justify-center"
              >
                Login
              </RouterLink>
              <RouterLink 
                to="/register"
                className=" bg-primary py-2 px-4 text-white font-semibold rounded-md hover:scale-105 transition duration-300 ease-in-out flex items-center justify-center"
              >
                 Sign Up
              </RouterLink>
            </div>
          )}

          <RouterLink 
            to="/menu"
            className="bg-secondary py-2 px-4 text-white font-semibold rounded-md hover:scale-105 transition duration-300 ease-in-out"
          >
            Order Now
          </RouterLink>

          <RouterLink 
            to="/cart"
            className="relative p-2 text-secondary hover:text-primary transition duration-300 ease-in-out"
          >
            <FaShoppingCart className="text-2xl" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartItemsCount}
              </span>
            )}
          </RouterLink>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <button
          className="text-gray-700 hover:text-primary transition duration-300"
          onClick={toggleMenu}
        >
          {isOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden py-4">
          <div className="flex flex-col space-y-4 px-4">
            <RouterLink
              to="/menu"
              className="text-gray-700 hover:text-primary transition duration-300"
              onClick={toggleMenu}
            >
              Menu
            </RouterLink>
            <ScrollLink
              to="deals"
              spy={true}
              smooth={true}
              duration={500}
              offset={-70} 
              className="text-gray-700 hover:text-primary transition duration-300"
              onClick={toggleMenu}
            >
              Hot Deals
            </ScrollLink>
            <RouterLink
              to="/customize"
              className="text-gray-700 hover:text-primary transition duration-300"
              onClick={toggleMenu}
            >
              Customize Burger
            </RouterLink>
            <button
              onClick={() => { handleReviewClick(); toggleMenu(); }}
              className="text-gray-700 hover:text-primary transition duration-300 bg-transparent border-none font-semibold text-lg p-0 text-left"
            >
              Review
            </button>

            {isLoggedIn && (
                <>
                    <RouterLink
                        to="/favorites"
                        className="text-gray-700 hover:text-primary transition duration-300 flex items-center gap-2"
                        onClick={toggleMenu}
                    >
                        <FaHeart />
                        <span>Favorites</span>
                    </RouterLink>
                    <RouterLink
                        to="/order-history"
                        className="text-gray-700 hover:text-primary transition duration-300 flex items-center gap-2"
                        onClick={toggleMenu}
                    >
                        <FaHistory />
                        <span>Order History</span>
                    </RouterLink>
                </>
            )}

            <div className="flex flex-col space-y-2">
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-primary transition duration-300 text-left"
                >
                  Logout
                </button>
              ) : (
                <div className="flex flex-col space-y-2">
                  <RouterLink 
                    to="/login"
                    className="text-gray-700 hover:text-primary transition duration-300"
                    onClick={toggleMenu}
                  >
                    Login
                  </RouterLink>
                  <RouterLink 
                    to="/register"
                    className="bg-primary text-white px-4 py-2 rounded-full hover:bg-primary-dark transition duration-300 text-center"
                    onClick={toggleMenu}
                  >
                    Register
                  </RouterLink>
                </div>
              )}
            </div>
            <RouterLink
              to="/cart"
              className="text-gray-700 hover:text-primary transition duration-300 flex items-center gap-2"
              onClick={toggleMenu}
            >
              <FaShoppingCart />
              <span>Cart ({cartItemsCount})</span>
            </RouterLink>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
