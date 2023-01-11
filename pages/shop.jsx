import Layout from '../components/Layout';
import ProductItem from '../components/ProductItem';
import db from '../utils/db';
import Product from '../models/Product';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { AiOutlineDown } from 'react-icons/ai';

export default function Home({ products }) {
	return (
		<>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5 }}
			>
				<Layout>
					<div className="px-12 py-20 space-y-5 bg-emerald-900 text-emerald-50">
						<div className="text-xs md:text-sm space-x-3">
							<Link href={'/'}>Home</Link>
							<span>{'>'} </span>
							<Link href={'/shop'}>Shop</Link>
						</div>
						<h1 className="md:tracking-widest uppercase text-6xl">Products</h1>
					</div>

					<div className="md:grid md:grid-cols-5 text-black bg-white">
						<div className="md:pr-5 pb-5 md:pb-0 bg-stone-100 md:py-9 py-5 px-16  md:px-5">
							<form className="space-y-8">
								<div className="space-y-5 md:border-b-[1px] md:border-gray-300 md:pb-8">
									<Accordion>
										<AccordionSummary
											expandIcon={<AiOutlineDown />}
											className="font-bold text-gray-600"
										>
											Price
										</AccordionSummary>

										<AccordionDetails>
											<div className="space-y-3 ml-5 text-sm">
												<label className="space-x-3 flex items-center">
													<input type="checkbox" /> <span>{'<'} $50</span>
												</label>

												<label className="space-x-3 flex items-center">
													<input type="checkbox" /> <span>{'<'} $100</span>
												</label>

												<label className="space-x-3 flex items-center">
													<input type="checkbox" /> <span>{'>'} $100</span>
												</label>

												<label className="space-x-3 flex items-center">
													<input type="checkbox" /> <span>{'>'} $150</span>
												</label>
											</div>
										</AccordionDetails>
									</Accordion>
								</div>

								<div className="space-y-5 md:border-b-[1px] border-gray-300 md:pb-8">
									<Accordion>
										<AccordionSummary
											expandIcon={<AiOutlineDown />}
											className="font-bold text-gray-600"
										>
											Brand
										</AccordionSummary>

										<AccordionDetails>
											<div className="space-y-3 ml-5 text-sm">
												<label className="space-x-3 flex items-center">
													<input type="checkbox" /> <span>Subwae Studios</span>
												</label>

												<label className="space-x-3 flex items-center">
													<input type="checkbox" /> <span>Free The Youth</span>
												</label>

												<label className="space-x-3 flex items-center">
													<input type="checkbox" /> <span>Fumais</span>
												</label>

												<label className="space-x-3 flex items-center">
													<input type="checkbox" /> <span>B-Trip</span>
												</label>
											</div>
										</AccordionDetails>
									</Accordion>
								</div>
							</form>
						</div>

						<div className="col-span-4 py-9  px-5">
							<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7">
								{products.map((product) => (
									<ProductItem product={product} key={product.slug} />
								))}
							</div>
						</div>
					</div>
				</Layout>
			</motion.div>
		</>
	);
}

export async function getServerSideProps() {
	await db.connect();
	const products = await Product.find().lean();

	return {
		props: {
			products: products.map(db.convertDocToObj),
		},
	};
}
