import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";

const Navbar = () => {
	const { user, login, logout } = useAuthStore();

	const handleAuthAction = () => {
		if (user) {
			logout();
		} else {
			login(); // You may replace this with your actual login function
		}
	};

	return (
		<motion.nav
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className="flex justify-between items-center p-4 bg-blue-900 shadow-lg"
		>
			{/* Left: User Info */}
			<div className="flex items-center space-x-4">
				{user ? (
					<>
						<div className="text-white font-semibold">{user.name}</div>
						<div className="text-gray-400 text-sm">{user.email}</div>
					</>
				) : (
					<div className="text-gray-400">Welcome, Guest</div>
				)}
			</div>

			{/* Right: Login/Logout Button */}
			<motion.button
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
				onClick={handleAuthAction}
				className="py-2 px-4 bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-semibold 
					rounded-lg hover:from-teal-600 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-teal-500 
					focus:ring-offset-2 focus:ring-offset-gray-800"
			>
				{user ? "Logout" : "Login"}
			</motion.button>
		</motion.nav>
	);
};

export default Navbar;
