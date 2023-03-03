import Layout from '../components/Layout';
import ProductItem from '../components/ProductItem';
import db from '../utils/db';
import Product from '../models/Product';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { AiOutlineDown, AiOutlineClose } from 'react-icons/ai';
import { useRouter } from 'next/router';

const PAGE_SIZE = 5;

const prices = [
	{
		name: '$1 to $200',
		value: '1-200',
	},
	{
		name: '$201 to $500',
		value: '201-500',
	},
	{
		name: '> $501',
		value: '501-1000',
	},
];

export default function Home({
	products,
	countProducts,
	categories,
	brands,
	pages,
}) {
	const router = useRouter();

	const {
		query = 'all',
		category = 'all',
		brand = 'all',
		price = 'all',
		sort = 'newest',
		page = 1,
	} = router.query;

	const filterSearch = ({
		page,
		category,
		brand,
		sort,
		min,
		max,
		searchQuery,
		price,
		rating,
	}) => {
		const { query } = router;
		if (page) query.page = page;
		if (searchQuery) query.searchQuery = searchQuery;
		if (sort) query.sort = sort;
		if (category) query.category = category;
		if (brand) query.brand = brand;
		if (price) query.price = price;
		if (rating) query.rating = rating;
		if (min) query.min ? query.min : query.min === 0 ? 0 : min;
		if (max) query.max ? query.max : query.max === 0 ? 0 : max;

		router.push({
			pathname: router.pathname,
			query: query,
		});
	};
	const categoryHandler = (e) => {
		filterSearch({ category: e.target.value });
	};
	const pageHandler = (page) => {
		filterSearch({ page });
	};
	const brandHandler = (e) => {
		filterSearch({ brand: e.target.value });
	};
	const sortHandler = (e) => {
		filterSearch({ sort: e.target.value });
	};
	const priceHandler = (e) => {
		filterSearch({ price: e.target.value });
	};

	return (
		<Layout>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
			>
				<div className="px-12 py-20 lg:py-10 space-y-5 bg-emerald-900 text-emerald-50">
					<div className="text-xs md:text-sm space-x-3">
						<Link href={'/'}>Home</Link>
						<span>{'>'} </span>
						<Link href={'/shop'}>Shop</Link>
					</div>
					<h1 className="md:tracking-widest uppercase text-5xl sm:text-6xl">
						Products
					</h1>
				</div>

				<div className="md:grid md:grid-cols-5 text-black bg-white">
					<div className="hidden md:block md:pr-5 pb-5 md:pb-0 bg-stone-100 md:py-9 py-5 px-16  md:px-5 space-y-3">
						<div className="space-y-3 md:border-b-[1px] border-gray-300 md:pb-8">
							<h2 className="heading">Categories</h2>
							<select
								className="w-full"
								value={category}
								onChange={categoryHandler}
							>
								<option value="all">All</option>
								{categories &&
									categories.map((category) => (
										<option key={category} value={category}>
											{category}
										</option>
									))}
							</select>
						</div>

						<div className="space-y-3 md:border-b-[1px] border-gray-300 md:pb-8">
							<h2 className="heading">Brand</h2>
							<select className="w-full" value={brand} onChange={brandHandler}>
								<option value="all">All</option>
								{brands &&
									brands.map((brand) => (
										<option key={brand} value={brand}>
											{brand}
										</option>
									))}
							</select>
						</div>

						<div className="space-y-3 md:pb-8">
							<h2 className="heading">Price</h2>
							<select className="w-full" value={price} onChange={priceHandler}>
								<option value="all">All</option>
								{prices &&
									prices.map((price) => (
										<option key={price.value} value={price.value}>
											{price.name}
										</option>
									))}
							</select>
						</div>
					</div>

					<Accordion className="md:hidden">
						<AccordionSummary
							expandIcon={<AiOutlineDown />}
							className="heading text-gray-600"
						>
							Filters
						</AccordionSummary>

						<AccordionDetails>
							<div className="p-5 bg-stone-100 space-y-7">
								<div className="space-y-3 md:border-b-[1px] border-gray-300">
									<h2 className="heading">Categories</h2>
									<select
										className="w-full"
										value={category}
										onChange={categoryHandler}
									>
										<option value="all">All</option>
										{categories &&
											categories.map((category) => (
												<option key={category} value={category}>
													{category}
												</option>
											))}
									</select>
								</div>

								<div className="space-y-3 md:border-b-[1px] border-gray-300">
									<h2 className="heading">Brand</h2>
									<select
										className="w-full"
										value={brand}
										onChange={brandHandler}
									>
										<option value="all">All</option>
										{brands &&
											brands.map((brand) => (
												<option key={brand} value={brand}>
													{brand}
												</option>
											))}
									</select>
								</div>

								<div className="space-y-3">
									<h2 className="heading">Price</h2>
									<select
										className="w-full"
										value={price}
										onChange={priceHandler}
									>
										<option value="all">All</option>
										{prices &&
											prices.map((price) => (
												<option key={price.value} value={price.value}>
													{price.name}
												</option>
											))}
									</select>
								</div>
							</div>
						</AccordionDetails>
					</Accordion>

					<div className="col-span-4 px-5">
						<div className="flex flex-col md:flex-row items-center justify-between md:m-5 my-5 pb-5 border-b border-emerald-800  text-sm md:text-md space-y-4 md:space-y-0">
							<div className="flex items-center text-emerald-800">
								{products.length === 0 ? 'No' : countProducts} Results
								{query !== 'all' && query !== '' && ' : ' + query}
								{category !== 'all' && ' : ' + category}
								{brand !== 'all' && ' : ' + brand}
								{price !== 'all' && ' : Price ' + price}
								&nbsp;
								{(query !== 'all' && query !== '') ||
								category !== 'all' ||
								brand !== 'all' ||
								price !== 'all' ? (
									<button onClick={() => router.push('/shop')}>
										<AiOutlineClose className="h-5 w-5 text-red-500" />
									</button>
								) : null}
							</div>

							<div className="flex items-center space-x-2">
								<p>Sort By: </p>
								<select value={sort} onChange={sortHandler}>
									<option value="lowest">Price: Low to High</option>
									<option value="highest">Price: High to Low</option>
									<option value="newest">Newest Arrivals</option>
								</select>
							</div>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
							{products.map((product) => (
								<ProductItem product={product} key={product.slug} />
							))}
						</div>

						<ul className="flex justify-center items-center pt-5 pb-10">
							{products.length > 0 &&
								[...Array(pages).keys()].map((pageNumber) => (
									<li key={pageNumber}>
										<button
											className={`pagination m-2 ${
												page == pageNumber + 1 ? 'font-bold' : ''
											} `}
											onClick={() => pageHandler(pageNumber + 1)}
										>
											{pageNumber + 1}
										</button>
									</li>
								))}
						</ul>
					</div>
				</div>
			</motion.div>
		</Layout>
	);
}

export async function getServerSideProps({ query }) {
	const pageSize = query.pageSize || PAGE_SIZE;
	const page = query.page || 1;
	const category = query.category || '';
	const brand = query.brand || '';
	const price = query.price || '';
	const sort = query.sort || '';
	const searchQuery = query.query || '';

	const queryFilter =
		searchQuery && searchQuery !== 'all'
			? {
					name: {
						$regex: searchQuery,
						$options: 'i',
					},
			  }
			: {};
	const categoryFilter = category && category !== 'all' ? { category } : {};
	const brandFilter = brand && brand !== 'all' ? { brand } : {};
	const priceFilter =
		price && price !== 'all'
			? {
					price: {
						$gte: Number(price.split('-')[0]),
						$lte: Number(price.split('-')[1]),
					},
			  }
			: {};
	const order =
		sort === 'featured'
			? { isFeatured: -1 }
			: sort === 'lowest'
			? { price: 1 }
			: sort === 'highest'
			? { price: -1 }
			: sort === 'toprated'
			? { rating: -1 }
			: sort === 'newest'
			? { createdAt: -1 }
			: { _id: -1 };

	await db.connect();
	const categories = await Product.find().distinct('category');
	const brands = await Product.find().distinct('brand');
	const productDocs = await Product.find({
		...queryFilter,
		...categoryFilter,
		...priceFilter,
		...brandFilter,
	})
		.sort(order)
		.skip(pageSize * (page - 1))
		.limit(pageSize)
		.lean();

	const countProducts = await Product.countDocuments({
		...queryFilter,
		...categoryFilter,
		...priceFilter,
		...brandFilter,
	});

	// const products = await Product.find().lean();
	const products = productDocs.map(db.convertDocToObj);

	return {
		props: {
			products,
			countProducts,
			page,
			pages: Math.ceil(countProducts / pageSize),
			categories,
			brands,
		},
	};
}
