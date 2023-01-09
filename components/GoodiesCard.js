import Image from 'next/image';

export const GoodiesCard = ({ img, heading, text }) => {
	return (
		<div className="flex flex-col md:flex-row text-center items-center md:space-x-5 md:space-y-0 space-y-3 text-black max-w-[5rem] md:max-w-none">
			<Image
				src={img}
				alt=""
				width={512}
				height={512}
				className="md:w-20 md:h-20 w-10 h-10"
			/>

			<div className="md:space-y-2">
				<h1 className="font-bold text-sm md:text-xl">{heading}</h1>
				<h2 className="text-gray-600 text-xs md:text-sm">{text}</h2>
			</div>
		</div>
	);
};
