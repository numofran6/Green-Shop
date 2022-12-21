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

				<footer className="text-xs sm:text-sm flex flex-col justify-center h-16 shadow-inner text-center sm:mt-3 font-semibold bg-[#363636] text-[#eff1d4ee]">
					<p>
						Build inspired by SUBWAE STUDIOS.&nbsp;
						<span>
							Photo credit:&nbsp; <GrInstagram className="inline" />{' '}
							subwaestudios
						</span>
					</p>
				</footer>
			</div>
		</>
	);
}

export default Layout;
