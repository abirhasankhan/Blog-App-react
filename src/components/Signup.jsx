import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authlogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

function Signup() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState('');
    const {register, handleSubmit} = useForm();

    const signup = async (date) => {

        setError('') // Reset error message

        try {

            const userData = await authService.createAccount(date);

            if(userData) {

                const currentUser = await authService.getCurrentUser();

                if(currentUser) dispatch(authlogin(currentUser));

                navigate("/");
            }
            
        } catch (error) {
            setError(error.message)
        }
    }


	return (
		<div className="flex items-center justify-center">
			
            <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
				
                <div className="mb-2 flex justify-center">
					<span className="inline-block w-full max-w-[100px]">
						<Logo width="100px" />
					</span>
				</div>

				<h2 className="text-center text-2xl font-bold">
					Sign up to create an account
				</h2>

				<p className="mt-2 text-center text-base text-black/60">
					Already have an account? &nbsp;
					<Link
						to="/login"
						className="font-medium text-primary transition-all duration-200 hover:underline"
					>
						Sign In
					</Link>
				</p>

				{error && (
					<p className="text-red-600 mt-8 text-center">{error}</p>
				)}

				<form onSubmit={handleSubmit(signup)}>
					
                    <div className="space-y-5">

						{/* Name input field */}
						<Input
							label="Full Name"
							placeholder="Enter your full name"
							type="text"
							{...register("name", {
								required: true
							})}
						/>

						{/* Email input field */}
						<Input
							label="Email"
							placeholder="Enter your email"
							type="email"
							{...register("email", {
								required: true,
								validate: {
									// for email validation
									matchPattern: (value) => {
										const emailRegex =
											/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
										return (
											emailRegex.test(value) ||
											"Invalid email format"
										);
									},
								},
							})}
						/>

						{/* Password input field */}
						<Input
							label="Password"
							placeholder="Enter your password"
							type="password"
							{...register("password", {
								required: true,
								minLength: 6,
								validate: {
									matchPattern: (value) => {
										const passwordRegex =
											/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
										return (
											passwordRegex.test(value) ||
											"Password must contain at least one uppercase letter, one lowercase letter and one number"
										);
									},
								},
							})}
						/>

					</div>

				
                </form>

            </div>

		</div>
	);
}

export default Signup;
