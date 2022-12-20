import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Store } from '../utils/Store';

export const AddressForm = () => {
	const {
		state: { cart },
		dispatch,
	} = useContext(Store);
	const { shippingAddress } = cart;
	const { push } = useRouter();

	const {
		handleSubmit,
		register,
		formState: { errors },
		setValue,
	} = useForm();

	useEffect(() => {
		setValue('fullName', shippingAddress.fullName);
		setValue('address', shippingAddress.address);
		setValue('city', shippingAddress.city);
		setValue('postalCode', shippingAddress.postalCode);
		setValue('country', shippingAddress.country);
	}, [setValue, shippingAddress]);

	const submitHandler = ({ fullName, address, city, postalCode, country }) => {
		dispatch({
			type: 'SAVE_SHIPPING_ADDRESS',
			payload: { fullName, address, city, postalCode, country },
		});
		push('/payment');
	};

	return (
		<form
			onSubmit={handleSubmit(submitHandler)}
			className="mx-auto max-w-screen-lg bg-[#363636]/50 sm:px-16 py-5 mt-16 flex flex-col items-center"
		>
			<h1 className="my-5 text-3xl text-green-200 uppercase tracking-wide text-center font-bold">
				Shipping Address
			</h1>
			<div className="mb-4">
				<input
					{...register('fullName', { required: 'Please enter your full name' })}
					type="text"
					id="fullName"
					placeholder="Full Name"
				/>
				{errors.fullName && (
					<div>
						<em>* {errors.fullName.message}</em>
					</div>
				)}
			</div>

			<div className="mb-4">
				<input
					{...register('address', {
						required: 'Please enter your address',
						minLength: { value: 3, message: 'Must be at least 3 chars' },
					})}
					type="text"
					id="address"
					placeholder="Address"
				/>
				{errors.address && (
					<div>
						<em>* {errors.address.message}</em>
					</div>
				)}
			</div>

			<div className="mb-4">
				<input
					{...register('city', {
						required: 'Please enter the city you reside',
					})}
					type="text"
					id="city"
					placeholder="City"
				/>
				{errors.city && (
					<div>
						<em>* {errors.city.message}</em>
					</div>
				)}
			</div>

			<div className="mb-4">
				<input
					{...register('postalCode', {
						required: 'Please enter your postal code',
					})}
					type="text"
					id="postalCode"
					placeholder="Postal Code"
				/>
				{errors.postalCode && (
					<div>
						<em>* {errors.postalCode.message}</em>
					</div>
				)}
			</div>

			<div className="mb-4">
				<input
					{...register('country', {
						required: 'Please enter your country',
					})}
					type="text"
					id="country"
					placeholder="Country"
				/>
				{errors.country && (
					<div>
						<em>* {errors.country.message}</em>
					</div>
				)}
			</div>

			<button className="primary-button mt-4 flex items-end justify-end">
				Next
			</button>
		</form>
	);
};
