import Cookies from 'js-cookie';
import { useReducer } from 'react';
import { createContext } from 'react';

const initialState = {
	loading: true,
	order: Cookies.get('order') ? JSON.parse(Cookies.get('order')) : {},
	error: '',
};

const reducer = (state, action) => {
	switch (action.type) {
		case 'FETCH_REQUEST':
			return { ...state, loading: true, error: '' };
		case 'FETCH_SUCCESS':
			Cookies.set('order', JSON.stringify({ order: action.payload }), {
				sameSite: 'None',
			});
			return { ...state, loading: false, error: '', order: action.payload };
		case 'FETCH_FAIL':
			return { ...state, loading: false, error: action.payload };
		case 'PAY_REQUEST':
			return { ...state, loadingPay: true };
		case 'PAY_SUCCESS':
			return { ...state, loadingPay: false, successPay: true };
		case 'PAY_FAIL':
			return { ...state, loadingPay: false, errorPay: action.payload };
		case 'PAY_RESET':
			return { ...state, loadingPay: false, successPay: false, errorPay: '' };
		default:
			state;
	}
};

export const Order = createContext();

export default function OrderProvider({ children }) {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<Order.Provider value={{ state, dispatch }}>{children}</Order.Provider>
	);
}
