import Link from 'next/link';
import React from 'react';
import Layout from '../components/Layout';
import { useForm } from 'react-hook-form';
import { getSession, signIn } from 'next-auth/react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { GiShoppingBag } from 'react-icons/gi';
import { useState } from 'react';
import ReactLoading from 'react-loading';
import Image from 'next/image';
import Head from 'next/head';

export default function LoginScreen() {
	const [loading, setLoading] = useState(false);
	const { push, query } = useRouter();
	const { redirect } = query;

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm();

	const submitHandler = async ({ email, password }) => {
		setLoading(true);
		const result = await signIn('credentials', {
			redirect: false,
			email,
			password,
		});
		setLoading(false);
		if (result.error) {
			toast.error(result.error);
		} else {
			push(redirect ? redirect : '/shop');
		}
	};

	return (
		<>
			<div className="flex flex-col h-[100vh] justify-center items-center bg-stone-200">
				<Head>
					<title>Login - Green Shop</title>
				</Head>

				<div className="flex items-center">
					<div>
						<Image
							src={'/images/loginbg.jpg'}
							alt="WELCOME"
							width={7000}
							height={9852}
							className="h-[450px] w-[350px] hidden md:flex bg-black"
						/>
					</div>

					<div className="md:h-[450px] flex flex-col items-center justify-center w-fit bg-emerald-900 text-green-50 p-8 px-12 sm:px-14">
						<Link
							href={'/shop'}
							className="flex flex-col items-center justify-center mb-5"
						>
							<GiShoppingBag className="w-20 h-20 text-green-100 hover:text-green-300" />
						</Link>

						<form
							onSubmit={handleSubmit(submitHandler)}
							className="space-y-8 mb-4"
						>
							<div className="space-y-4">
								<div>
									<input
										{...register('email', {
											required: 'Please enter email',
											pattern: {
												value:
													/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
												message: 'Invalid email format',
											},
										})}
										type="email"
										id="email"
										placeholder="danny@shop.com"
										className="placeholder:lowercase"
									/>
									{errors.email && (
										<div>
											<em>* {errors.email.message}</em>{' '}
										</div>
									)}
								</div>

								<div>
									<input
										{...register('password', {
											required: 'Please enter password',
											minLength: {
												value: 6,
												message: 'password must be at least 6 characters',
											},
										})}
										type="password"
										id="password"
										placeholder="123456"
									/>
									{errors.password && (
										<div>
											<em>* {errors.password.message}</em>
										</div>
									)}
								</div>
							</div>

							<div className="text-center">
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
									<button className="primary-button tracking-widest shadow-none">
										Log In
									</button>
								)}
							</div>
						</form>

						<h1 className="text-center text-sm">
							Don't have an account?{' '}
							<Link
								href={`/register?redirect=${redirect || '/shop'}`}
								className="text-green-400 hover:text-green-500 active:text-green-400 uppercase font-semibold"
							>
								Register
							</Link>
						</h1>

						<div className="text-xs mt-3">
							<em>please sign in with placeholder credentials</em>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export async function getServerSideProps(ctx) {
	const { redirect } = ctx.query;
	const session = await getSession(ctx);

	if (redirect && session) {
		return {
			redirect: {
				destination: redirect,
			},
		};
	}

	return {
		props: {},
	};
}
