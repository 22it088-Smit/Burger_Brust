import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useOrderHistory } from '../context/OrderHistoryContext';
import { FaRupeeSign } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const { addOrderToHistory } = useOrderHistory();
  const navigate = useNavigate();

  const [deliveryDetails, setDeliveryDetails] = useState({
    name: '',
    mobile: '',
    address: '',
    pincode: ''
  });

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const subtotal = calculateSubtotal();
  // For now, we'll assume no discounts on checkout page unless a coupon is applied earlier
  const discount = 0; // You would integrate coupon logic here if needed
  const total = subtotal - discount;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeliveryDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!deliveryDetails.name || !deliveryDetails.mobile || !deliveryDetails.address || !deliveryDetails.pincode) {
      toast.error('Please fill in all delivery details.');
      return;
    }

    if (cartItems.length === 0) {
        toast.error('Your cart is empty.');
        return;
    }

    const order = {
        items: cartItems.map(item => ({
             // Only include necessary fields for the backend
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            // Include other fields if needed by backend model, e.g.:
            image: item.image || '',
            type: item.type || 'standard',
            category: item.category || 'simple',
            ingredients: item.ingredients || null, // For custom burgers
        })),
        deliveryDetails: deliveryDetails,
        paymentMethod: 'Cash on Delivery',
        totalAmount: total,
        orderDate: new Date().toISOString(), // Include order date
    };

    try {
        console.log('Sending order data:', order);
        // Send order data to the backend
        const response = await fetch('/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Include authorization header if authentication is required for placing orders
                // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(order),
        });

        console.log('Response status:', response.status);

        const result = await response.json();
        console.log('Response body:', result);

        if (response.ok) {
            console.log('Order placed successfully in DB:', result);
            // Add the order to history context (optional, could refetch history from backend)
            addOrderToHistory({...order, id: result.orderId || Date.now()}); // Use ID from backend if available
            clearCart();
            toast.success('Order Placed Successfully! Your delicious burgers are on their way!');
            navigate('/'); // Redirect to home page
        } else {
            console.error('Failed to place order:', result.message || 'Server returned an error.');
            toast.error(result.message || 'Failed to place order. Please try again.');
        }

    } catch (err) {
        console.error('Error placing order (network or unexpected):', err);
        toast.error('An error occurred while placing your order. Please try again later.');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 py-8 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4 text-secondary">Checkout</h1>
          <p className="text-gray-700 text-xl">Your cart is empty. Please add items before checking out.</p>
          <Link
            to="/menu"
            className="inline-block bg-primary text-white px-6 py-3 rounded-full hover:bg-primary-dark transition duration-300 mt-6"
          >
            Browse Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-secondary">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Delivery Details Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6">Delivery Information</h2>
              <form onSubmit={handlePlaceOrder} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={deliveryDetails.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="mobile" className="block text-gray-700 font-semibold mb-2">Mobile Number</label>
                  <input
                    type="tel"
                    id="mobile"
                    name="mobile"
                    value={deliveryDetails.mobile}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="address" className="block text-gray-700 font-semibold mb-2">Delivery Address</label>
                  <textarea
                    id="address"
                    name="address"
                    value={deliveryDetails.address}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary"
                    required
                  ></textarea>
                </div>
                <div>
                  <label htmlFor="pincode" className="block text-gray-700 font-semibold mb-2">Pincode</label>
                  <input
                    type="text"
                    id="pincode"
                    name="pincode"
                    value={deliveryDetails.pincode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary"
                    required
                  />
                </div>
                
                {/* Payment Method */}
                <div>
                  <h3 className="text-xl font-bold mb-4">Payment Method</h3>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="cod"
                      name="paymentMethod"
                      value="cod"
                      checked
                      readOnly // Only Cash on Delivery for now
                      className="mr-2"
                    />
                    <label htmlFor="cod" className="text-gray-700">Cash on Delivery</label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-white py-3 rounded-full font-semibold hover:bg-primary-dark transition duration-300"
                >
                  Place Order
                </button>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6">
                {cartItems.map(item => (
                  <div key={item.id} className="flex justify-between items-center text-gray-700 text-sm">
                    <span>{item.name} (x{item.quantity})</span>
                    <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4 space-y-2">
                 <div className="flex justify-between text-gray-700">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                 </div>
                 {/* Discount display can be added here if coupon logic is integrated */}
                 <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout; 