import Link from 'next/link';
import { useContext, useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import { Store } from '../utils/Store';
import { ToastContainer } from 'react-toastify';
import { signOut, useSession } from 'next-auth/react';
import 'react-toastify/dist/ReactToastify.css';
import ProfileMenu from './ProfileMenu';
import Cookies from 'js-cookie';
import { GiShoppingBag } from 'react-icons/gi';
import { RiMenu4Line } from 'react-icons/ri';
import { TfiClose } from 'react-icons/tfi';
import { CiLogin } from 'react-icons/ci';
import { BsBasket3 } from 'react-icons/bs';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

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

function Layout({ children, title }) {
	const [active, setActive] = useState(false);
	const wrapperRef = useRef(null);
	const { asPath } = useRouter();
	const { data: session } = useSession();
	const { state, dispatch } = useContext(Store);
	const {
		cart: { cartItems },
	} = state;
	const [cartItemsCount, setCartItemsCount] = useState(0);

	useEffect(() => {
		setCartItemsCount(cartItems.reduce((a, c) => a + c.quantity, 0));
	}, [cartItems]);

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

	const logoutClickHandler = () => {
		Cookies.remove('cart');
		Cookies.remove('order');
		dispatch({ type: 'CART_REST' });
		signOut({ callbackUrl: '/' });
	};

	return (
		<>
			<Head>
				<title>{title ? title + ' - Green Shop' : 'Green Shop'}</title>
			</Head>

			<ToastContainer
				position="bottom-left"
				limit={3}
				autoClose={2000}
				pauseOnFocusLoss={false}
				theme={'dark'}
			/>

			<div className="min-h-screen flex flex-col justify-between">
				<header className="md:sticky md:top-0 md:py-3 z-20 text-green-50 bg-emerald-900">
					<nav className="flex justify-between items-center px-2 md:px-10 h-16">
						<div className="md:flex hidden items-center text-sm space-x-3 md:space-x-8 uppercase">
							<Link
								href={'/'}
								className="text-green-100 hover:text-green-300 active:text-green-100"
							>
								<GiShoppingBag className="w-11 h-11" />
							</Link>
							<span className="h-5 w-[0.1rem] bg-green-100 hidden md:flex"></span>

							<Link
								href="/"
								className={`${asPath === '/' && 'text-green-500'}`}
							>
								Home
							</Link>
							<Link
								href="/about"
								className={`${asPath === '/about' && 'text-green-500'}`}
							>
								About
							</Link>
							<Link
								href="/contact"
								className={`${asPath === '/contact' && 'text-green-500'}`}
							>
								Contact
							</Link>
							<Link
								href="/shop"
								className={`${asPath === '/shop' && 'text-green-500'}`}
							>
								Shop
							</Link>
						</div>

						<Link
							href={'/'}
							className="text-green-100 hover:text-green-300 active:text-green-100 md:hidden"
						>
							<GiShoppingBag className="w-11 h-11" />
						</Link>

						<div className="space-x-5 text-xs sm:text-sm md:space-x-6 flex uppercase font-bold md:font-normal text-md items-center">
							{session?.user ? (
								<ProfileMenu
									name={session.user.name}
									logoutClickHandler={logoutClickHandler}
								/>
							) : (
								<Link href="/login" className=" flex space-x-2 items-center">
									<CiLogin className="w-6 h-6" />
									<span>Log In</span>
								</Link>
							)}

							<span className="h-5 w-[0.1rem] bg-green-100"></span>

							<Link
								href="/cart"
								className={`flex relative space-x-2 items-center ${asPath === '/cart' && 'text-green-500'
									}`}
							>
								<BsBasket3 className="w-5 h-5" />
								{
									<span className="inline-flex absolute -top-2 -right-3 justify-center items-center w-5 h-4 text-xs font-bold text-emerald-900 bg-green-50 rounded-full">
										{cartItemsCount}
									</span>
								}
								<span>Cart</span>
							</Link>
						</div>

						<div className="md:hidden">
							{!active ? (
								<RiMenu4Line
									onClick={() => setActive(!active)}
									className="w-8 h-8"
								/>
							) : (
								<TfiClose
									onClick={() => setActive(!active)}
									className="w-8 h-8"
								/>
							)}
						</div>
					</nav>

					{active && (
						<motion.div
							initial="hidden"
							animate="visible"
							variants={list}
							ref={wrapperRef}
							className="absolute top-16 bottom-0 w-full  flex flex-col justify-center items-center bg-emerald-900 py-5 text-center z-10"
						>
							<div className="space-y-7 flex flex-col uppercase font-semibold text-md">
								<h1 className="font-bold text-xl text-green-500 uppercase">
									Stay fresh
								</h1>

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

				<main className="container m-auto">{children}</main>

				<footer className="text-sm bg-neutral-900 text-green-50">
					<div className="flex flex-col md:flex-row p-16 justify-around space-y-10 md:space-y-0 md:space-x-10">
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
		</>
	);
}

export default Layout;
