import { Menu } from '@headlessui/react';
import Link from 'next/link';
import { CgProfile } from 'react-icons/cg';
import { AiOutlineDown } from 'react-icons/ai';

export default function ProfileMenu({ logoutClickHandler, name }) {
	return (
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
