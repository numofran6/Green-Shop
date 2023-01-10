import React from 'react';
import Layout from '../components/Layout';
import CheckoutWizard from '../components/CheckoutWizard';
import { PaymentForm } from '../components/PaymentForm';

export default function Payment() {
	return (
		<>
			<Layout title={'Payment'}>
				<div className="my-14">
					<CheckoutWizard activeStep={2} />
					<PaymentForm />
				</div>
			</Layout>
		</>
	);
}

Payment.auth = true;
