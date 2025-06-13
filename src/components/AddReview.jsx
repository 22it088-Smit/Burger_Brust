import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { toast } from 'react-toastify';

const AddReview = ({ onReviewSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    rating: 0,
    review: '',
  });
  const [hover, setHover] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.rating || !formData.review) {
      toast.error('Please fill in all fields');
      return;
    }
    onReviewSubmit(formData);
    setFormData({ name: '', rating: 0, review: '' });
    toast.success('Review submitted successfully!');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4 text-secondary dark:text-gray-200">Add Your Review</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">Your Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Enter your name"
          />
        </div>
        
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">Rating</label>
          <div className="flex gap-2">
            {[...Array(5)].map((_, index) => {
              const ratingValue = index + 1;
              return (
                <FaStar
                  key={index}
                  className="cursor-pointer text-2xl"
                  color={ratingValue <= (hover || formData.rating) ? "#ffc107" : "#e4e5e9"}
                  onClick={() => setFormData({ ...formData, rating: ratingValue })}
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(0)}
                />
              );
            })}
          </div>
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">Your Review</label>
          <textarea
            value={formData.review}
            onChange={(e) => setFormData({ ...formData, review: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            rows="4"
            placeholder="Share your experience..."
          />
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark transition duration-300"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default AddReview; 