import Link from 'next/link';
import React from 'react';
import Layout from '../components/Layout';
import { useForm } from 'react-hook-form';
import { getSession, signIn } from 'next-auth/react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { GiShoppingCart } from 'react-icons/gi';
import { useState } from 'react';
import ReactLoading from 'react-loading';

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
			push(redirect ? redirect : '/');
		}
	};

	return (
		<>
			<Layout title={'Login'}>
				<div className="flex justify-center mt-20">
					<div className="flex flex-col items-center justify-center w-fit bg-[#363636]/50 p-8 sm:px-14">
						<div className="flex flex-col items-center justify-center mb-5">
							<GiShoppingCart className="w-20 h-20 text-[#fafcdced]" />
						</div>

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
										placeholder="Email"
										className="w-[300px]"
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
										placeholder="Password"
										className="w-[300px]"
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

						<h1 className="text-center">
							Don't have an account?{' '}
							<Link
								href={`/register?redirect=${redirect || '/'}`}
								className="text-green-400 hover:text-green-500 active:text-green-400 uppercase font-semibold"
							>
								Register
							</Link>
						</h1>
					</div>
				</div>
			</Layout>
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
