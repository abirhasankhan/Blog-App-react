import { useDispatch } from 'react-redux';
import './App.css'
import { useState, useEffect } from 'react';
import authService from "./appwrite/auth";
import { login, logout } from './store/authSlice';
import { Header, Footer } from './components';


function App() {
	const [loading, setLoading] = useState(true);

	const dispatch = useDispatch();

	// checking current user session
	useEffect(() => {
		authService
			.getCurrentUser()
			.then((userData) => {
				if (userData) {
					// console.log("Login action dispatched");
					dispatch(login({ userData }));
				} else {
					// console.log("Logout action dispatched");
					dispatch(logout());
				}
			})
			.catch((error) => {
				console.log(
					"Appwrite service :: getCurrentUser :: Error",
					error.message
				);
			})
			.finally(() => setLoading(false));
	});

	return !loading ? (
		<div className="min-h-screen flex flex-wrap content-between bg-gray-400">
			<div className="w-full block">
				<Header />
				<main>
					{/* <Outlet />  */}
					TODO
				</main>
				<Footer />
			</div>
		</div>
	) : null;
}

export default App
