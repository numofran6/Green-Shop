import Link from 'next/link';
import React from 'react';

export default function PageNotFound() {
	return (
		<div className="h-screen flex flex-col items-center justify-center space-y-3 text-center">
			<h1 className="text-lg md:text-xl text-emerald-900">
				404 | This page could not be found.
			</h1>

			<Link
				href={'/shop'}
				className="text-green-600 text-sm hover:text-green-400 active:text-green-600"
			>
				Go Shopping
			</Link>
		</div>
	);
}
