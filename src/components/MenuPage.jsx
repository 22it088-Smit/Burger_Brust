import React, { useState, useEffect } from 'react';
// Dark mode test comment
import { FaFilter, FaLeaf, FaDrumstickBite, FaSeedling, FaRupeeSign, FaArrowRight, FaHeart as FaHeartSolid } from 'react-icons/fa';
import { GiCrownCoin } from 'react-icons/gi';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { toast } from 'react-toastify';
import SizeSelectionModal from '../components/SizeSelectionModal';

const MenuPage = () => {
  const location = useLocation();

  const [activeFilters, setActiveFilters] = useState({
    type: 'all', // all, veg, non-veg, vegan
    category: 'all', // all, premium, simple, beverages, sides, combo, hotdeal
    priceRange: 'all', // all, 0-50, 50-100, 100-200, 200+
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    if (categoryParam === 'hotdeal') {
      setActiveFilters(prev => ({ ...prev, category: 'hotdeal' }));
    }
  }, [location.search]);

  const { addToCart } = useCart();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const [showSizeModal, setShowSizeModal] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');

  const burgers = [
    // Premium Non-Veg Burgers
    {
      id: 1,
      name: "Maharaja Mac Supreme",
      description: "Double chicken tikka patty with aged cheddar, caramelized onions, and royal sauce",
      price: 299,
      image: "https://images.pexels.com/photos/13573666/pexels-photo-13573666.jpeg?auto=compress&cs=tinysrgb&w=600",
      type: "non-veg",
      category: "premium",
      rating: 4.8,
      isSpicy: true,
    },
    {
      id: 2,
      name: "Tandoori Chicken Deluxe",
      description: "Tandoori marinated chicken with mint chutney and premium cheese",
      price: 279,
      image: "https://img.freepik.com/premium-photo/burger-with-fish-cutlet-with-tomatoes-sauce_524291-2551.jpg?semt=ais_hybrid&w=740",
      type: "non-veg",
      category: "premium",
      rating: 4.7,
      isSpicy: true,
    },
    {
      id: 3,
      name: "Butter Chicken Burger",
      description: "Creamy butter chicken patty with mozzarella and garlic naan bun",
      price: 319,
      image: "https://img.freepik.com/premium-photo/close-up-crispy-chicken-burger-with-lettuce-tomato_70216-1651.jpg?semt=ais_hybrid&w=740",
      type: "non-veg",
      category: "premium",
      rating: 4.9,
      isSpicy: false,
    },
    {
      id: 4,
      name: "Mutton Seekh Kabab Burger",
      description: "Spiced mutton seekh kabab with saffron aioli and crispy onions",
      price: 349,
      image: "https://img.freepik.com/premium-photo/juicy-cheeseburger-with-toppings_861748-7341.jpg?semt=ais_hybrid&w=740",
      type: "non-veg",
      category: "premium",
      rating: 4.8,
      isSpicy: true,
    },
    {
      id: 5,
      name: "Fish Tikka Royal",
      description: "Grilled fish tikka with coconut chutney and curry leaves",
      price: 329,
      image: "https://img.freepik.com/premium-photo/fresh-tasty-burger_61813-253.jpg?semt=ais_hybrid&w=740",
      type: "non-veg",
      category: "premium",
      rating: 4.6,
      isSpicy: false,
    },
    {
      id: 6,
      name: "Chicken Biryani Burger",
      description: "Chicken biryani patty with raita sauce and fried onions",
      price: 289,
      image: "https://img.freepik.com/premium-photo/closeup-buttery-pav-with-rich-bhaji-b_1207919-35026.jpg?semt=ais_hybrid&w=740",
      type: "non-veg",
      category: "premium",
      rating: 4.7,
      isSpicy: true,
    },
    {
      id: 7,
      name: "Goan Fish Curry Burger",
      description: "Coconut fish curry patty with curry leaves and lime zest",
      price: 309,
      image: "https://img.freepik.com/free-photo/front-view-meat-doner-bread-board_141793-4635.jpg?semt=ais_hybrid&w=740",
      type: "non-veg",
      category: "premium",
      rating: 4.5,
      isSpicy: true,
    },
    {
      id: 8,
      name: "Hyderabadi Mutton Burger",
      description: "Slow-cooked mutton with dum spices and saffron mayo",
      price: 359,
      image: "https://img.freepik.com/free-photo/front-view-meat-hamburger-with-fresh-tomatoes-dark-background_179666-19387.jpg?semt=ais_hybrid&w=740",
      type: "non-veg",
      category: "premium",
      rating: 4.9,
      isSpicy: true,
    },

    // Premium Veg Burgers
    {
      id: 9,
      name: "Paneer Makhani Deluxe",
      description: "Grilled paneer in rich tomato gravy with cashew cream",
      price: 249,
      image: "https://img.freepik.com/free-photo/burger-with-mayonnaise-sauce-it_188544-15976.jpg?ga=GA1.1.2062938120.1749649998&semt=ais_hybrid&w=740",
      type: "veg",
      category: "premium",
      rating: 4.6,
      isSpicy: false,
    },
    {
      id: 10,
      name: "Mushroom Tikka Supreme",
      description: "Tandoori mushrooms with truffle aioli and aged cheese",
      price: 229,
      image: "https://img.freepik.com/premium-photo/juicy-beef-cheese-burge_208861-7984.jpg?ga=GA1.1.2062938120.1749649998&semt=ais_hybrid&w=740",
      type: "veg",
      category: "premium",
      rating: 4.5,
      isSpicy: false,
    },
    {
      id: 11,
      name: "Palak Paneer Burger",
      description: "Spinach and cottage cheese patty with garlic naan bun",
      price: 239,
      image: "https://img.freepik.com/free-photo/close-up-vegetarian-burger-cutting-board_23-2148784533.jpg?ga=GA1.1.2062938120.1749649998&semt=ais_hybrid&w=740",
      type: "veg",
      category: "premium",
      rating: 4.4,
      isSpicy: false,
    },
    {
      id: 12,
      name: "Rajasthani Dal Baati Burger",
      description: "Spiced lentil patty with ghee-roasted baati crumbs",
      price: 219,
      image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      type: "veg",
      category: "premium",
      rating: 4.3,
      isSpicy: true,
    },
    {
      id: 13,
      name: "Chole Bhature Burger",
      description: "Spiced chickpea patty with bhature bun and pickle mayo",
      price: 199,
      image: "https://img.freepik.com/free-photo/flat-lay-delicious-vegan-burgers_23-2148305744.jpg?ga=GA1.1.2062938120.1749649998&semt=ais_hybrid&w=740",
      type: "veg",
      category: "premium",
      rating: 4.5,
      isSpicy: true,
    },

    // Premium Vegan Burgers
    {
      id: 14,
      name: "Quinoa Tikka Masala",
      description: "Quinoa and vegetable patty with cashew-based tikka sauce",
      price: 269,
      image: "https://img.freepik.com/free-photo/sandwich-hamburger-with-juicy-burgers-tomato-red-cabbage_2829-4119.jpg?ga=GA1.1.2062938120.1749649998&semt=ais_hybrid&w=740",
      type: "vegan",
      category: "premium",
      rating: 4.4,
      isSpicy: true,
    },
    {
      id: 15,
      name: "Jackfruit Biryani Burger",
      description: "Spiced jackfruit with coconut yogurt and mint chutney",
      price: 259,
      image: "https://img.freepik.com/free-photo/high-angle-delicious-hamburger_23-2148575449.jpg?ga=GA1.1.2062938120.1749649998&semt=ais_hybrid&w=740",
      type: "vegan",
      category: "premium",
      rating: 4.3,
      isSpicy: true,
    },
    {
      id: 16,
      name: "Beetroot Tikki Deluxe",
      description: "Roasted beetroot and quinoa patty with tahini sauce",
      price: 239,
      image: "https://img.freepik.com/free-photo/vegan-burgers-with-lentils-pistashios_661915-259.jpg?ga=GA1.1.2062938120.1749649998&semt=ais_hybrid&w=740",
      type: "vegan",
      category: "premium",
      rating: 4.2,
      isSpicy: false,
    },

    // Simple Non-Veg Burgers
    {
      id: 17,
      name: "Classic Chicken Burger",
      description: "Grilled chicken patty with lettuce, tomato, and mayo",
      price: 149,
      image: "https://img.freepik.com/free-photo/tasty-burger-with-onion-sauces_23-2148374930.jpg?ga=GA1.1.2062938120.1749649998&semt=ais_hybrid&w=740",
      type: "non-veg",
      category: "simple",
      rating: 4.2,
      isSpicy: false,
    },
    {
      id: 18,
      name: "Spicy Chicken Tikka",
      description: "Marinated chicken tikka with spicy mayo and onions",
      price: 169,
      image: "https://img.freepik.com/free-photo/front-view-tasty-meat-burger-with-cheese-salad-dark-background_140725-89597.jpg?ga=GA1.1.2062938120.1749649998&semt=ais_hybrid&w=740",
      type: "non-veg",
      category: "simple",
      rating: 4.4,
      isSpicy: true,
    },
    {
      id: 19,
      name: "Chicken Keema Burger",
      description: "Spiced chicken mince patty with mint chutney",
      price: 159,
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      type: "non-veg",
      category: "simple",
      rating: 4.3,
      isSpicy: true,
    },
    {
      id: 20,
      name: "Fish Fry Burger",
      description: "Crispy fried fish with tartar sauce and lettuce",
      price: 179,
      image: "https://img.freepik.com/free-photo/grilled-cheeseburger-fries-refreshment-lunch-generated-by-ai_188544-16106.jpg?ga=GA1.1.2062938120.1749649998&semt=ais_hybrid&w=740",
      type: "non-veg",
      category: "simple",
      rating: 4.1,
      isSpicy: false,
    },
    {
      id: 21,
      name: "Mutton Keema Special",
      description: "Spiced mutton mince with caramelized onions",
      price: 189,
      image: "https://img.freepik.com/free-photo/cheeseburger-with-side-fries-ketchup-1_140725-1726.jpg?ga=GA1.1.2062938120.1749649998&semt=ais_hybrid&w=740",
      type: "non-veg",
      category: "simple",
      rating: 4.5,
      isSpicy: true,
    },
    {
      id: 22,
      name: "Chicken Masala Burger",
      description: "Chicken in traditional masala with fresh herbs",
      price: 169,
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      type: "non-veg",
      category: "simple",
      rating: 4.3,
      isSpicy: true,
    },
    {
      id: 23,
      name: "Egg Bhurji Burger",
      description: "Spiced scrambled eggs with onions and peppers",
      price: 129,
      image: "https://img.freepik.com/free-photo/close-up-delicious-food_23-2149303582.jpg?ga=GA1.1.2062938120.1749649998&semt=ais_hybrid&w=740",
      type: "non-veg",
      category: "simple",
      rating: 4.0,
      isSpicy: true,
    },
    {
      id: 24,
      name: "Chicken Curry Burger",
      description: "Chicken curry patty with traditional spices",
      price: 159,
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      type: "non-veg",
      category: "simple",
      rating: 4.2,
      isSpicy: true,
    },
    {
      id: 25,
      name: "Prawn Masala Burger",
      description: "Coastal style prawn masala with coconut",
      price: 199,
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      type: "non-veg",
      category: "simple",
      rating: 4.4,
      isSpicy: true,
    },

    // Simple Veg Burgers
    {
      id: 26,
      name: "Aloo Tikki Classic",
      description: "Traditional potato patty with tamarind chutney",
      price: 99,
      image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      type: "veg",
      category: "simple",
      rating: 4.3,
      isSpicy: false,
    },
    {
      id: 27,
      name: "Paneer Tikka Burger",
      description: "Grilled paneer with mint and coriander chutney",
      price: 139,
      image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      type: "veg",
      category: "simple",
      rating: 4.4,
      isSpicy: false,
    },
    {
      id: 28,
      name: "Veggie Delight",
      description: "Mixed vegetables with hummus and cheese",
      price: 119,
      image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      type: "veg",
      category: "simple",
      rating: 4.1,
      isSpicy: false,
    },
    {
      id: 29,
      name: "Corn & Cheese Burger",
      description: "Sweet corn kernels with melted cheese",
      price: 129,
      image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      type: "veg",
      category: "simple",
      rating: 4.2,
      isSpicy: false,
    },
    {
      id: 30,
      name: "Mushroom Masala",
      description: "Spiced mushrooms with onions and peppers",
      price: 149,
      image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      type: "veg",
      category: "simple",
      rating: 4.3,
      isSpicy: true,
    },
    {
      id: 31,
      name: "Rajma Burger",
      description: "Kidney bean patty with traditional spices",
      price: 109,
      image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      type: "veg",
      category: "simple",
      rating: 4.0,
      isSpicy: true,
    },
    {
      id: 32,
      name: "Cauliflower Tikka",
      description: "Tandoori cauliflower with yogurt sauce",
      price: 119,
      image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      type: "veg",
      category: "simple",
      rating: 4.1,
      isSpicy: false,
    },
    {
      id: 33,
      name: "Spinach & Cheese",
      description: "Fresh spinach with cottage cheese and herbs",
      price: 139,
      image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      type: "veg",
      category: "simple",
      rating: 4.2,
      isSpicy: false,
    },
    {
      id: 34,
      name: "Masala Aloo Burger",
      description: "Spiced potato patty with green chutney",
      price: 89,
      image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      type: "veg",
      category: "simple",
      rating: 4.0,
      isSpicy: true,
    },
    {
      id: 35,
      name: "Cheese Corn Tikki",
      description: "Corn and cheese patty with mayo",
      price: 119,
      image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      type: "veg",
      category: "simple",
      rating: 4.1,
      isSpicy: false,
    },

    // Simple Vegan Burgers
    {
      id: 36,
      name: "Quinoa Veggie Burger",
      description: "Quinoa and mixed vegetables with tahini",
      price: 159,
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      type: "vegan",
      category: "simple",
      rating: 4.0,
      isSpicy: false,
    },
    {
      id: 37,
      name: "Chickpea Tikki",
      description: "Spiced chickpea patty with mint chutney",
      price: 129,
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      type: "vegan",
      category: "simple",
      rating: 4.1,
      isSpicy: true,
    },
    {
      id: 38,
      name: "Lentil Masala Burger",
      description: "Mixed lentil patty with traditional spices",
      price: 119,
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      type: "vegan",
      category: "simple",
      rating: 3.9,
      isSpicy: true,
    },
    {
      id: 39,
      name: "Sweet Potato Tikki",
      description: "Roasted sweet potato with coconut chutney",
      price: 109,
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      type: "vegan",
      category: "simple",
      rating: 4.0,
      isSpicy: false,
    },
    {
      id: 40,
      name: "Black Bean Burger",
      description: "Spiced black beans with avocado spread",
      price: 139,
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      type: "vegan",
      category: "simple",
      rating: 4.1,
      isSpicy: false,
    },
    {
      id: 41,
      name: "Tofu Tikka Masala",
      description: "Marinated tofu with cashew-based sauce",
      price: 149,
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      type: "vegan",
      category: "simple",
      rating: 4.2,
      isSpicy: true,
    },
    {
      id: 42,
      name: "Mushroom & Quinoa",
      description: "Grilled mushrooms with quinoa and herbs",
      price: 159,
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      type: "vegan",
      category: "simple",
      rating: 4.0,
      isSpicy: false,
    },
    {
      id: 43,
      name: "Spinach & Lentil",
      description: "Fresh spinach with red lentil patty",
      price: 129,
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      type: "vegan",
      category: "simple",
      rating: 3.9,
      isSpicy: true,
    },
    {
      id: 44,
      name: "Cauliflower & Chickpea",
      description: "Roasted cauliflower with chickpea hummus",
      price: 139,
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      type: "vegan",
      category: "simple",
      rating: 4.0,
      isSpicy: false,
    },
    {
      id: 45,
      name: "Jackfruit Curry Burger",
      description: "Young jackfruit in traditional curry spices",
      price: 149,
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      type: "vegan",
      category: "simple",
      rating: 4.1,
      isSpicy: true,
    },
  ];

  const coldDrinks = [
    {
      id: 101,
      name: "Coca-Cola",
      description: "Classic carbonated soft drink",
      price: 60,
      image: "https://imgs.search.brave.com/C_PDcsOtUEUBt1w4iYTcDnPuq374MpdVejkhls3pPMw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNDg3/Nzg3MTA4L3Bob3Rv/L2Nhbi1vZi1jb2Nh/LWNvbGEtb24taWNl/LmpwZz9zPTYxMng2/MTImdz0wJms9MjAm/Yz14RFNPX25sMHFl/RE1CWkpCSmswOWpq/NV9VZVFreVE3MFFk/WHVETUJ5Q2FZPQ",
      type: "veg",
      category: "beverages",
      sizes: {
        small: 60,
        medium: 80,
        large: 100
      },
      rating: 4.5,
      isSpicy: false,
    },
    {
      id: 102,
      name: "Sprite",
      description: "Lemon-lime flavored carbonated drink",
      price: 60,
      image: "https://imgs.search.brave.com/Yrv-LtwQ4BbS7_RxB0k6qxcs_OUNfOTVsJXGvTa8gGo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNDU4/NjMzNDYzL3Bob3Rv/L3Nwcml0ZS1jYW4t/b24taWNlLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz1xR0NF/Nm92TWZVYzNhWm1x/bzd1QmZEX0lYSmtr/YVkzcUVrVVNMM3dX/Rk1zPQ",
      type: "veg",
      category: "beverages",
      sizes: {
        small: 60,
        medium: 80,
        large: 100
      },
      rating: 4.4,
      isSpicy: false,
    },
    {
      id: 103,
      name: "Fanta",
      description: "Orange flavored carbonated drink",
      price: 60,
      image: "https://imgs.search.brave.com/yeVFY1pgMGI_FX6vnCktk6sg4-H0LoUXVDq5RhZchNo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNTM3/Njk5NjIxL3Bob3Rv/L2ZhbnRhLWRyaW5r/LWluLWNhbi1vbi1p/Y2UtaXNvbGF0ZWQt/b24td2hpdGUtYmFj/a2dyb3VuZC5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9U1ly/ZnlUalR1a2FSNl9J/c1d1c21PWC0yLVpq/Q0Y1VXl1dkZaRUFx/VENocz0",
      type: "veg",
      category: "beverages",
      sizes: {
        small: 60,
        medium: 80,
        large: 100
      },
      rating: 4.3,
      isSpicy: false,
    },
    {
      id: 104,
      name: "Thums Up",
      description: "Strong cola drink with a bold taste",
      price: 60,
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Thum%27s_Up_%2815124224444%29.jpg/500px-Thum%27s_Up_%2815124224444%29.jpg",
      type: "veg",
      category: "beverages",
      sizes: {
        small: 60,
        medium: 80,
        large: 100
      },
      rating: 4.6,
      isSpicy: false,
    },
    {
      id: 105,
      name: "Lemonade",
      description: "Fresh squeezed lemonade with mint",
      price: 70,
      image: "https://imgs.search.brave.com/4Yl4a2LY975iB6_Xu7gAXWMrgaZqcsjpzD-qrWTEaBs/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvNTk1/NjI2MTAwL3Bob3Rv/L2ljZWQtdGVhLWFu/ZC1taW50LWluLWds/YXNzLWphci5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9ZHV2/bDlTNkZyc3FERDVz/R1ZEbUVKM216ZFVY/NXEwdjhDNS10MGJt/bnVvOD0",
      type: "veg",
      category: "beverages",
      sizes: {
        small: 70,
        medium: 90,
        large: 110
      },
      rating: 4.7,
      isSpicy: false,
    }
  ];

  const frenchFries = [
    {
      id: 201,
      name: "Classic Fries",
      description: "Crispy golden fries with sea salt",
      price: 80,
      image: "https://thumbs.dreamstime.com/b/golden-fried-french-fries-tomato-ketchup-served-wooden-board-over-rustic-background-selective-focus-223920764.jpg?w=768",
      type: "veg",
      category: "sides",
      sizes: {
        small: 80,
        medium: 120,
        large: 160
      },
      rating: 4.8,
      isSpicy: false,
    },
    {
      id: 202,
      name: "Cheese Fries",
      description: "Loaded with melted cheese and herbs",
      price: 120,
      image: "https://imgs.search.brave.com/66E7-KV26-3lIHiLPa1Nuyo2tsaCq2Cq9mG39V06bnw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTMw/MTgwMjE1MS9waG90/by9jaGVkZGFyLWNo/ZWVzZS1wb3VyZWQt/b3ItcHVsbGVkLWZy/b20tb24tdG9wLWRl/ZXAtZnJpZWQtZnJl/bmNoLWZyaWVzLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz1J/WE9kUFdhLTYtOGVZ/SHVwN3FiU1hiNy1z/dFFpZzYyZjdLTDdo/NEJmUnJFPQ",
      type: "veg",
      category: "sides",
      sizes: {
        small: 120,
        medium: 160,
        large: 200
      },
      rating: 4.7,
      isSpicy: false,
    },
    {
      id: 203,
      name: "Peri-Peri Fries",
      description: "Spicy peri-peri seasoned fries",
      price: 100,
      image: "https://thumbs.dreamstime.com/b/tasty-spicy-peri-peri-fries-mayonnaise-served-plate-over-rustic-wooden-background-selective-focus-tasty-spicy-223921260.jpg?w=768",
      type: "veg",
      category: "sides",
      sizes: {
        small: 100,
        medium: 140,
        large: 180
      },
      rating: 4.6,
      isSpicy: true,
    },
    {
      id: 204,
      name: "Loaded Fries",
      description: "Fries topped with cheese, jalapeños, and special sauce",
      price: 150,
      image: "https://thumbs.dreamstime.com/b/peri-french-fries-cheese-255297954.jpg?w=768",
      type: "veg",
      category: "sides",
      sizes: {
        small: 150,
        medium: 190,
        large: 230
      },
      rating: 4.9,
      isSpicy: true,
    },
    {
      id: 205,
      name: "Curly Fries",
      description: "Crispy spiral-cut fries with special seasoning",
      price: 90,
      image: "https://thumbs.dreamstime.com/b/spicy-seasoned-curly-fries-ready-to-eat-39229614.jpg?w=768",
      type: "veg",
      category: "sides",
      sizes: {
        small: 90,
        medium: 130,
        large: 170
      },
      rating: 4.5,
      isSpicy: false,
    }
  ];

  const healthyCheaperCombos = [
    {
      id: 301,
      name: "Classic Lite Combo",
      description: "Classic Chicken Burger + Small Fries + Coca-Cola (Small)",
      price: 250,
      image: "https://images.pexels.com/photos/5679547/pexels-photo-5679547.jpeg?auto=compress&cs=tinysrgb&w=600",
      type: "non-veg",
      category: "combo",
      rating: 4.5,
      isSpicy: false,
      isHotDeal: true,
    },
    {
      id: 302,
      name: "Veggie Saver Combo",
      description: "Aloo Tikki Classic + Small Fries + Sprite (Small)",
      price: 180,
      image: "https://images.pexels.com/photos/14701528/pexels-photo-14701528.jpeg?auto=compress&cs=tinysrgb&w=600",
      type: "veg",
      category: "combo",
      rating: 4.3,
      isSpicy: false,
    },
    {
      id: 303,
      name: "Quick Bite Combo",
      description: "Spicy Chicken Tikka + Lemonade (Medium)",
      price: 200,
      image: "https://images.pexels.com/photos/8130753/pexels-photo-8130753.jpeg?auto=compress&cs=tinysrgb&w=600",
      type: "non-veg",
      category: "combo",
      rating: 4.2,
      isSpicy: true,
    },
    {
      id: 304,
      name: "Crispy Veg Combo",
      description: "Veggie Delight Burger + Small Curly Fries + Lemonade (Small)",
      price: 190,
      image: "https://images.pexels.com/photos/28261840/pexels-photo-28261840/free-photo-of-a-burger-and-fries-on-a-plate-next-to-a-can-of-coke.jpeg?auto=compress&cs=tinysrgb&w=600",
      type: "veg",
      category: "combo",
      rating: 4.0,
      isSpicy: false,
      isHotDeal: true,
    },
    {
      id: 305,
      name: "Chicken Zing Combo",
      description: "Classic Chicken Burger + Peri-Peri Fries + Sprite (Small)",
      price: 230,
      image: "https://images.pexels.com/photos/10774905/pexels-photo-10774905.jpeg?auto=compress&cs=tinysrgb&w=600",
      type: "non-veg",
      category: "combo",
      rating: 4.1,
      isSpicy: true,
    },
  ];

  const premiumCombos = [
    {
      id: 401,
      name: "Maharaja Feast Combo",
      description: "Maharaja Mac Supreme + Loaded Fries + Thums Up (Large)",
      price: 550,
      image: "https://images.pexels.com/photos/11462876/pexels-photo-11462876.jpeg?auto=compress&cs=tinysrgb&w=600",
      type: "non-veg",
      category: "premium_combo",
      rating: 4.9,
      isSpicy: true,
      isHotDeal: true,
    },
    {
      id: 402,
      name: "Paneer Royal Combo",
      description: "Paneer Makhani Deluxe + Cheese Fries + Fanta (Large)",
      price: 480,
      image: "https://images.pexels.com/photos/2903384/pexels-photo-2903384.jpeg?auto=compress&cs=tinysrgb&w=600",
      type: "veg",
      category: "premium_combo",
      rating: 4.8,
      isSpicy: false,
    },
    {
      id: 403,
      name: "Vegan Supreme Combo",
      description: "Quinoa Tikka Masala + Curly Fries + Lemonade (Large)",
      price: 400,
      image: "https://images.pexels.com/photos/15662061/pexels-photo-15662061/free-photo-of-burger-and-chips-with-a-glass-of-beer.jpeg?auto=compress&cs=tinysrgb&w=600",
      type: "vegan",
      category: "premium_combo",
      rating: 4.7,
      isSpicy: true,
    },
    {
      id: 404,
      name: "Spicy Grand Combo",
      description: "Mutton Seekh Kabab Burger + Peri-Peri Fries + Coca-Cola (Large)",
      price: 520,
      image: "https://images.pexels.com/photos/18713428/pexels-photo-18713428/free-photo-of-hamburger-and-french-fries-served-in-a-restaurant.jpeg?auto=compress&cs=tinysrgb&w=600",
      type: "non-veg",
      category: "premium_combo",
      rating: 4.6,
      isSpicy: true,
      isHotDeal: true,
    },
  ];

  const hotDeals = [
    healthyCheaperCombos[0],
    healthyCheaperCombos[2],
    healthyCheaperCombos[3],
    healthyCheaperCombos[4],
    premiumCombos[0],
    premiumCombos[3],
    burgers[0],
    coldDrinks[0],
  ];

  const allMenuItems = [...burgers, ...coldDrinks, ...frenchFries, ...healthyCheaperCombos, ...premiumCombos];

  const filteredMenuItems = allMenuItems.filter(item => {
    if (activeFilters.type !== 'all' && item.type !== activeFilters.type) return false;
    if (activeFilters.category !== 'all' && item.category !== activeFilters.category) {
      if (activeFilters.category === 'hotdeal') {
        if (!item.isHotDeal) return false;
      } else if (item.category !== activeFilters.category) {
        return false;
      }
    }
    if (activeFilters.priceRange !== 'all') {
      const price = item.price;
      switch (activeFilters.priceRange) {
        case '0-50':
          if (price > 50) return false;
          break;
        case '50-100':
          if (price < 50 || price > 100) return false;
          break;
        case '100-200':
          if (price < 100 || price > 200) return false;
          break;
        case '200+':
          if (price < 200) return false;
          break;
        default:
          break;
      }
    }
    return true;
  });

  const handleFilterChange = (filterType, value) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleAddToCart = (item) => {
    if (item.category === 'beverages' || item.category === 'sides') {
      setSelectedMenuItem(item);
      setShowSizeModal(true);
    } else {
      // For burgers, add directly to cart
      addToCart(item);
      toast.success(`${item.name} added to cart!`);
    }
  };

  const handleConfirmSize = (size) => {
    if (selectedMenuItem && size) {
      const itemWithSize = {
        ...selectedMenuItem,
        selectedSize: size,
        price: selectedMenuItem.sizes[size]
      };
      addToCart(itemWithSize);
      toast.success(`${selectedMenuItem.name} (${size}) added to cart!`);
    }
    setShowSizeModal(false);
    setSelectedMenuItem(null);
    setSelectedSize('');
  };

  const handleCloseModal = () => {
    setShowSizeModal(false);
    setSelectedMenuItem(null);
    setSelectedSize('');
  };

  const handleToggleFavorite = (burger) => {
    if (isFavorite(burger.id, burger.type)) {
      removeFavorite(burger.id, burger.type);
    } else {
      addFavorite(burger);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* Customization Promotion */}
        <div className="bg-gradient-to-r from-primary to-primary-dark rounded-2xl p-8 mb-8 text-white dark:text-gray-100">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-4">Create Your Dream Burger</h2>
              <p className="text-lg mb-8">
                Unleash your creativity and craft the perfect burger with our premium ingredients.
                Choose from a variety of buns, patties, toppings, and sauces to make it uniquely yours!
              </p>
              <Link
                to="/customize"
                className="inline-flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition duration-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
              >
                Start Customizing
                <FaArrowRight />
              </Link>
            </div>
            <div className="flex-1 flex justify-center">
              <img
                src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                alt="Custom Burger"
                className="w-64 h-64 object-cover rounded-lg shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300"
              />
            </div>
          </div>
        </div>

        {/* Existing Menu Content */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters */}
          <div className="md:w-1/4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-md p-6 mb-8">
              <h3 className="text-2xl font-bold mb-4 text-secondary dark:text-gray-200">Filters</h3>
              <div className="space-y-6">
                {/* Type Filter */}
                <div>
                  <span className="font-semibold text-lg mb-2 block text-secondary dark:text-gray-300">Type:</span>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleFilterChange('type', 'all')}
                      className={`px-4 py-2 rounded-full ${activeFilters.type === 'all' ? 'bg-primary text-white' : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white'}`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => handleFilterChange('type', 'veg')}
                      className={`px-4 py-2 rounded-full flex items-center space-x-2 ${activeFilters.type === 'veg' ? 'bg-green-500 text-white' : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white'}`}
                    >
                      <FaLeaf />
                      <span>Veg</span>
                    </button>
                    <button
                      onClick={() => handleFilterChange('type', 'non-veg')}
                      className={`px-4 py-2 rounded-full flex items-center space-x-2 ${activeFilters.type === 'non-veg' ? 'bg-red-500 text-white' : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white'}`}
                    >
                      <FaDrumstickBite />
                      <span>Non-Veg</span>
                    </button>
                    <button
                      onClick={() => handleFilterChange('type', 'vegan')}
                      className={`px-4 py-2 rounded-full flex items-center space-x-2 ${activeFilters.type === 'vegan' ? 'bg-green-700 text-white' : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white'}`}
                    >
                      <FaSeedling />
                      <span>Vegan</span>
                    </button>
                  </div>
                </div>

                {/* Category Filter */}
                <div>
                  <span className="font-semibold text-lg mb-2 block text-secondary dark:text-gray-300">Category:</span>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleFilterChange('category', 'all')}
                      className={`px-4 py-2 rounded-full ${activeFilters.category === 'all' ? 'bg-primary text-white' : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white'}`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => handleFilterChange('category', 'premium')}
                      className={`px-4 py-2 rounded-full flex items-center space-x-2 ${activeFilters.category === 'premium' ? 'bg-yellow-500 text-white' : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white'}`}
                    >
                      <GiCrownCoin className="mr-1" />
                      <span>Premium</span>
                    </button>
                    <button
                      onClick={() => handleFilterChange('category', 'simple')}
                      className={`px-4 py-2 rounded-full ${activeFilters.category === 'simple' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white'}`}
                    >
                      Simple
                    </button>
                    <button
                      onClick={() => handleFilterChange('category', 'beverages')}
                      className={`px-4 py-2 rounded-full flex items-center space-x-2 ${activeFilters.category === 'beverages' ? 'bg-blue-400 text-white' : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white'}`}
                    >
                      <span>Beverages</span>
                    </button>
                    <button
                      onClick={() => handleFilterChange('category', 'sides')}
                      className={`px-4 py-2 rounded-full flex items-center space-x-2 ${activeFilters.category === 'sides' ? 'bg-orange-500 text-white' : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white'}`}
                    >
                      <span>Sides</span>
                    </button>
                    <button
                      onClick={() => handleFilterChange('category', 'combo')}
                      className={`px-4 py-2 rounded-full flex items-center space-x-2 ${activeFilters.category === 'combo' ? 'bg-purple-600 text-white' : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white'}`}
                    >
                      <span>Combos</span>
                    </button>
                    <button
                      onClick={() => handleFilterChange('category', 'hotdeal')}
                      className={`px-4 py-2 rounded-full flex items-center space-x-2 ${activeFilters.category === 'hotdeal' ? 'bg-red-600 text-white' : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white'}`}
                    >
                      <span>Hot Deals</span>
                    </button>
                  </div>
                </div>

                {/* Price Range Filter */}
                <div>
                  <span className="font-semibold text-lg mb-2 block text-secondary dark:text-gray-300">Price Range:</span>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleFilterChange('priceRange', 'all')}
                      className={`px-4 py-2 rounded-full ${activeFilters.priceRange === 'all' ? 'bg-primary text-white' : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white'}`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => handleFilterChange('priceRange', '0-50')}
                      className={`px-4 py-2 rounded-full flex items-center space-x-2 ${activeFilters.priceRange === '0-50' ? 'bg-green-500 text-white' : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white'}`}
                    >
                      <FaRupeeSign />
                      <span>0-50</span>
                    </button>
                    <button
                      onClick={() => handleFilterChange('priceRange', '50-100')}
                      className={`px-4 py-2 rounded-full flex items-center space-x-2 ${activeFilters.priceRange === '50-100' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white'}`}
                    >
                      <FaRupeeSign />
                      <span>50-100</span>
                    </button>
                    <button
                      onClick={() => handleFilterChange('priceRange', '100-200')}
                      className={`px-4 py-2 rounded-full flex items-center space-x-2 ${activeFilters.priceRange === '100-200' ? 'bg-purple-500 text-white' : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white'}`}
                    >
                      <FaRupeeSign />
                      <span>100-200</span>
                    </button>
                    <button
                      onClick={() => handleFilterChange('priceRange', '200+')}
                      className={`px-4 py-2 rounded-full flex items-center space-x-2 ${activeFilters.priceRange === '200+' ? 'bg-red-500 text-white' : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white'}`}
                    >
                      <FaRupeeSign />
                      <span>200+</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Burger Grid */}
          <div className="md:w-3/4">
            {/* Results Count */}
            <div className="mb-6">
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Showing {filteredMenuItems.length} of {allMenuItems.length} items
              </p>
            </div>

            {/* Burger Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredMenuItems.map(item => (
                <div key={item.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-md overflow-hidden transform transition duration-300 hover:scale-105">
                  <div className="relative">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-48 object-cover"
                    />
                    {item.isSpicy && (
                      <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm">
                        Spicy
                      </span>
                    )}
                    {item.category === 'premium' && (
                      <span className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-sm flex items-center">
                        <GiCrownCoin className="mr-1" />
                        Premium
                      </span>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">{item.name}</h3>
                      {item.category === 'beverages' || item.category === 'sides' ? (
                        <div className="text-right">
                          <div className="text-sm text-gray-600 dark:text-gray-300">Sizes:</div>
                          <div className="text-sm">
                            <span className="text-primary">S: ₹{item.sizes.small}</span>
                            <span className="mx-1 dark:text-gray-300">|</span>
                            <span className="text-primary">M: ₹{item.sizes.medium}</span>
                            <span className="mx-1 dark:text-gray-300">|</span>
                            <span className="text-primary">L: ₹{item.sizes.large}</span>
                          </div>
                        </div>
                      ) : (
                        <span className="text-lg font-bold text-primary">₹{item.price}</span>
                      )}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">{item.description}</p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <span className="text-yellow-500">★</span>
                        <span className="text-gray-600 dark:text-gray-300">{item.rating}</span>
                        <div className="flex items-center ml-2">
                          {item.type === 'veg' && <FaLeaf className="text-green-500 text-sm" />}
                          {item.type === 'non-veg' && <FaDrumstickBite className="text-red-500 text-sm" />}
                          {item.type === 'vegan' && <FaSeedling className="text-green-700 text-sm" />}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleToggleFavorite(item)}
                          className="p-2 bg-white dark:bg-gray-700 rounded-full shadow-md dark:shadow-md transition duration-300 hover:scale-110 focus:outline-none"
                        >
                          {isFavorite(item.id, item.type) ? (
                            <FaHeartSolid className="text-red-500" />
                          ) : (
                            <FaHeartSolid className="text-gray-400 dark:text-gray-300 hover:text-red-500" />
                          )}
                        </button>
                        <button
                          onClick={() => handleAddToCart(item)}
                          className="bg-primary text-white px-4 py-2 rounded-full hover:bg-primary-dark transition duration-300"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* No Results */}
            {filteredMenuItems.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-300 text-lg">No items found matching your filters.</p>
                <button 
                  onClick={() => setActiveFilters({ type: 'all', category: 'all', priceRange: 'all' })}
                  className="mt-4 bg-primary text-white px-6 py-2 rounded-full hover:bg-primary-dark transition duration-300"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Size Selection Modal */}
        <SizeSelectionModal
          showModal={showSizeModal}
          selectedMenuItem={selectedMenuItem}
          onClose={handleCloseModal}
          onConfirm={handleConfirmSize}
        />
      </div>
    </div>
  );
};

export default MenuPage;