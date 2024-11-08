import React from 'react';

const ProductCard = ({ image, name, price, onAddToCart }) => {
  return (
    <div className="max-w-xs bg-white shadow-lg rounded-lg overflow-hidden">
      <img className="w-full h-48 object-cover" src={image} alt={name} />
      
      <div className="p-4">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-gray-600 mt-2">${price.toFixed(2)}</p>

        <button
          onClick={onAddToCart}
          className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
