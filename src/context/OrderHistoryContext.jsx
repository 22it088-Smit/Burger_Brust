import React, { createContext, useContext, useState, useEffect } from 'react';

const OrderHistoryContext = createContext();

export const OrderHistoryProvider = ({ children }) => {
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    // Load order history from localStorage on initial load
    const savedOrderHistory = localStorage.getItem('orderHistory');
    if (savedOrderHistory) {
      setOrderHistory(JSON.parse(savedOrderHistory));
    }
  }, []);

  useEffect(() => {
    // Save order history to localStorage whenever it changes
    localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
  }, [orderHistory]);

  const addOrderToHistory = (order) => {
    setOrderHistory(prevHistory => [order, ...prevHistory]); // Add new order to the beginning
  };

  const clearOrderHistory = () => {
    setOrderHistory([]);
  };

  return (
    <OrderHistoryContext.Provider
      value={{
        orderHistory,
        addOrderToHistory,
        clearOrderHistory
      }}
    >
      {children}
    </OrderHistoryContext.Provider>
  );
};

export const useOrderHistory = () => {
  const context = useContext(OrderHistoryContext);
  if (!context) {
    throw new Error('useOrderHistory must be used within an OrderHistoryProvider');
  }
  return context;
}; 