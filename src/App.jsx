import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import { OrderHistoryProvider } from "./context/OrderHistoryContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppContent from "./components/AppContent";

const App = () => {
  return (
    <CartProvider>
      <FavoritesProvider>
        <OrderHistoryProvider>
          <Router>
            <AppContent />
          </Router>
          <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </OrderHistoryProvider>
      </FavoritesProvider>
    </CartProvider>
  );
};

export default App;
