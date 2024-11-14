import { useState } from "react";
import { useProductStore } from "../store/product";

const ProductCard = ({ product }) => {
	const [updatedProduct, setUpdatedProduct] = useState(product);

	const { deleteProduct, updateProduct } = useProductStore();
	const [isOpen, setIsOpen] = useState(false);
	const toast = (message, type) => {
		alert(`${type.toUpperCase()}: ${message}`);
	};

	const handleDeleteProduct = async (pid) => {
		const { success, message } = await deleteProduct(pid);
		if (!success) {
			toast(message, "error");
		} else {
			toast(message, "success");
		}
	};

	const handleUpdateProduct = async (pid, updatedProduct) => {
		const { success, message } = await updateProduct(pid, updatedProduct);
		setIsOpen(false);
		if (!success) {
			toast(message, "error");
		} else {
			toast("Product updated successfully", "success");
		}
	};

	return (
		<div className="bg-white dark:bg-white-600 shadow-lg rounded-lg overflow-hidden transform transition-all hover:-translate-y-1 hover:shadow-xl">
			<img src={product.image}  className="w-full h-48 object-cover" />

			<div className="p-4">
				<h3 className="text-lg font-semibold mb-2">{product.name}</h3>

				<p className="text-xl font-bold text-black-600 dark:text-red-800 mb-4">
					${product.price}
				</p>

				<div className="flex space-x-2">
					<button
						onClick={() => setIsOpen(true)}
						className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
					>
						Edit
					</button>
					<button
						onClick={() => handleDeleteProduct(product._id)}
						className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
					>
						Delete
					</button>
          <button
						// onClick={() => handleDeleteProduct(product._id)}
						className="p-2 w-full bg-green-500 text-white rounded hover:bg-green-800"
					>
						Add To Cart
					</button>
				</div>
			</div>

			{/* Modal for updating product */}
			{isOpen && (
				<div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
					<div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md mx-4">
						<div className="p-4 border-b border-gray-200 dark:border-gray-700">
							<h3 className="text-lg font-semibold">Update Product</h3>
							<button
								className="absolute top-4 right-4 text-gray-600 dark:text-gray-300"
								onClick={() => setIsOpen(false)}
							>
								X
							</button>
						</div>
						<div className="p-4">
							<div className="space-y-4">
								<input
									placeholder="Product Name"
									name="name"
									value={updatedProduct.name}
									onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
									className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded"
								/>
								<input
									placeholder="Price"
									name="price"
									type="number"
									value={updatedProduct.price}
									onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
									className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded"
								/>
								<input
									placeholder="Image URL"
									name="image"
									value={updatedProduct.image}
									onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
									className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded"
								/>
							</div>
						</div>

						<div className="flex justify-end p-4 border-t border-gray-200 dark:border-gray-700">
							<button
								onClick={() => handleUpdateProduct(product._id, updatedProduct)}
								className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
							>
								Update
							</button>
							<button
								onClick={() => setIsOpen(false)}
								className="ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
							>
								Cancel
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ProductCard;
