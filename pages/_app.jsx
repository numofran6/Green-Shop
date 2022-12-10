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
	<Head>
		<link rel="icon" href="/favicon.ico" />
	</Head>;

	return (
		<>
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
