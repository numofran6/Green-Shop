import { Menu } from '@headlessui/react';
import Link from 'next/link';
import { CgProfile } from 'react-icons/cg';

export default function ProfileMenu({ logoutClickHandler, name }) {
	return (
		<Menu as="div" className={'relative inline-block z-10'}>
			<Menu.Button
				className={
					'flex items-center text-yellow-500 hover:text-yellow-600 active:text-yellow-500'
				}
			>
				<CgProfile className="w-6 h-6 mr-0.5" /> {name}
			</Menu.Button>

			<Menu.Items
				className={
					'absolute right-0 w-56 py-2 origin-top-right bg-emerald-700 shadow-lg'
				}
			>
				<Menu.Item>
					<Link className="dropdown-link" href={'/order-history'}>
						Order History
					</Link>
				</Menu.Item>
				<Menu.Item>
					<Link
						className="dropdown-link"
						href={'#'}
						onClick={logoutClickHandler}
					>
						Logout
					</Link>
				</Menu.Item>
			</Menu.Items>
		</Menu>
	);
}
