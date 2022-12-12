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

export default function LoginScreen() {
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
			if (result.error) {
				toast.error(result.error);
			}
		} catch (err) {
			toast.error(errorHandler(err));
		}
	};

	return (
		<Layout title={'Create Account'}>
			<form
				onSubmit={handleSubmit(submitHandler)}
				className="mx-auto max-w-screen-md"
			>
				<h1 className="mt-10 mb-4 text-3xl text-center font-semibold uppercase text-green-200">
					Create Account
				</h1>
				<div className="mb-4">
					<label htmlFor="name">Name</label>
					<input
						{...register('name', {
							required: 'Please enter your name',
						})}
						type="text"
						className="w-full"
						id="name"
					/>
					{errors.name && (
						<div className="text-green-200">
							<em>* {errors.name.message}</em>
						</div>
					)}
				</div>

				<div className="mb-4">
					<label htmlFor="email">Email</label>
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
					/>
					{errors.email && (
						<div className="text-green-200">
							<em>* {errors.email.message} </em>
						</div>
					)}
				</div>

				<div className="mb-4">
					<label htmlFor="password">Password</label>
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
					/>
					{errors.password && (
						<div className="text-green-200">
							<em>* {errors.password.message}</em>
						</div>
					)}
				</div>

				<div className="mb-4">
					<label htmlFor="confirmPassword">Confirm Password</label>
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

				<div className="space-y-4 flex flex-col items-center">
					<button className="primary-button">Register</button>

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
