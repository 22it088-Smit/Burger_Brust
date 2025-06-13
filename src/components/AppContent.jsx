import React, { useEffect } from "react";
import { useLocation, Routes, Route } from "react-router-dom";
import { scroller } from "react-scroll";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Menu from "./Menu";
import Deals from "./Deals";
import Review from "./Review";
import SpecialMenu from "./SpecialMenu";
import Footer from "./Footer";
import Login from "./Login";
import Register from "./Register";
import MenuPage from "./MenuPage";
import CustomizeBurger from "./CustomizeBurger";
import Cart from "./Cart";
import Checkout from "./Checkout";
import FavoritesPage from "./FavoritesPage";
import OrderHistoryPage from "./OrderHistoryPage";

const AppContent = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      scroller.scrollTo(id, {
        smooth: true,
        duration: 500,
        offset: -70,
      });
    }
  }, [location]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Menu />
                <Deals />
                <SpecialMenu />
                <Review />
              </>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/customize" element={<CustomizeBurger />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/order-history" element={<OrderHistoryPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default AppContent; 