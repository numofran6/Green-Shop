import { AddressForm } from '../components/AddressForm';
import CheckoutWizard from '../components/CheckoutWizard';
import Layout from '../components/Layout';

export default function Shipping() {
	return (
		<>
			<Layout title={'shipping'}>
				<CheckoutWizard activeStep={1} />
				<AddressForm />
			</Layout>
		</>
	);
}

Shipping.auth = true;
