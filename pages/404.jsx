import Link from 'next/link';
import React from 'react';

export default function PageNotFound() {
	return (
		<div className="h-screen flex flex-col items-center justify-center space-y-5 text-center">
			<h1 className="text-2xl text-emerald-200">
				404 | This page could not be found.
			</h1>

			<Link href={'/'} className="text-xl">
				Go Shopping
			</Link>
		</div>
	);
}
