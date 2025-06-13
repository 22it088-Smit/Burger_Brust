import React, { useState } from 'react';
import { FaTrash, FaTicketAlt, FaPercent, FaRupeeSign } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [showCouponInput, setShowCouponInput] = useState(false);

  const availableCoupons = [
    { code: 'BURGER50', discount: 50, type: 'percentage', minOrder: 500 },
    { code: 'FLAT100', discount: 100, type: 'fixed', minOrder: 300 },
    { code: 'FIRST25', discount: 25, type: 'percentage', minOrder: 200 }
  ];

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateDiscount = () => {
    if (!appliedCoupon) return 0;
    const subtotal = calculateSubtotal();
    if (subtotal < appliedCoupon.minOrder) return 0;
    
    if (appliedCoupon.type === 'percentage') {
      return (subtotal * appliedCoupon.discount) / 100;
    }
    return appliedCoupon.discount;
  };

  const applyCoupon = () => {
    const coupon = availableCoupons.find(c => c.code === couponCode.toUpperCase());
    if (coupon) {
      setAppliedCoupon(coupon);
      setShowCouponInput(false);
    } else {
      alert('Invalid coupon code');
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
  };

  const subtotal = calculateSubtotal();
  const discount = calculateDiscount();
  const total = subtotal - discount;

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-secondary">Your Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            {cartItems.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
                <Link
                  to="/menu"
                  className="inline-block bg-primary text-white px-6 py-3 rounded-full hover:bg-primary-dark transition duration-300"
                >
                  Browse Menu
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map(item => (
                  <div key={item.id} className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div className="flex-grow">
                        <h3 className="text-xl font-semibold">{item.name}</h3>
                        <p className="text-gray-600">₹{item.price}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <div className="flex items-center border rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="px-3 py-1 hover:bg-gray-100"
                            >
                              -
                            </button>
                            <span className="px-3 py-1">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="px-3 py-1 hover:bg-gray-100"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-semibold">
                          ₹{item.price * item.quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

              {/* Coupon Section */}
              <div className="mb-6">
                {!showCouponInput ? (
                  <button
                    onClick={() => setShowCouponInput(true)}
                    className="w-full flex items-center justify-center gap-2 text-primary hover:text-primary-dark transition duration-300"
                  >
                    <FaTicketAlt />
                    <span>Apply Coupon</span>
                  </button>
                ) : (
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Enter coupon code"
                        className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:border-primary"
                      />
                      <button
                        onClick={applyCoupon}
                        className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition duration-300"
                      >
                        Apply
                      </button>
                    </div>
                    <button
                      onClick={() => setShowCouponInput(false)}
                      className="text-gray-500 hover:text-gray-700 text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                )}

                {appliedCoupon && (
                  <div className="mt-2 p-3 bg-green-50 rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FaPercent className="text-green-500" />
                      <span className="text-green-700">
                        {appliedCoupon.code} applied
                      </span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-green-700 hover:text-green-900"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-₹{discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t pt-4">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <Link
                to="/checkout"
                className={`w-full bg-primary text-white py-3 rounded-full font-semibold text-center ${cartItems.length === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary-dark'} transition duration-300 mb-6`}
                style={{ pointerEvents: cartItems.length === 0 ? 'none' : 'auto' }}
              >
                Proceed to Checkout
              </Link>

              {/* Available Coupons */}
              <div className="mt-6">
                <h3 className="font-semibold mb-2">Available Coupons</h3>
                <div className="space-y-2">
                  {availableCoupons.map(coupon => (
                    <div
                      key={coupon.code}
                      className="p-3 bg-gray-50 rounded-lg flex items-center justify-between"
                    >
                      <div>
                        <p className="font-medium">{coupon.code}</p>
                        <p className="text-sm text-gray-600">
                          {coupon.type === 'percentage'
                            ? `${coupon.discount}% off`
                            : `₹${coupon.discount} off`}
                        </p>
                      </div>
                      <p className="text-sm text-gray-600">
                        Min. order ₹{coupon.minOrder}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart; 