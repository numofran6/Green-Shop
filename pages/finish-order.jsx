import Layout from '../components/Layout';
import CheckoutWizard from '../components/CheckoutWizard';
import { OrderSummary } from '../components/OrderSummary';

export default function FinishOrder() {
	return (
		<div>
			<Layout title={'Finish Order'}>
				<div className="my-14">
					<CheckoutWizard activeStep={3} />
					<OrderSummary />
				</div>
			</Layout>
		</div>
	);
}

FinishOrder.auth = true;
