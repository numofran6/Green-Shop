import '../styles/globals.css';
import { StoreProvider } from '../utils/Store';
import OrderProvider from '../utils/Order';
import { SessionProvider } from 'next-auth/react';
import { ShippingAuth } from '../components/ShippingAuth';
import Head from 'next/head';

export default function App({
	Component,
	pageProps: { session, ...pageProps },
}) {
	return (
		<>
			<Head>
				<link rel="icon" href="/favicon.ico" />
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

				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin="true"
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&family=Open+Sans:wght@300;400;500;600;700;800&display=swap"
					rel="stylesheet"
				/>

				<title>Home - Green Shop</title>
			</Head>

			<SessionProvider session={session}>
				<OrderProvider>
					<StoreProvider>
						{Component.auth ? (
							<ShippingAuth>
								<Component {...pageProps} />
							</ShippingAuth>
						) : (
							<Component {...pageProps} />
						)}
					</StoreProvider>
				</OrderProvider>
			</SessionProvider>
		</>
	);
}
