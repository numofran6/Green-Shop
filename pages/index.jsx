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
import { useEffect, useRef, useState } from 'react';
import { RiMenu4Line } from 'react-icons/ri';
import { TfiClose } from 'react-icons/tfi';
import FeaturedItem from '../components/FeaturedItem';
import { motion } from 'framer-motion';
import { data } from '../utils/data';

function Home({ products }) {
	const [active, setActive] = useState(false);
	const wrapperRef = useRef(null);

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

	useEffect(() => {
		/**
		 * Alert if clicked on outside of element
		 */
		function handleClickOutside(event) {
			if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
				setActive(false);
			}
		}
		// Bind the event listener
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			// Unbind the event listener on clean up
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [wrapperRef]);

	return (
		<div className="overflow-hidden">
			<header className="relative min-h-[55vh] md:min-h-[60vh] lg:min-h-[70vh] bg-emerald-900">
				<nav className="flex justify-between items-center px-5 md:px-10 lg:px-24 h-16 bg-opacity-10 bg-green-50 z-30">
					<Link href={'/'} className=" font-bold text-2xl uppercase">
						<GiShoppingBag className="w-11 h-11 mr-2 text-white hover:text-green-400 transition duration-300 ease-in-out" />
					</Link>

					<div className="hidden md:flex space-x-5 md:space-x-7  uppercase font-semibold text-md">
						<Link href="/" className="text-white">
							Home
						</Link>
						<Link href="/about" className="text-white">
							About
						</Link>
						<Link href="/contact" className="text-white">
							Contact
						</Link>
						<Link href="/shop" className="text-white">
							Shop
						</Link>
					</div>

					<div className="md:hidden text-green-50">
						<div onClick={() => setActive(!active)}>
							<RiMenu4Line className="w-8 h-8" />
						</div>
					</div>
				</nav>

				<div className="flex flex-col space-y-2 lg:space-y-0 lg:flex-row justify-center items-center xl:space-x-20 w-full h-full lg:px-5 pt-10 lg:pt-0">
					<div className="flex flex-col items-start px-7 lg:px-0 md:max-w-2xl lg:max-w-lg space-y-5 lg:space-y-4 text-white">
						<h1 className="font-bold text-2xl lg:text-lg uppercase">
							Green Shop
						</h1>

						<h2 className="text-5xl sm:text-6xl lg:text-8xl font-bold lg:font-semibold">
							Wear eco-friendly
						</h2>

						<h3 className=" lg:text-sm text-emerald-50 lg:text-emerald-100">
							Get super-fly with environmentally friendly fabrics, creatively
							sewed by the best talents in fashion right now.
						</h3>

						<div className="flex justify-center lg:justify-start w-full">
							<Link
								href={'/shop'}
								className="bg-green-600 p-3 px-6 rounded-full text-white font-bold w-fit uppercase text-xs transition duration-300 ease-in-out hover:bg-green-50 active:bg-green-600 hover:text-emerald-600 active:text-white"
							>
								Shop Now
							</Link>
						</div>
					</div>

					<div className="lg:h-[70vh]">
						<Image
							src={'/images/heromodel1.png'}
							alt="Hero Model"
							width={929}
							height={929}
							priority
							className="h-full w-full"
						/>
					</div>
				</div>

				{active && (
					<motion.div
						initial="hidden"
						animate="visible"
						variants={list}
						ref={wrapperRef}
						className="absolute top-0 bottom-0 w-full max-h-[100vh] flex flex-col justify-center items-center bg-emerald-900 space-y-5 text-center z-10"
					>
						<div
							onClick={() => setActive(!active)}
							className="text-white absolute top-5 right-5"
						>
							<TfiClose className="w-8 h-8" />
						</div>

						<h1 className="font-bold text-xl text-green-500 uppercase">
							Stay fresh
						</h1>

						<div className="space-y-4 flex flex-col uppercase font-semibold text-md">
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
			</header>

			<section className="bg-white justify-between space-x-12 py-12 px-2 md:px-10 lg:p-12 flex overflow-x-auto">
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
			</section>

			<section className="lg:flex justify-center py-10 lg:py-[5.5rem] lg:space-x-5 bg-neutral-900 items-center space-y-5 lg:space-y-0">
				<div className="min-h-[65vh] lg:h-[70vh] w-[90vw] lg:w-[40vw] bg-white lg:mx-0 px-2 mx-auto lg:px-16 flex items-center justify-center space-x-5 sm:space-x-16">
					<div className="flex flex-col text-black space-y-5">
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

						<div>
							<Link
								href={'/shop'}
								className="bg-black p-3 px-6 text-center rounded-full text-white font-bold w-fit uppercase text-xs transition duration-300 ease-in-out hover:bg-white hover:text-black border-2 border-black"
							>
								View More
							</Link>
						</div>
					</div>

					<div className="h-[60vh] sm:h-[65vh] lg:h-[70vh] flex-shrink-0">
						<Image
							src={model}
							alt="model"
							width={1469}
							height={4135}
							className="h-full w-fit"
							priority
						/>
					</div>
				</div>

				<div className="grid grid-cols-2 min-h-[50vh] w-[90vw] lg:mx-0 lg:min-h-[70vh] lg:w-[40vw] mx-auto">
					<Image
						src={necklace}
						alt="Necklace"
						width={3888}
						height={4860}
						className="h-[30vh] lg:h-[35vh] object-cover"
						priority
					/>

					<motion.div
						initial={{ x: 80, y: -40, opacity: 0 }}
						whileInView={{ x: 0, y: 0, opacity: 1 }}
						transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
						className="h-[30vh] lg:h-[35vh] bg-white flex flex-col justify-center items-center space-y-2 lg:space-y-5"
					>
						<h1 className="text-gray-400 text-center text-xs md:text-sm font-bold">
							The Accessories Collection
						</h1>
						<div className="bg-gray-400 h-1 w-[20%]"></div>

						<h2 className="uppercase text-lg lg:text-3xl font-bold text-center text-black">
							Women's Accessories{' '}
						</h2>

						<Link
							href={'/shop'}
							className="bg-blue-300 p-2 px-3 sm:p-3 sm:px-6 rounded-full text-white font-bold w-fit uppercase text-xs transition duration-300 ease-in-out hover:bg-white hover:text-blue-300 border-2 border-blue-300"
						>
							View More
						</Link>
					</motion.div>

					<motion.div
						initial={{ x: -80, y: 40, opacity: 0 }}
						whileInView={{ x: 0, y: 0, opacity: 1 }}
						transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
						className="h-[30vh] lg:h-[35vh] bg-white flex flex-col justify-center items-center  space-y-2 lg:space-y-5"
					>
						<h1 className="text-gray-400 text-sm font-bold">Best Offer</h1>
						<div className="bg-gray-400 h-1 w-[20%]"></div>

						<h2 className="uppercase text-lg lg:text-3xl font-bold text-center text-black">
							Men Watches
						</h2>

						<Link
							href={'/shop'}
							className="bg-blue-300  p-2 px-3 sm:p-3 sm:px-6 rounded-full text-white font-bold w-fit uppercase text-xs transition duration-300 ease-in-out hover:bg-white hover:text-blue-300 border-2 border-blue-300"
						>
							View More
						</Link>
					</motion.div>

					<Image
						src={watch}
						alt="Necklace"
						width={3442}
						height={5073}
						className="h-[30vh] lg:h-[35vh] object-cover"
						priority
					/>
				</div>
			</section>

			<section className="py-16 px-5 md:px-8">
				<h1 className="font-bold text-3xl mb-5">Latest Items</h1>
				<div className="flex items-center space-x-7 lg:space-x-10 overflow-x-auto mt-3">
					{data.products.slice(2, 6).map((product) => (
						<FeaturedItem product={product} key={product.slug} />
					))}
				</div>
			</section>

			<section className="h-[100vh] lg:h-[60vh] bg-stone-200 relative">
				<Image
					src={'/images/bgleaf1.jpg'}
					alt="bg_leaf"
					width={4765}
					height={3177}
					priority
					className="h-full w-full object-cover"
				/>

				<div className="flex absolute top-0 h-full w-full flex-col lg:flex-row items-center justify-center py-5 lg:space-x-10 space-y-5 lg:space-y-0">
					<motion.div
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						transition={{ duration: 1 }}
						className="h-[45vh] overflow-hidden bg-stone-400 rounded-md w-[85vw] lg:w-[40%] md:w-[80vw] relative"
					>
						<Image
							src={'/images/custom.jpg'}
							alt="Custom"
							width={1038}
							height={1280}
							className="h-full w-full object-cover"
						/>

						<div className="absolute top-0 right-0 h-full px-5 w-full flex flex-col justify-center font-bold text-lg space-y-7 uppercase text-green-800">
							<div>
								<h1>Create</h1>
								<h2 className="text-3xl">Custom </h2>
								<h2 className="text-3xl "> Pieces</h2>
							</div>

							<Link
								href={'/shop'}
								className="bg-green-800 p-3 px-6 text-center rounded-full text-white font-bold w-fit uppercase text-xs transition duration-300 ease-in-out border-2 border-green-800 hover:bg-stone-100 hover:text-green-800"
							>
								Browse
							</Link>
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						transition={{ duration: 1 }}
						className="h-[45vh] bg-stone-400 overflow-hidden rounded-md w-[85vw] md:w-[80vw] lg:w-[40%] relative"
					>
						<Image
							src={'/images/shoes.jpg'}
							alt="Shoes"
							width={720}
							height={480}
							className="h-full w-full object-cover"
						/>

						<div className="absolute top-0 h-full w-full px-5 flex flex-col justify-center font-bold text-lg space-y-7 uppercase text-gray-800">
							<div>
								<h1>Vintage</h1>
								<h2 className="text-4xl">Shoes</h2>
							</div>

							<Link
								href={'/shop'}
								className="bg-gray-600 p-3 px-6 text-center rounded-full text-white font-bold w-fit uppercase text-xs transition duration-300 ease-in-out hover:bg-white hover:text-gray-600 border-2 border-gray-600"
							>
								Browse
							</Link>
						</div>
					</motion.div>
				</div>
			</section>

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
			</footer>
		</div>
	);
}

export default Home;
