import { Menu } from '@headlessui/react';
import Link from 'next/link';
import { CgProfile } from 'react-icons/cg';
import { AiOutlineDown } from 'react-icons/ai';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export default function ProfileMenu({ logoutClickHandler, name }) {
	const [dropdownMenu, setDropdownMenu] = useState(false);
	const wrapperRef = useRef(null);

	useEffect(() => {
		/**
		 * Alert if clicked on outside of element
		 */
		function handleClickOutside(event) {
			if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
				setDropdownMenu(false);
			}
		}
		// Bind the event listener
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			// Unbind the event listener on clean up
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [wrapperRef]);

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
		<div className={'relative inline-block z-50'} ref={wrapperRef}>
			<div
				className={
					'flex cursor-pointer items-center text-green-100 hover:text-green-400 active:text-green-100'
				}
				onClick={() => setDropdownMenu(!dropdownMenu)}
			>
				<CgProfile className="w-6 h-6 mr-1" /> {name}{' '}
				<AiOutlineDown className="ml-3 w-4 h-4" />
			</div>

			{dropdownMenu && (
				<motion.div initial="hidden" animate="visible" variants={list}>
					<div
						className={
							'absolute left-0 mt-1 w-56 py-5 origin-top-right bg-emerald-700 rounded-md shadow-lg'
						}
					>
						<div onClick={() => setDropdownMenu(!dropdownMenu)}>
							<Link className="dropdown-link" href={'/cart'}>
								<motion.span
									variants={item}
									className="tracking-wide font-bold"
								>
									My Cart
								</motion.span>
							</Link>
						</div>

						<div onClick={() => setDropdownMenu(!dropdownMenu)}>
							<Link className="dropdown-link" href={'/order-history'}>
								<motion.span
									variants={item}
									className="tracking-wide font-bold"
								>
									Order History
								</motion.span>
							</Link>
						</div>

						<div onClick={() => setDropdownMenu(!dropdownMenu)}>
							<Link
								className="dropdown-link"
								href={'#'}
								onClick={logoutClickHandler}
							>
								<motion.span
									variants={item}
									className="tracking-wide font-bold"
								>
									Logout
								</motion.span>
							</Link>
						</div>
					</div>
				</motion.div>
			)}
		</div>
	);
}
