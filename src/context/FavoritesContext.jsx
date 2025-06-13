import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favoriteItems, setFavoriteItems] = useState([]);

  useEffect(() => {
    // Load favorites from localStorage on initial load
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavoriteItems(JSON.parse(savedFavorites));
    }
  }, []);

  useEffect(() => {
    // Save favorites to localStorage whenever they change
    localStorage.setItem('favorites', JSON.stringify(favoriteItems));
  }, [favoriteItems]);

  const addFavorite = (item) => {
    setFavoriteItems(prevItems => {
      // Check if item already exists based on a unique identifier (e.g., id or a generated unique key for custom burgers)
      const existingItem = prevItems.find(i => i.id === item.id && i.type === item.type);
      
      if (existingItem) {
        toast.info(`${item.name} is already in your favorites!`);
        return prevItems;
      } else {
        const newFavorites = [...prevItems, item];
        toast.success(`${item.name} added to favorites!`);
        return newFavorites;
      }
    });
  };

  const removeFavorite = (id, type) => {
    setFavoriteItems(prevItems => prevItems.filter(item => !(item.id === id && item.type === type)));
    toast.info('Item removed from favorites.');
  };

  const isFavorite = (id, type) => {
    return favoriteItems.some(item => item.id === id && item.type === type);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favoriteItems,
        addFavorite,
        removeFavorite,
        isFavorite
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}; 