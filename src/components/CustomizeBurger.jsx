import React, { useState } from 'react';
import { FaPlus, FaMinus, FaRupeeSign } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { toast } from 'react-toastify';

const CustomizeBurger = () => {
  const [selectedIngredients, setSelectedIngredients] = useState({
    buns: [],
    patties: [],
    vegetables: [],
    sauces: [],
    cheese: [],
    extras: []
  });

  const [totalPrice, setTotalPrice] = useState(0);

  const { addToCart } = useCart();
  const { addFavorite, isFavorite } = useFavorites();

  const ingredients = {
    buns: [
      { id: 1, name: 'Classic Sesame Bun', price: 20, image: 'https://images.unsplash.com/photo-1608198093002-ad4e505484ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
      { id: 2, name: 'Whole Wheat Bun', price: 25, image: 'https://images.unsplash.com/photo-1608198093002-ad4e505484ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
      { id: 3, name: 'Brioche Bun', price: 30, image: 'https://images.unsplash.com/photo-1608198093002-ad4e505484ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' }
    ],
    patties: [
      { id: 1, name: 'Classic Beef Patty', price: 80, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
      { id: 2, name: 'Chicken Patty', price: 70, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
      { id: 3, name: 'Veg Patty', price: 60, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
      { id: 4, name: 'Paneer Patty', price: 65, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' }
    ],
    vegetables: [
      { id: 1, name: 'Lettuce', price: 10, image: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
      { id: 2, name: 'Tomato', price: 10, image: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
      { id: 3, name: 'Onion', price: 10, image: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
      { id: 4, name: 'Cucumber', price: 10, image: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
      { id: 5, name: 'Jalapeños', price: 15, image: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' }
    ],
    sauces: [
      { id: 1, name: 'Mayonnaise', price: 15, image: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
      { id: 2, name: 'Ketchup', price: 15, image: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
      { id: 3, name: 'Mustard', price: 15, image: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
      { id: 4, name: 'BBQ Sauce', price: 20, image: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
      { id: 5, name: 'Special Sauce', price: 25, image: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' }
    ],
    cheese: [
      { id: 1, name: 'Cheddar', price: 25, image: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
      { id: 2, name: 'Mozzarella', price: 25, image: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
      { id: 3, name: 'Swiss', price: 30, image: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
      { id: 4, name: 'Pepper Jack', price: 30, image: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' }
    ],
    extras: [
      { id: 1, name: 'Bacon', price: 40, image: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
      { id: 2, name: 'Egg', price: 20, image: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
      { id: 3, name: 'Mushrooms', price: 25, image: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
      { id: 4, name: 'Avocado', price: 35, image: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' }
    ]
  };

  const handleIngredientSelect = (category, ingredient) => {
    setSelectedIngredients(prev => {
      const newSelection = { ...prev };
      
      // For buns and patties, only allow one selection
      if (category === 'buns' || category === 'patties') {
        newSelection[category] = [ingredient];
      } else {
        // For other categories, toggle selection
        const index = newSelection[category].findIndex(item => item.id === ingredient.id);
        if (index === -1) {
          newSelection[category] = [...newSelection[category], ingredient];
        } else {
          newSelection[category] = newSelection[category].filter(item => item.id !== ingredient.id);
        }
      }
      
      return newSelection;
    });
  };

  const calculateTotal = () => {
    let total = 0;
    Object.values(selectedIngredients).forEach(category => {
      category.forEach(item => {
        total += item.price;
      });
    });
    return total;
  };

  const calculateTotalPrice = () => {
    let total = 0;
    Object.values(selectedIngredients).forEach(category => {
      category.forEach(item => {
        total += item.price;
      });
    });
    return total;
  };

  const generateBurgerName = (selectedIng) => {
    const bunName = selectedIng.buns.length > 0 ? selectedIng.buns[0].name : 'Custom Bun';
    const pattyName = selectedIng.patties.length > 0 ? selectedIng.patties[0].name : 'Custom Patty';
    
    // Simple approach: list a few key ingredients
    const veggieNames = selectedIng.vegetables.map(v => v.name).join(', ');
    const sauceNames = selectedIng.sauces.map(s => s.name).join(', ');
    const cheeseNames = selectedIng.cheese.map(c => c.name).join(', ');

    let name = `${bunName} with ${pattyName}`;
    if (veggieNames) name += `, ${veggieNames}`;
    if (sauceNames) name += `, ${sauceNames}`;
    if (cheeseNames) name += `, ${cheeseNames}`;
    
    // Truncate if too long
    if (name.length > 50) {
        name = name.substring(0, 47) + '...';
    }
    
    return `Custom Burger - ${name}`;
  };

  const handleAddToCart = () => {
    const burgerName = generateBurgerName(selectedIngredients);
    const totalPrice = calculateTotal();

    if (selectedIngredients.buns.length === 0 || selectedIngredients.patties.length === 0) {
        toast.error('Please select at least one bun and one patty.');
        return;
    }

    const burgerItem = {
      id: Date.now(), // Unique ID for the burger
      name: burgerName,
      price: totalPrice,
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      type: "custom",
      category: "custom",
      ingredients: selectedIngredients
    };

    addToCart(burgerItem);
    toast.success(`${burgerName} added to cart!`);
  };

  const handleAddToFavorites = () => {
    const burgerName = generateBurgerName(selectedIngredients);
    const totalPrice = calculateTotal();

    if (selectedIngredients.buns.length === 0 || selectedIngredients.patties.length === 0) {
        toast.error('Please select at least one bun and one patty before favoriting.');
        return;
    }

    const favoriteBurgerItem = {
      id: JSON.stringify(selectedIngredients, Object.keys(selectedIngredients).sort()),
      name: burgerName,
      price: totalPrice,
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      type: "custom",
      category: "custom",
      ingredients: selectedIngredients
    };

    addFavorite(favoriteBurgerItem);
  };

  const renderIngredientSection = (category, title) => (
    <div className="mb-8">
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ingredients[category].map(ingredient => (
          <div
            key={ingredient.id}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
              selectedIngredients[category].some(item => item.id === ingredient.id)
                ? 'border-primary bg-primary bg-opacity-10'
                : 'border-gray-200 hover:border-primary'
            }`}
            onClick={() => handleIngredientSelect(category, ingredient)}
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold">{ingredient.name}</h4>
                <p className="text-gray-600">₹{ingredient.price}</p>
              </div>
              {selectedIngredients[category].some(item => item.id === ingredient.id) ? (
                <FaMinus className="text-primary" />
              ) : (
                <FaPlus className="text-gray-400" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-secondary">Customize Your Burger</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Ingredient Selection */}
          <div className="lg:col-span-2">
            {renderIngredientSection('buns', 'Choose Your Bun')}
            {renderIngredientSection('patties', 'Select Your Patty')}
            {renderIngredientSection('vegetables', 'Add Vegetables')}
            {renderIngredientSection('sauces', 'Pick Your Sauces')}
            {renderIngredientSection('cheese', 'Add Cheese')}
            {renderIngredientSection('extras', 'Extra Toppings')}
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
              <h2 className="text-2xl font-bold mb-4">Your Burger</h2>
              
              <div className="space-y-4 mb-6">
                {Object.entries(selectedIngredients).map(([category, items]) => (
                  items.length > 0 && (
                    <div key={category}>
                      <h3 className="font-semibold capitalize mb-2">{category}</h3>
                      <ul className="space-y-1">
                        {items.map(item => (
                          <li key={item.id} className="flex justify-between text-sm">
                            <span>{item.name}</span>
                            <span>₹{item.price}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
                ))}
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold text-lg">Total</span>
                  <span className="font-bold text-lg text-primary">₹{calculateTotal()}</span>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-primary text-white py-3 rounded-full font-semibold hover:bg-primary-dark transition duration-300 mb-4"
                >
                  Add to Cart - ₹{calculateTotal()}
                </button>

                <button
                  onClick={handleAddToFavorites}
                  className={`w-full text-primary border border-primary py-3 rounded-full font-semibold hover:bg-primary hover:text-white transition duration-300 ${calculateTotal() === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={calculateTotal() === 0}
                >
                  Add to Favorites
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizeBurger; 