import React from "react";

const products = [
  { id: 1, name: "Product A", price: 29.99, imageUrl: "https://via.placeholder.com/150" },
  { id: 2, name: "Product B", price: 49.99, imageUrl: "https://via.placeholder.com/150" },
  { id: 3, name: "Product C", price: 19.99, imageUrl: "https://via.placeholder.com/150" },
  { id: 4, name: "Product D", price: 39.99, imageUrl: "https://via.placeholder.com/150" },
  { id: 5, name: "Product A", price: 29.99, imageUrl: "https://via.placeholder.com/150" },
  { id: 6, name: "Product B", price: 49.99, imageUrl: "https://via.placeholder.com/150" },
  { id: 7, name: "Product C", price: 19.99, imageUrl: "https://via.placeholder.com/150" },
  { id: 8, name: "Product D", price: 39.99, imageUrl: "https://via.placeholder.com/150" },
  // Add more products as needed
];

const DashboardPage = () => {
  return (
    <div className=" min-h-screen">
      <h1 className="text-3xl font-bold text-center p-8">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
            <img src={product.imageUrl} alt={product.name} className="h-40 w-full object-cover rounded-md mb-4" />
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-700 mb-4">${product.price.toFixed(2)}</p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
