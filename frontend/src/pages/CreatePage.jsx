import { useState } from "react";
import { useProductStore } from "../store/product";

const CreatePage = () => {
	const [newProduct, setNewProduct] = useState({
		name: "",
		price: "",
		image: "",
	});
	const [isLoading, setIsLoading] = useState(false);  // Loading state
	const { createProduct } = useProductStore();
	const [errorMessage, setErrorMessage] = useState(""); // To store error messages

	const handleAddProduct = async () => {
		// Simple form validation
		if (!newProduct.name || !newProduct.price || !newProduct.image) {
			setErrorMessage("Please fill in all fields.");
			return;
		}

		setIsLoading(true);  // Start loading
		setErrorMessage(""); // Reset error message

		// Call the store's createProduct function
		const { success, message } = await createProduct(newProduct);
		setIsLoading(false);  // Stop loading

		if (success) {
			alert(`Success: ${message}`);
			setNewProduct({ name: "", price: "", image: "" });  // Clear form
		} else {
			alert(`Error: ${message}`);
			setErrorMessage(message); // Set error message if any
		}
	};

	return (
		<div className="max-w-xl mx-auto py-12">
			<div className="flex flex-col items-center space-y-8">
				<h1 className="text-4xl font-bold text-center mb-8">Create New Product</h1>

				<div className="w-full bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
					<div className="flex flex-col space-y-4">
						{/* Input for Product Name */}
						<input
							placeholder="Product Name"
							name="name"
							value={newProduct.name}
							onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
							className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded"
							disabled={isLoading} // Disable input while loading
						/>

						{/* Input for Price */}
						<input
							placeholder="Price"
							name="price"
							type="number"
							value={newProduct.price}
							onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
							className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded"
							disabled={isLoading}
						/>

						{/* Input for Image URL */}
						<input
							placeholder="Image URL"
							name="image"
							value={newProduct.image}
							onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
							className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded"
							disabled={isLoading}
						/>

						{/* Error message */}
						{errorMessage && <p className="text-red-500">{errorMessage}</p>}

						{/* Submit Button */}
						<button
							onClick={handleAddProduct}
							disabled={isLoading}  // Disable button when loading
							className={`w-full p-2 text-white rounded ${isLoading ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-600"}`}
						>
							{isLoading ? "Adding..." : "Add Product"}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreatePage;
