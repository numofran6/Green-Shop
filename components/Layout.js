import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import Head from 'next/head';
import { Store } from '../utils/Store';
import { ToastContainer } from 'react-toastify';
import { signOut, useSession } from 'next-auth/react';
import 'react-toastify/dist/ReactToastify.css';
import ProfileMenu from './ProfileMenu';
import Cookies from 'js-cookie';
import { GiShoppingBag } from 'react-icons/gi';
import { GrInstagram } from 'react-icons/gr';

function Layout({ children, title }) {
	const { data: session } = useSession();
	const { state, dispatch } = useContext(Store);
	const {
		cart: { cartItems },
	} = state;
	const [cartItemsCount, setCartItemsCount] = useState(0);

	useEffect(() => {
		setCartItemsCount(cartItems.reduce((a, c) => a + c.quantity, 0));
	}, [cartItems]);

	const logoutClickHandler = () => {
		Cookies.remove('cart');
		Cookies.remove('order');
		dispatch({ type: 'CART_REST' });
		signOut({ callbackUrl: '/' });
	};

	return (
		<>
			<Head>
				<meta charset="utf-8" />
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

				<title>{title ? title + ' -Green Shop' : 'Green Shop'}</title>
			</Head>

			<ToastContainer
				position="bottom-left"
				limit={3}
				autoClose={2000}
				pauseOnFocusLoss={false}
				theme={'dark'}
			/>

			<div className="min-h-screen flex flex-col justify-between">
				<header className="sticky top-0 z-20 bg-emerald-900">
					<nav className="flex justify-between items-center px-5 sm:px-10 h-16 shadow-md">
						<Link
							href={'/'}
							className="text-green-100 hover:text-green-300 active:text-green-100 flex items-center font-bold text-2xl uppercase"
						>
							<GiShoppingBag className="w-11 h-11 mr-2" />
							Green Shop
						</Link>

						<div className="space-x-4 flex uppercase font-semibold text-md">
							<Link href="/">Home</Link>
							<div className="relative">
								<Link href="/cart">Cart</Link>

								{cartItemsCount > 0 && (
									<span className="inline-flex absolute -top-2 -right-3 justify-center items-center w-5 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
										{cartItemsCount}
									</span>
								)}
							</div>

							{session?.user ? (
								<ProfileMenu
									name={session.user.name}
									logoutClickHandler={logoutClickHandler}
								/>
							) : (
								<Link href="/login">Log In</Link>
							)}
						</div>
					</nav>
				</header>

				<main className="container m-auto mt-4 py-2 px-4 sm:px-8">
					{children}
				</main>

				<footer className="text-xs md:text-sm bg-neutral-900">
					<div className="flex p-16 justify-around space-x-10 md:space-x-0">
						<div className="space-y-7">
							<h1 className="uppercase font-bold tracking-widest">
								Information
							</h1>

							<ul className="space-y-1">
								<li>About Shop</li>
								<li>Our Location</li>
								<li>Delivery Information</li>
								<li>Terms & Conditions</li>
							</ul>
						</div>

						<div className="space-y-7">
							<h1 className="uppercase font-bold tracking-widest">Contact</h1>

							<ul className="space-y-1">
								<li>
									Lebanon Zone 2 2300 The Young Shall Grow Street Ashaiman, AS
									76051
								</li>
								<li>info@greenshopping.com</li>
							</ul>
						</div>

						<div className="space-y-7">
							<h1 className="uppercase font-bold tracking-widest">
								My Account
							</h1>

							<ul className="space-y-1">
								<li>Profile</li>
								<li>Order History</li>
							</ul>
						</div>
					</div>

					<h1 className="text-center bg-black p-3 text-xs md:text-sm">
						This project is not complete. Watch out for more added features
					</h1>
				</footer>
			</div>
		</>
	);
}

export default Layout;
