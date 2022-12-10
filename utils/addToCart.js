import axios from 'axios';
import { toast } from 'react-toastify';

export const addToCart = async (product, state, dispatch) => {
	const existItem = state.cart.cartItems.find(
		(item) => item.slug === product.slug
	);
	const quantity = existItem ? existItem.quantity + 1 : 1;
	const { data } = await axios.get(`/api/products/${product._id}`);

	if (data.countInStock < quantity) {
		toast.error('Sorry! Product is out of stock.');
		return;
	}

	dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });

	toast.success(`${product.name} added to cart`);
};
