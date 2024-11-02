import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import { formatDate } from "../utils/date";

const DashboardPage = () => {
	const { user, logout } = useAuthStore();

	const handleLogout = () => {
		logout();
	};

	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.9 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0.9 }}
			transition={{ duration: 0.5 }}
			className="max-w-lg w-full mx-auto mt-10 p-8 bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-md rounded-2xl shadow-2xl border border-gray-700"
		>
			{/* Dashboard Header */}
			<h2 className="text-4xl font-extrabold mb-8 text-center bg-gradient-to-r from-teal-400 to-cyan-600 text-transparent bg-clip-text">
				Welcome, {user.name}!
			</h2>

			<div className="space-y-8">
				{/* Profile Information */}
				<motion.div
					className="p-6 bg-gray-800 bg-opacity-60 rounded-lg border border-gray-700"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2 }}
				>
					<h3 className="text-2xl font-semibold text-teal-400 mb-4">Profile Information</h3>
					<p className="text-gray-300"><span className="font-semibold">Name:</span> {user.name}</p>
					<p className="text-gray-300"><span className="font-semibold">Email:</span> {user.email}</p>
				</motion.div>

				{/* Account Activity */}
				<motion.div
					className="p-6 bg-gray-800 bg-opacity-60 rounded-lg border border-gray-700"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.4 }}
				>
					<h3 className="text-2xl font-semibold text-teal-400 mb-4">Account Activity</h3>
					<p className="text-gray-300">
						<span className="font-semibold">Joined:</span> {new Date(user.createdAt).toLocaleDateString("en-US", {
							year: "numeric",
							month: "long",
							day: "numeric",
						})}
					</p>
					<p className="text-gray-300">
						<span className="font-semibold">Last Login:</span> {formatDate(user.lastLogin)}
					</p>
				</motion.div>
			</div>

			{/* Logout Button */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.6 }}
				className="mt-8"
			>
				<motion.button
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					onClick={handleLogout}
					className="w-full py-3 px-4 bg-gradient-to-r from-teal-500 to-cyan-600 text-white 
						font-bold rounded-lg shadow-lg hover:from-teal-600 hover:to-cyan-700 
						focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-gray-900"
				>
					Logout
				</motion.button>
			</motion.div>
		</motion.div>
	);
};

export default DashboardPage;
