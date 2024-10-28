import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {login as authlogin} from '../store/authSlice'
import {Button, Input, Logo} from './index'
import {useDispatch} from 'react-redux'
import authService from '../appwrite/auth'
import {useForm} from 'react-hook-form'

/**
 * Attempts to log in a user with the provided credentials.
 * 
 * @param {Object} date - The login credentials, including email and password.
 * @returns {Promise<void>} - The promise resolves when login is attempted.
 * 
 * If successful, dispatches a login action with user data and navigates to the home page.
 * If an error occurs during login, sets an error message.
 */
function Login() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState('')

    const login = async (date) => {

        setError('') // Reset error message
        try {
            const session = await authService.logIn(date)

            if(session) {

                const userDate = await authService.getCurrentUser()

                if(userDate) dispatch(authlogin({userDate}));

                navigate("/");
            }

        } catch (error) {
            setError(error.message)
        }
    }


    return (
		<div className="flex items-center justify-center w-full">
			<div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
				<span className="inline-block w-full max-w-[100px]">
					<Logo width="100px" />
				</span>
			</div>

			<h2 className="text-center text-2xl font-bold">
				Sign in to your account
			</h2>

			<p className="mt-2 text-center text-base text-black/60">
				Don&apos;t have an account? &nbsp;
				<Link
					to="/signup"
					className="font-medium text-primary transition-all duration-200 hover:underline"
				>
					Sign Up
				</Link>
			</p>

			{error && <p className="text-red-600 mt-8 text-center">{error}</p>}

			<form onSubmit={handleSubmit(login)} className="mt-8">
				<div className="space-y-5">

					{/* Email input field */}
					<Input
						label="Email"
						placeholder="Enter your email"
						type="email"
						{...register("email", {
							required: true
						})}
					/>

                    {/* Password input field */}
                    <Input 
                    label="Password"
                    placeholder="Enter your password"
                    type="password"
                    {...register("password", {
                        required: true
					})}
                    />

                    <Button
                    type='submit'
                    className="w-full"
                    >
                        Sign in
                    </Button>

				</div>
			</form>
		</div>
	);
}

export default Login