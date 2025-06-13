import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model
    // required: true // Make required if orders must be linked to a user
  },
  items: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      // Add other item details you want to save (e.g., image, type, category, ingredients for custom burgers)
      image: { type: String },
      type: { type: String }, // e.g., 'standard', 'custom'
      category: { type: String }, // e.g., 'premium', 'simple', 'custom'
      ingredients: { type: Object } // For custom burgers
    }
  ],
  deliveryDetails: {
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    address: { type: String, required: true },
    pincode: { type: String, required: true }
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['Cash on Delivery'], // Only COD for now
    default: 'Cash on Delivery'
  },
  totalAmount: {
    type: Number,
    required: true
  },
  orderDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending'
  }
});

export default mongoose.model('Order', OrderSchema); 