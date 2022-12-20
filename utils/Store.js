import React from 'react';
import Cookies from 'js-cookie';

export const Store = React.createContext();

const initialState = {
	cart: Cookies.get('cart')
		? JSON.parse(Cookies.get('cart'))
		: { cartItems: [], shippingAddress: {}, paymentMethod: '' },
};

const reducer = (state, action) => {
	switch (action.type) {
		case 'CART_ADD_ITEM': {
			const newItem = action.payload;
			const existItem = state.cart.cartItems.find(
				(item) => item.slug === newItem.slug
			);
			const cartItems = existItem
				? state.cart.cartItems.map((item) =>
						item.name === existItem.name ? newItem : item
				  )
				: [...state.cart.cartItems, newItem];
			Cookies.set('cart', JSON.stringify({ ...state.cart, cartItems }), {
				sameSite: 'Lax',
			});
			return { ...state, cart: { ...state.cart, cartItems } };
		}
		case 'CART_REMOVE_ITEM': {
			const cartItems = state.cart.cartItems.filter(
				(item) => item.slug !== action.payload.slug
			);

			Cookies.set('cart', JSON.stringify({ ...state.cart, cartItems }), {
				sameSite: 'Lax',
			});
			return { ...state, cart: { ...state.cart, cartItems } };
		}
		case 'CART_RESET': {
			return {
				...state,
				cart: {
					cartItems: [],
					shippingAddress: { location: {} },
					paymentMethod: '',
				},
			};
		}
		case 'CART_CLEAR_ITEMS': {
			Cookies.set('cart', JSON.stringify({ ...state.cart, cartItems: [] }), {
				sameSite: 'Lax',
			});
			return { ...state, cart: { ...state.cart, cartItems: [] } };
		}
		case 'SAVE_SHIPPING_ADDRESS': {
			Cookies.set(
				'cart',
				JSON.stringify({ ...state.cart, shippingAddress: action.payload }),
				{ sameSite: 'Lax' }
			);
			return {
				...state,
				cart: {
					...state.cart,
					shippingAddress: {
						...state.cart.shippingAddress,
						...action.payload,
					},
				},
			};
		}
		case 'SAVE_PAYMENT_METHOD': {
			Cookies.set(
				'cart',
				JSON.stringify({ ...state.cart, paymentMethod: action.payload }),
				{ sameSite: 'Lax' }
			);
			return {
				...state,
				cart: {
					...state.cart,
					paymentMethod: action.payload,
				},
			};
		}
		case 'ADD_ORDER_HISTORY': {
			Cookies.set(
				'orderHistory',
				JSON.stringify({ ...state, orderHistory: action.payload }),
				{ sameSite: 'Lax' }
			);
			return { ...state, orderHistory: action.payload };
		}
		default:
			return state;
	}
};

export function StoreProvider({ children }) {
	const [state, dispatch] = React.useReducer(reducer, initialState);

	return (
		<Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
	);
}
