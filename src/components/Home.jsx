import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Delicious Burgers for Every Mood
              </h1>
              <p className="text-lg mb-8">
                Experience the perfect blend of flavors with our premium selection of burgers.
                Made with the finest ingredients and served with love.
              </p>
              <Link
                to="/menu"
                className="bg-white text-primary px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition duration-300 inline-flex items-center"
              >
                Order Now
                <FaArrowRight className="ml-2" />
              </Link>
            </div>
            <div className="md:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Delicious Burger"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Burgers Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Burgers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Featured Burger 1 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1553979459-d2229ba7433b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                alt="Classic Burger"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Classic Cheeseburger</h3>
                <p className="text-gray-600 mb-4">
                  Our signature beef patty with melted cheese and special sauce
                </p>
                <Link
                  to="/menu"
                  className="text-primary font-semibold hover:text-primary-dark transition duration-300 inline-flex items-center"
                >
                  View in Menu
                  <FaArrowRight className="ml-2" />
                </Link>
              </div>
            </div>

            {/* Featured Burger 2 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                alt="Spicy Burger"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Spicy Chicken Burger</h3>
                <p className="text-gray-600 mb-4">
                  Crispy chicken patty with spicy mayo and jalapeños
                </p>
                <Link
                  to="/menu"
                  className="text-primary font-semibold hover:text-primary-dark transition duration-300 inline-flex items-center"
                >
                  View in Menu
                  <FaArrowRight className="ml-2" />
                </Link>
              </div>
            </div>

            {/* Featured Burger 3 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1553979459-d2229ba7433b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                alt="Veggie Burger"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Veggie Delight</h3>
                <p className="text-gray-600 mb-4">
                  Grilled vegetables with hummus and feta cheese
                </p>
                <Link
                  to="/menu"
                  className="text-primary font-semibold hover:text-primary-dark transition duration-300 inline-flex items-center"
                >
                  View in Menu
                  <FaArrowRight className="ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 