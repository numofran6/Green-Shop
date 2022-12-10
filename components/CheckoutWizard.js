import React from 'react';

export default function CheckoutWizard({ activeStep = 0 }) {
	return (
		<div className="mb-5 flex flex-wrap">
			{['Your Adress', 'Payment Method', 'Finish Order'].map((step, i) => (
				<div
					key={step}
					className={`flex-1 border-b-2 text-center ${
						i < activeStep
							? 'border-blue-500 text-blue-500'
							: 'border-gray-400 text-gray-400'
					}`}
				>
					{step}
				</div>
			))}
		</div>
	);
}
