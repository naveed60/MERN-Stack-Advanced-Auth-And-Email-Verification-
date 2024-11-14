import { create } from "zustand";

// Set the correct API URL based on the environment
const API_URL = import.meta.env.MODE === "development" ? "http://localhost:5000/api/products" : "/api/products";

export const useProductStore = create((set) => ({
	products: [],
	isLoading: false,  // Added a loading state
	error: null,       // Added an error state

	setProducts: (products) => set({ products }),

	createProduct: async (newProduct) => {
		if (!newProduct.name || !newProduct.image || !newProduct.price) {
			return { success: false, message: "Please fill in all fields." };
		}
		try {
			set({ isLoading: true, error: null });
			const res = await fetch(`${API_URL}`, {  // Using the API_URL here
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newProduct),
			});
			const data = await res.json();
			if (!res.ok) throw new Error(data.message || "Error creating product");
			
			set((state) => ({ products: [...state.products, data.data], isLoading: false }));
			return { success: true, message: "Product created successfully" };
		} catch (error) {
			set({ isLoading: false, error: error.message });
			return { success: false, message: error.message };
		}
	},

	fetchProducts: async () => {
		try {
			set({ isLoading: true, error: null });
			const res = await fetch(`${API_URL}`); // Using API_URL for fetching products
			const data = await res.json();
			if (!res.ok) throw new Error(data.message || "Error fetching products");
			
			set({ products: data.data, isLoading: false });
		} catch (error) {
			set({ isLoading: false, error: error.message });
		}
	},

	deleteProduct: async (pid) => {
		try {
			set({ isLoading: true, error: null });
			const res = await fetch(`${API_URL}/${pid}`, {  // Using API_URL for delete
				method: "DELETE",
			});
			const data = await res.json();
			if (!res.ok) throw new Error(data.message || "Error deleting product");

			set((state) => ({
				products: state.products.filter((product) => product._id !== pid),
				isLoading: false,
			}));
			return { success: true, message: data.message };
		} catch (error) {
			set({ isLoading: false, error: error.message });
			return { success: false, message: error.message };
		}
	},

	updateProduct: async (pid, updatedProduct) => {
		try {
			set({ isLoading: true, error: null });
			const res = await fetch(`${API_URL}/${pid}`, {  // Using API_URL for update
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(updatedProduct),
			});
			const data = await res.json();
			if (!res.ok) throw new Error(data.message || "Error updating product");

			set((state) => ({
				products: state.products.map((product) => (product._id === pid ? data.data : product)),
				isLoading: false,
			}));
			return { success: true, message: data.message };
		} catch (error) {
			set({ isLoading: false, error: error.message });
			return { success: false, message: error.message };
		}
	},
}));
