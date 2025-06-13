import React from 'react';
import { useOrderHistory } from '../context/OrderHistoryContext';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import { FaShoppingCart, FaCalendarAlt, FaRupeeSign } from 'react-icons/fa';

const OrderHistoryPage = () => {
  const { orderHistory } = useOrderHistory();
  const { addToCart } = useCart();

  const handleReorder = (order) => {
    order.items.forEach(item => {
      // When reordering a custom burger, ensure we pass all necessary details
      // Standard burgers can be added directly.
      // Need to ensure the item structure is compatible with addToCart.
      // The items stored in history already have the necessary structure.
      addToCart({...item, quantity: item.quantity}); // Add items with their original quantity
    });
    toast.success(`Items from Order #${order.id} added to your cart!`);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-secondary">Order History</h1>

        {orderHistory.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-2xl font-semibold mb-4">No past orders found.</h2>
            <p className="text-gray-600 text-xl">Place your first order and it will appear here!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orderHistory.map(order => (
              <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Order #{order.id}</h2>
                  <span className="text-gray-600 text-sm flex items-center gap-1">
                    <FaCalendarAlt />
                    {new Date(order.orderDate).toLocaleDateString()}
                  </span>
                </div>
                
                <div className="border-t border-b py-4 mb-4">
                  <h3 className="font-semibold mb-2">Items:</h3>
                  <ul className="space-y-2">
                    {order.items.map((item, index) => (
                      <li key={index} className="flex justify-between text-sm text-gray-700">
                        <span>{item.name} (x{item.quantity})</span>
                        <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="font-bold text-lg flex items-center gap-1">
                     Total: <FaRupeeSign />{order.totalAmount.toFixed(2)}
                  </div>
                   <button
                      onClick={() => handleReorder(order)}
                      className="bg-primary text-white px-4 py-2 rounded-full hover:bg-primary-dark transition duration-300 flex items-center gap-2"
                   >
                       <FaShoppingCart />
                       Reorder
                   </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistoryPage; 