import Link from 'next/link';
import React from 'react';
import Layout from '../components/Layout';
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { errorHandler } from '../utils/errorHandler';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useState } from 'react';
import ReactLoading from 'react-loading';

export default function LoginScreen() {
	const [loading, setLoading] = useState(false);
	const { data: session } = useSession();
	const { push, query } = useRouter();
	const { redirect } = query;

	useEffect(() => {
		if (session?.user) {
			push(redirect || '/');
		}
	}, [session, redirect]);

	const {
		handleSubmit,
		register,
		formState: { errors },
		getValues,
	} = useForm();

	const submitHandler = async ({ name, email, password }) => {
		try {
			setLoading(true);
			await axios.post('/api/auth/signup', {
				name,
				email,
				password,
			});
			const result = await signIn('credentials', {
				redirect: false,
				email,
				password,
			});
			setLoading(false);
			if (result.error) {
				setLoading(false);
				toast.error(result.error);
			}
		} catch (err) {
			setLoading(false);
			toast.error(errorHandler(err));
		}
	};

	return (
		<Layout title={'Create Account'}>
			<form
				onSubmit={handleSubmit(submitHandler)}
				className="max-w-screen-lg bg-[#363636]/50 sm:px-16 py-10 mt-10 flex flex-col items-center mx-auto"
			>
				<h1 className="mb-4 text-3xl text-center font-semibold uppercase text-green-200">
					Create Account
				</h1>

				<div className="mt-5">
					<div className="mb-7">
						<input
							{...register('name', {
								required: 'Please enter your name',
							})}
							type="text"
							className="w-full"
							id="name"
							placeholder="Name"
						/>
						{errors.name && (
							<div className="text-green-200">
								<em>* {errors.name.message}</em>
							</div>
						)}
					</div>

					<div className="mb-7">
						<input
							{...register('email', {
								required: 'Please enter email',
								pattern: {
									value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
									message: 'Invalid email format',
								},
							})}
							type="email"
							className="w-full"
							id="email"
							placeholder="Email"
						/>
						{errors.email && (
							<div className="text-green-200">
								<em>* {errors.email.message} </em>
							</div>
						)}
					</div>

					<div className="mb-7">
						<input
							{...register('password', {
								required: 'Please enter password',
								minLength: {
									value: 6,
									message: 'password must be at least 6 chars',
								},
							})}
							type="password"
							className="w-full"
							id="password"
							placeholder="Password"
						/>
						{errors.password && (
							<div className="text-green-200">
								<em>* {errors.password.message}</em>
							</div>
						)}
					</div>

					<div className="mb-7">
						<input
							{...register('confirmPassword', {
								required: 'Please confirm your password',
								validate: (value) => value === getValues('password'),
								minLength: {
									value: 6,
									message: 'password must be at least 6 chars',
								},
							})}
							type="password"
							className="w-full"
							id="confirmPassword"
							placeholder="Confirm Password"
						/>
						{errors.confirmPassword && (
							<div className="text-green-200">
								<em>* {errors.confirmPassword.message}</em>
							</div>
						)}
						{errors.confirmPassword &&
							errors.confirmPassword.type === 'validate' && (
								<div className="text-green-200">
									<em>* Passwords do not match</em>
								</div>
							)}
					</div>
				</div>

				<div className="space-y-4 flex flex-col items-center">
					{loading ? (
						<div className="flex justify-center">
							<ReactLoading
								type="spin"
								color="#7abc7fee"
								height={50}
								width={25}
								className="flex flex-col items-center"
							/>
						</div>
					) : (
						<button className="primary-button shadow-none tracking-wide">
							Register
						</button>
					)}

					<h1>
						Already have an account?{' '}
						<Link
							href={'/login'}
							className="text-green-400 hover:text-green-300 active:text-green-400 uppercase font-semibold"
						>
							Login
						</Link>
					</h1>
				</div>
			</form>
		</Layout>
	);
}
