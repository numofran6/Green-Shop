import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { useRouter } from 'next/router';
import OrderTracking from '../../components/OrderTracking';

export default function OrderScreen() {
	const { query } = useRouter();
	const orderId = query.id;

	return (
		<PayPalScriptProvider options={process.env.PAYPAL_CLIENT_ID}>
			<OrderTracking orderId={orderId} />
		</PayPalScriptProvider>
	);
}

OrderScreen.auth = true;
