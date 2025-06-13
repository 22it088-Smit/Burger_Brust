import React from 'react';
import { useFavorites } from '../context/FavoritesContext';
import { useCart } from '../context/CartContext';
import { FaTrash, FaShoppingCart, FaRupeeSign } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const FavoritesPage = () => {
  const { favoriteItems, removeFavorite } = useFavorites();
  const { addToCart } = useCart();

  const handleRemoveFavorite = (id, type) => {
    removeFavorite(id, type);
  };

  const handleAddToCart = (item) => {
      addToCart(item);
      toast.success(`${item.name} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-secondary">Your Favorites</h1>

        {favoriteItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-2xl font-semibold mb-4">You don't have any favorites yet!</h2>
            <p className="text-gray-600 mb-6">Browse our menu and click the heart icon to add items to your favorites.</p>
            <Link
              to="/menu"
              className="inline-block bg-primary text-white px-6 py-3 rounded-full hover:bg-primary-dark transition duration-300"
            >
              Browse Menu
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {favoriteItems.map(item => (
              <div key={`${item.id}-${item.type}`} className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
                <div className="relative">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                   {/* Remove Favorite Button */}
                    <button
                        onClick={() => handleRemoveFavorite(item.id, item.type)}
                        className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md transition duration-300 hover:scale-110 focus:outline-none"
                    >
                       <FaTrash className="text-red-500" />
                    </button>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
                    <span className="text-lg font-bold text-primary">₹{item.price.toFixed(2)}</span>
                  </div>
                  {/* Display ingredients for custom burgers */}
                  {item.type === 'custom' && item.ingredients && (
                      <div className="text-sm text-gray-600 mb-4">
                          <h4 className="font-semibold mb-1">Ingredients:</h4>
                          <ul className="list-disc list-inside">
                              {Object.entries(item.ingredients).map(([category, ingList]) => (
                                  ingList.length > 0 && (
                                      <li key={category}>
                                          <span className="capitalize">{category}</span>: {ingList.map(ing => ing.name).join(', ')}
                                      </li>
                                  )
                              ))}
                          </ul>
                      </div>
                  )}
                  {/* Display description for standard burgers (optional) */}
                  {item.type !== 'custom' && item.description && (
                      <p className="text-gray-600 mb-4 text-sm">{item.description}</p>
                  )}
                  
                  <div className="flex justify-end items-center mt-4">
                     {/* Add to Cart Button */}
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="bg-primary text-white px-4 py-2 rounded-full hover:bg-primary-dark transition duration-300 flex items-center gap-2"
                      >
                        <FaShoppingCart />
                        Add to Cart
                      </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage; 