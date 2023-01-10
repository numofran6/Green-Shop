import Image from 'next/image';
import React from 'react';
import {
	FaFacebookF,
	FaLinkedinIn,
	FaTwitter,
	FaInstagram,
} from 'react-icons/fa';

export const AboutCard = ({ img, name }) => {
	return (
		<div className="flex flex-col items-center space-y-3 text-sm">
			<Image
				src={img}
				alt={'Personnel'}
				width={'auto'}
				height={'auto'}
				className="bg-stone-200 w-[150px] h-[150px]"
			/>
			<h1 className="font-bold text-xl">{name}</h1>
			<h1 className="text-gray-500">IT Staff </h1>
			<div className="flex space-x-7 text-gray-700">
				<span>
					<FaFacebookF />
				</span>
				<span>
					<FaLinkedinIn />
				</span>
				<span>
					<FaTwitter />
				</span>
				<span>
					<FaInstagram />
				</span>
			</div>
		</div>
	);
};
