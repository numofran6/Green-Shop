import React from 'react';
import Layout from '../components/Layout';
import CheckoutWizard from '../components/CheckoutWizard';
import { PaymentForm } from '../components/PaymentForm';

export default function Payment() {
	return (
		<>
			<Layout title={'Payment'}>
				<CheckoutWizard activeStep={2} />
				<PaymentForm />
			</Layout>
		</>
	);
}

Payment.auth = true;
