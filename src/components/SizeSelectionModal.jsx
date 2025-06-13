import React from 'react';

const SizeSelectionModal = ({ showModal, selectedMenuItem, onClose, onConfirm }) => {
  const [selectedSize, setSelectedSize] = React.useState('');

  React.useEffect(() => {
    if (showModal) {
      // Reset selected size when modal opens for a new item
      setSelectedSize('');
    }
  }, [showModal, selectedMenuItem]);

  const handleConfirm = () => {
    if (selectedSize) {
      onConfirm(selectedSize);
      onClose();
    } else {
      alert('Please select a size.'); // Consider a more integrated toast/notification
    }
  };

  if (!showModal || !selectedMenuItem) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 shadow-lg max-w-sm w-full mx-4">
        <h2 className="text-2xl font-bold mb-4 text-secondary">Select Size for {selectedMenuItem.name}</h2>
        <div className="space-y-4 mb-6">
          {Object.entries(selectedMenuItem.sizes).map(([size, price]) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`w-full text-left px-4 py-3 rounded-lg border-2 transition duration-300
                ${selectedSize === size ? 'border-primary bg-primary text-white' : 'border-gray-200 hover:border-gray-300'}`}
            >
              <span className="capitalize">{size}:</span> ₹{price}
            </button>
          ))}
        </div>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-full bg-gray-200 text-gray-800 hover:bg-gray-300 transition duration-300"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-6 py-2 rounded-full bg-primary text-white hover:bg-primary-dark transition duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default SizeSelectionModal; 