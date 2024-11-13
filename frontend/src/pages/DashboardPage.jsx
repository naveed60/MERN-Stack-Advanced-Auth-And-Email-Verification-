import { useState } from "react";
import { motion } from "framer-motion";
import { DollarSign, Image, Tag } from "lucide-react"; // icons for product name, price, and image
import Input from "../components/Input"; // Assuming the Input component is reusable
import { useProductStore } from "../store/product";

const CreatePage = () => {
	const [newProduct, setNewProduct] = useState({
		name: "",
		price: "",
		image: "",
	});
	const { createProduct } = useProductStore();

	const handleAddProduct = async () => {
		const { success, message } = await createProduct(newProduct);
		alert(success ? `Success: ${message}` : `Error: ${message}`);
		if (success) {
			setNewProduct({ name: "", price: "", image: "" });
		}
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className='max-w-xl w-full bg-blue-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden mx-auto py-12'
		>
			<div className='p-8'>
				<h1 className='text-4xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>
					Create New Product
				</h1>

				<form onSubmit={(e) => { e.preventDefault(); handleAddProduct(); }}>
					<Input
						icon={Tag} // icon for product name
						type='text'
						placeholder='Product Name'
						value={newProduct.name}
						onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
					/>

					<Input
						icon={DollarSign} // icon for price
						type='number'
						placeholder='Price'
						value={newProduct.price}
						onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
					/>

					<Input
						icon={Image} // icon for image URL
						type='text'
						placeholder='Image URL'
						value={newProduct.image}
						onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
					/>

					<motion.button
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						className='w-full py-3 px-4 mt-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'
						type='submit'
					>
						Add Product
					</motion.button>
				</form>
			</div>
		</motion.div>
	);
};

export default CreatePage;
