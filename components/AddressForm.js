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
			className="mx-auto max-w-screen-md mt-16"
		>
			<h1 className="my-5 text-3xl text-green-200 uppercase tracking-wide text-center font-bold">
				Shipping Address
			</h1>
			<div className="mb-4">
				<input
					{...register('fullName', { required: 'Please enter your full name' })}
					type="text"
					id="fullName"
					className="w-full"
					placeholder="Full Name"
				/>
				{errors.fullName && (
					<div className="text-red-500">{errors.fullName.message} </div>
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
					className="w-full"
					placeholder="Address"
				/>
				{errors.address && (
					<div className="text-red-500">{errors.address.message} </div>
				)}
			</div>

			<div className="mb-4">
				<input
					{...register('city', {
						required: 'Please enter the city you reside',
					})}
					type="text"
					id="city"
					className="w-full"
					placeholder="City"
				/>
				{errors.city && (
					<div className="text-red-500">{errors.city.message} </div>
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
					className="w-full"
				/>
				{errors.postalCode && (
					<div className="text-red-500">{errors.postalCode.message} </div>
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
					className="w-full"
				/>
				{errors.country && (
					<div className="text-red-500">{errors.country.message} </div>
				)}
			</div>

			<div className="mb-4 flex justify-end">
				<button className="primary-button">Next</button>
			</div>
		</form>
	);
};
