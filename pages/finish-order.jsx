import Layout from '../components/Layout';
import CheckoutWizard from '../components/CheckoutWizard';
import { OrderSummary } from '../components/OrderSummary';

export default function FinishOrder() {
	return (
		<div>
			<Layout title={'Finish Order'}>
				<CheckoutWizard activeStep={3} />
				<OrderSummary />
			</Layout>
		</div>
	);
}

FinishOrder.auth = true;
