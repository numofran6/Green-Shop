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

	const list = {
		visible: {
			opacity: 1,
			transition: {
				when: 'beforeChildren',
				staggerChildren: 0.3,
			},
		},
		hidden: {
			opacity: 0,
			transition: {
				when: 'afterChildren',
			},
		},
	};

	const item = {
		visible: { opacity: 1, y: 0 },
		hidden: { opacity: 0, y: 100 },
	};

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

				<nav className="absolute top-0 w-full flex justify-end md:justify-between items-center sm:px-24 h-16 bg-opacity-10 bg-green-50  z-30">
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

					<div className="md:hidden text-green-50 mx-5">
						{!active ? (
							<div onClick={() => setActive(!active)}>
								<RiMenu4Line className="w-8 h-8" />
							</div>
						) : (
							<div onClick={() => setActive(!active)}>
								<TfiClose className="w-8 h-8" />
							</div>
						)}
					</div>
				</nav>

				{active && (
					<motion.div
						initial="hidden"
						animate="visible"
						variants={list}
						className="absolute top-16 w-full min-h-[62vh] flex flex-col justify-center items-center py-5 bg-emerald-900 space-y-10 text-center z-10"
					>
						<Link href={'/'} className="font-bold text-2xl uppercase">
							<GiShoppingBag className="w-11 h-11 mr-2" />
						</Link>

						<div className="space-y-7 flex flex-col uppercase font-semibold text-md">
							<motion.div variants={item}>
								<Link href="/" onClick={() => setActive(!active)}>
									Home
								</Link>
							</motion.div>

							<motion.div variants={item}>
								<Link href="/about" onClick={() => setActive(!active)}>
									About
								</Link>
							</motion.div>

							<motion.div variants={item}>
								<Link href="/contact" onClick={() => setActive(!active)}>
									Contact
								</Link>
							</motion.div>

							<motion.div variants={item}>
								<Link href="/shop" onClick={() => setActive(!active)}>
									Shop
								</Link>
							</motion.div>
						</div>
					</motion.div>
				)}

				<div className="absolute top-0 flex flex-col justify-center h-full max-w-xs md:max-w-lg ml-7 px-3 lg:ml-60 space-y-4 text-green-50">
					<h1 className="font-bold text-lg uppercase">Green Shop</h1>

					<h2 className="text-5xl sm:text-6xl lg:text-8xl font-semibold">
						Wear eco-friendly
					</h2>

					<h3 className="text-xs sm:text-sm text-gray-400">
						I am continously working on ways to make this project better.
						Collaborations and recommendations are welcome.
					</h3>

					<Link
						href={'/shop'}
						className="bg-green-600 p-3 px-6 rounded-full text-white font-bold w-fit uppercase text-xs transition duration-300 ease-in-out hover:bg-green-200 active:bg-green-600 hover:text-emerald-600 active:text-white"
					>
						Shop Now
					</Link>
				</div>
			</header>

			<div className="bg-white justify-around py-12 px-2 md:p-12 hidden lg:flex">
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

			<div className="lg:flex justify-center py-10 lg:p-16 lg:space-x-5 bg-stone-200 items-center space-y-5 lg:space-y-0">
				<div className="min-h-[65vh] lg:h-[70vh] w-[90vw] lg:w-[35vw] bg-white lg:mx-0 px-2 mx-auto lg:px-16 flex items-center justify-center space-x-5 sm:space-x-16">
					<motion.div
						initial={{ opacity: 0, x: 80 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 1 }}
						className="flex flex-col text-black space-y-5"
					>
						<h1 className="text-gray-400 text-sm font-bold">
							Spring Collection
						</h1>
						<div className="bg-gray-400 h-1 w-[30%]"></div>

						<div>
							<h2 className="uppercase text-2xl md:text-3xl font-bold">New </h2>
							<h2 className="uppercase text-2xl md:text-3xl font-bold">
								Arrivals
							</h2>
						</div>

						<Link
							href={'/shop'}
							className="bg-black p-3 px-6 text-center rounded-full text-white font-bold w-fit uppercase text-xs transition duration-300 ease-in-out hover:bg-white hover:text-black"
						>
							View More
						</Link>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, x: -120 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 1 }}
						className="h-[65vh] lg:h-[70vh] flex-shrink-0"
					>
						<Image
							src={model}
							alt="model"
							width={1469}
							height={4135}
							className="h-full w-fit"
						/>
					</motion.div>
				</div>

				<div className="bg-white flex justify-around py-12 px-2 lg:p-12 lg:hidden">
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

				<div className="grid grid-cols-2 h-[50vh] w-[90vw] lg:mx-0 lg:h-[70vh] lg:w-[40vw] mx-auto">
					<Image
						src={necklace}
						alt="Necklace"
						width={3888}
						height={4860}
						className="h-[25vh] lg:h-[35vh] object-cover"
					/>

					<div className="h-[25vh] lg:h-[35vh] bg-white flex flex-col justify-center items-center space-y-2 lg:space-y-5">
						<h1 className="text-gray-400 text-center text-xs md:text-sm font-bold">
							The Accessories Collection
						</h1>
						<div className="bg-gray-400 h-1 w-[20%]"></div>

						<h2 className="uppercase text-lg lg:text-3xl font-bold text-center text-black">
							Women's Accessories{' '}
						</h2>

						<Link
							href={'/shop'}
							className="bg-blue-300 p-3 px-6 rounded-full text-white font-bold w-fit uppercase text-xs transition duration-300 ease-in-out hover:bg-white hover:text-blue-300"
						>
							View More
						</Link>
					</div>

					<div className="h-[25vh] lg:h-[35vh] bg-white flex flex-col justify-center items-center  space-y-2 lg:space-y-5">
						<h1 className="text-gray-400 text-sm font-bold">Best Offer</h1>
						<div className="bg-gray-400 h-1 w-[20%]"></div>

						<h2 className="uppercase text-lg lg:text-3xl font-bold text-center text-black">
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
						className="h-[25vh] lg:h-[35vh] object-cover"
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
				<div className="flex flex-col lg:flex-row p-16 justify-around space-y-10 lg:space-y-0 lg:space-x-0">
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
