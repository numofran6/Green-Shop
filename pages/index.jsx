import Image from 'next/image';
import Link from 'next/link';
import { GiShoppingBag } from 'react-icons/gi';
import { GoodiesCard } from '../components/GoodiesCard';
import free from '../public/images/free.png';
import payment from '../public/images/payment.png';
import returnimg from '../public/images/return.png';
import support from '../public/images/support.png';
import model from '../public/images/model.png';
import necklace from '../public/images/necklace.jpg';
import watch from '../public/images/watch.jpg';
import { useState } from 'react';
import { RiMenu4Line } from 'react-icons/ri';
import { TfiClose } from 'react-icons/tfi';
import Head from 'next/head';
import db from '../utils/db';
import Product from '../models/Product';
import FeaturedItem from '../components/FeaturedItem';
import { motion } from 'framer-motion';

function Home({ products }) {
	const [active, setActive] = useState(false);

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className=""
		>
			<Head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="theme-color" content="#000000" />
				<meta
					name="description"
					content="E-Commerce App. Project of Francis Numo. A Front-End Developer who specializes in building elegant user interface with the aim to create an exceptional digital experience"
				/>
				<meta
					name="keywords"
					content="Frontend Developer, Mobile Developer, Open Source, Freelance Web Developer, Freelance Mobile Developer, React Native Developer, Developer Portfolio, React Developer, Web Developer, React Frontend Developer"
				/>

				<meta name="description" content="Page description" />
				<meta property="og:title" content="Green Shop" />
				<meta
					property="og:description"
					content="E-Commerce App. Project of Francis Numo. A Front-End Developer who specializes in building elegant user interface with the aim to create exceptional digital experience"
				/>
				<meta property="og:image" content="../public/images/shirt1.jpg" />

				<meta property="og:image:alt" content="Green Shop" />
				<meta property="og:locale" content="en_GB" />
				<meta property="og:type" content="website" />
				<meta name="twitter:card" content="summary_large_image" />
				<meta
					property="og:url"
					content="https://www.greenshopping.vercel.app/"
				/>
				<meta name="twitter:card" content="summary" />
				<meta name="theme-color" content="#000000" />
				<meta name="robots" content="index, follow" />

				<title>Home - Green Shop</title>
			</Head>

			<header className="h-[70vh] relative bg-emerald-900">
				<Image
					src={'/images/bgleaf.jpg'}
					alt="bg_leaf"
					width={4765}
					height={3177}
					priority
					className="h-full w-full object-cover"
				/>

				<nav className="absolute top-0 w-full flex justify-end md:justify-between items-center px-5 sm:px-24 h-16 bg-opacity-10 bg-green-50">
					<Link
						href={'/'}
						className="hidden md:flex font-bold text-2xl uppercase"
					>
						<GiShoppingBag className="w-11 h-11 mr-2" />
					</Link>

					<div className="hidden space-x-5 md:space-x-7 md:flex uppercase font-semibold text-md">
						<Link href="/">Home</Link>
						<Link href="/about">About</Link>
						<Link href="/contact">Contact</Link>
						<Link href="/shop">Shop</Link>
					</div>

					<div className="md:hidden text-green-50">
						{!active && (
							<RiMenu4Line
								onClick={() => setActive(!active)}
								className="w-8 h-8"
							/>
						)}
						{active && (
							<TfiClose
								onClick={() => setActive(!active)}
								className="w-8 h-8"
							/>
						)}
					</div>
				</nav>

				{active && (
					<div className="absolute top-16 w-full h-fit flex flex-col justify-center items-center bg-emerald-900 space-y-10 py-[7.1rem] text-center z-10">
						<Link href={'/'} className="font-bold text-2xl uppercase">
							<GiShoppingBag className="w-11 h-11 mr-2" />
						</Link>

						<div className="space-y-7 flex flex-col uppercase font-semibold text-md">
							<Link href="/" onClick={() => setActive(!active)}>
								Home
							</Link>
							<Link href="/about" onClick={() => setActive(!active)}>
								About
							</Link>
							<Link href="/contact" onClick={() => setActive(!active)}>
								Contact
							</Link>
							<Link href="/shop" onClick={() => setActive(!active)}>
								Shop
							</Link>
						</div>
					</div>
				)}

				<div className="absolute top-0 flex flex-col justify-center h-full max-w-xs md:max-w-lg ml-10 md:ml-60 space-y-4 text-green-50">
					<h1 className="font-bold text-lg uppercase">Green Shop</h1>

					<h2 className="text-6xl md:text-8xl font-semibold">
						Wear eco-friendly
					</h2>

					<h3 className="text-xs sm:text-sm text-gray-400">
						I am continously working on ways to make this project better.
						Collaborations and recommendations are welcome.
					</h3>

					<Link
						href={'/shop'}
						className="bg-green-600 p-3 px-6 rounded-full text-white font-bold w-fit uppercase text-xs transition duration-300 ease-in-out hover:bg-green-200 hover:text-emerald-600"
					>
						Shop Now
					</Link>
				</div>
			</header>

			<div className="bg-white justify-around py-12 px-2 md:p-12 hidden md:flex">
				<GoodiesCard
					img={free}
					heading={'Free Shipping'}
					text={'Delivered to your door'}
				/>
				<GoodiesCard
					img={payment}
					heading={'Securety Payments'}
					text={'Up to 12 months installments'}
				/>
				<GoodiesCard
					img={returnimg}
					heading={'14-Day Returns'}
					text={'Shop with confidence'}
				/>
				<GoodiesCard
					img={support}
					heading={'24/7 Dedicated Support'}
					text={'Leave us a message'}
				/>
			</div>

			<div className="md:flex justify-center py-10 md:p-16 md:space-x-5 bg-stone-200 items-center space-y-5 md:space-y-0">
				<div className="h-[65vh] md:h-[70vh] w-[90vw] md:w-[35vw] bg-white mx-5 md:mx-0 md:px-16 sm:px-28 pl-5 pr-2 relative">
					<div className="h-[65vh] md:h-[70vh] flex justify-end">
						<Image
							src={model}
							alt="model"
							width={1469}
							height={4135}
							className="h-full w-fit"
						/>
					</div>

					<div className="h-full absolute top-0 flex flex-col justify-center text-black space-y-5">
						<h1 className="text-gray-400 text-sm font-bold">
							Spring Collection
						</h1>
						<div className="bg-gray-400 h-1 w-[30%]"></div>

						<div>
							<h2 className="uppercase text-3xl font-bold">New </h2>
							<h2 className="uppercase text-3xl font-bold">Arrivals</h2>
						</div>

						<Link
							href={'/shop'}
							className="bg-black p-3 px-6 rounded-full text-white font-bold w-fit uppercase text-xs transition duration-300 ease-in-out hover:bg-white hover:text-black"
						>
							View More
						</Link>
					</div>
				</div>

				<div className="bg-white flex justify-around py-12 px-2 md:p-12 md:hidden">
					<GoodiesCard
						img={free}
						heading={'Free Shipping'}
						text={'Delivered to your door'}
					/>
					<GoodiesCard
						img={payment}
						heading={'Securety Payments'}
						text={'Up to 12 months installments'}
					/>
					<GoodiesCard
						img={returnimg}
						heading={'14-Day Returns'}
						text={'Shop with confidence'}
					/>
					<GoodiesCard
						img={support}
						heading={'24/7 Dedicated Support'}
						text={'Leave us a message'}
					/>
				</div>

				<div className="grid grid-cols-2 h-[50vh] w-[90vw] mx-5 md:mx-0 md:h-[70vh] md:w-[40vw]">
					<Image
						src={necklace}
						alt="Necklace"
						width={3888}
						height={4860}
						className="h-[25vh] md:h-[35vh] object-cover"
					/>

					<div className="h-[25vh] md:h-[35vh] bg-white flex flex-col justify-center items-center space-y-2 md:space-y-5">
						<h1 className="text-gray-400 text-xs md:text-sm font-bold">
							The Accessories Collection
						</h1>
						<div className="bg-gray-400 h-1 w-[20%]"></div>

						<h2 className="uppercase text-lg md:text-3xl font-bold text-center text-black">
							Women's Accessories{' '}
						</h2>

						<Link
							href={'/shop'}
							className="bg-blue-300 p-3 px-6 rounded-full text-white font-bold w-fit uppercase text-xs transition duration-300 ease-in-out hover:bg-white hover:text-blue-300"
						>
							View More
						</Link>
					</div>

					<div className="h-[25vh] md:h-[35vh] bg-white flex flex-col justify-center items-center  space-y-2 md:space-y-5">
						<h1 className="text-gray-400 text-sm font-bold">Best Offer</h1>
						<div className="bg-gray-400 h-1 w-[20%]"></div>

						<h2 className="uppercase text-lg md:text-3xl font-bold text-center text-black">
							Men Watches
						</h2>

						<Link
							href={'/shop'}
							className="bg-blue-300 p-3 px-6 rounded-full text-white font-bold w-fit uppercase text-xs transition duration-300 ease-in-out hover:bg-white hover:text-blue-300"
						>
							View More
						</Link>
					</div>

					<Image
						src={watch}
						alt="Necklace"
						width={3442}
						height={5073}
						className="h-[25vh] md:h-[35vh] object-cover"
					/>
				</div>
			</div>

			<div className="py-10 px-5">
				<h1 className="font-bold text-3xl mb-5">Latest Items</h1>
				<div className="flex items-center space-x-7 lg:space-x-10 overflow-x-auto">
					{products.slice(2, 6).map((product) => (
						<FeaturedItem product={product} key={product.slug} />
					))}
				</div>
			</div>

			<footer className="text-sm bg-emerald-900 text-green-50">
				<div className="flex flex-col md:flex-row p-16 justify-around space-y-10 md:space-y-0 md:space-x-0">
					<div className="space-y-5 md:space-y-7">
						<h1 className="uppercase font-bold tracking-widest  text-lg">
							Information
						</h1>

						<ul className="space-y-3 md:space-y-1">
							<li>About Shop</li>
							<li>Our Location</li>
							<li>Delivery Information</li>
							<li>Terms & Conditions</li>
						</ul>
					</div>

					<div className="space-y-5 md:space-y-7">
						<h1 className="uppercase font-bold tracking-widest  text-lg">
							My Account
						</h1>

						<ul className="space-y-3 md:space-y-1">
							<li>Profile</li>
							<li>Order History</li>
						</ul>
					</div>

					<div className="space-y-5 md:space-y-7">
						<h1 className="uppercase font-bold tracking-widest text-lg">
							Contact
						</h1>

						<ul className="space-y-3 md:space-y-1">
							<li>
								Lebanon Zone 2 2300 The Young Shall Grow Street Ashaiman, AS
								76051
							</li>
							<li>info@greenshopping.com</li>
						</ul>
					</div>
				</div>

				<h1 className="text-center bg-[#363636] text-white p-3 text-xs md:text-sm">
					This project is not fully complete. More added features on the way.
				</h1>
			</footer>
		</motion.div>
	);
}

export default Home;

export async function getServerSideProps() {
	await db.connect();
	const products = await Product.find().lean();

	return {
		props: {
			products: products.map(db.convertDocToObj),
		},
	};
}
