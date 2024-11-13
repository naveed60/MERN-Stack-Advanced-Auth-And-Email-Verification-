import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
	const { fetchProducts, products } = useProductStore();

	useEffect(() => {
		fetchProducts();
	}, [fetchProducts]);

	console.log("products", products);

	return (
		<div className="container mx-auto py-12 px-4">
			<div className="flex flex-col items-center space-y-8">
				<h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 text-center">
					Current Products 🚀
				</h1>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full">
					{products.map((product) => (
						<ProductCard key={product._id} product={product} />
					))}
				</div>

				{products.length === 0 && (
					<p className="text-xl font-bold text-gray-500 text-center">
						No products found 😢{" "}
						<Link to={"/create"}>
							<span className="text-blue-500 hover:underline">Create a product</span>
						</Link>
					</p>
				)}
			</div>
		</div>
	);
};

export default HomePage;