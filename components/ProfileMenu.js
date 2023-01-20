import { Menu } from '@headlessui/react';
import Link from 'next/link';
import { CgProfile } from 'react-icons/cg';
import { AiOutlineDown } from 'react-icons/ai';
import { motion } from 'framer-motion';

export default function ProfileMenu({ logoutClickHandler, name }) {
	const list = {
		visible: {
			opacity: 1,
			transition: {
				when: 'beforeChildren',
				staggerChildren: 0.3,
			},
		},
		hidden: {
			opacity: 0,
			transition: {
				when: 'afterChildren',
			},
		},
	};

	const item = {
		visible: { opacity: 1, y: 0 },
		hidden: { opacity: 0, y: 100 },
	};

	return (
		<motion.div initial="hidden" animate="visible" variants={list}>
			<Menu as="div" className={'relative inline-block z-10'}>
				<Menu.Button
					className={
						'flex items-center text-green-100 hover:text-green-400 active:text-green-100'
					}
				>
					<CgProfile className="w-6 h-6 mr-1" /> {name}{' '}
					<AiOutlineDown className="ml-3 w-4 h-4" />
				</Menu.Button>

				<Menu.Items
					className={
						'absolute left-0 mt-1 w-56 py-2 origin-top-right bg-emerald-700 shadow-lg'
					}
				>
					<Menu.Item>
						<Link className="dropdown-link" href={'/order-history'}>
							<motion.span variants={item}>Order History</motion.span>
						</Link>
					</Menu.Item>
					<Menu.Item>
						<Link
							className="dropdown-link"
							href={'#'}
							onClick={logoutClickHandler}
						>
							<motion.span variants={item}>Logout</motion.span>
						</Link>
					</Menu.Item>
				</Menu.Items>
			</Menu>
		</motion.div>
	);
}
