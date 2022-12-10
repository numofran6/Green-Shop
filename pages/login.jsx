import Link from 'next/link';
import React from 'react';
import Layout from '../components/Layout';
import { useForm } from 'react-hook-form';
import { getSession, signIn, useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import { errorHandler } from '../utils/errorHandler';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { GiShoppingCart } from 'react-icons/gi';

export default function LoginScreen() {
	const { data: session } = useSession();
	const { push, query } = useRouter();
	const { redirect } = query;

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm();

	const submitHandler = async ({ email, password }) => {
		const result = await signIn('credentials', {
			redirect: false,
			email,
			password,
		});
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
					<div className="flex flex-col items-center justify-center w-fit bg-[#363636]/50 p-8">
						<div className="flex flex-col items-center justify-center mb-5">
							<GiShoppingCart className="w-20 h-20 text-[#fafcdced]" />
						</div>

						<form
							onSubmit={handleSubmit(submitHandler)}
							className="space-y-4 mb-4"
						>
							<div>
								<input
									{...register('email', {
										required: 'Please enter email',
										pattern: {
											value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
											message: 'Invalid email format',
										},
									})}
									type="email"
									id="email"
									placeholder="Email"
									className="w-[300px] sm:w-[400px]"
								/>
								{errors.email && (
									<div className="text-red-500">{errors.email.message} </div>
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
									className="w-[300px] sm:w-[400px]"
								/>
								{errors.password && (
									<div className="text-red-500">{errors.password.message} </div>
								)}
							</div>

							<div className="text-center">
								<button className="primary-button shadow-none">Log In</button>
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
