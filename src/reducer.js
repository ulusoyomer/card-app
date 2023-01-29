const reducer = (state, action) => {
	switch (action.type) {
		case 'CLEAR_CART':
			return { ...state, cart: [] };
		case 'REMOVE':
			return {
				...state,
				cart: state.cart.filter((item) => item.id !== action.payload),
			};
		case 'INCREASE':
			return {
				...state,
				cart: changeAmount(state.cart, action.payload, 1),
			};
		case 'DECREASE':
			return {
				...state,
				cart: changeAmount(state.cart, action.payload, -1),
			};
		case 'GET_TOTALS':
			let total = state.cart.reduce(
				(total, item) => total + item.amount * item.price,
				0
			);
			total = parseFloat(total.toFixed(2));
			return {
				...state,
				total,
				amount: state.cart.reduce((total, item) => item.amount + total, 0),
			};
		case 'LOADING':
			return { ...state, loading: true };
		case 'DISPLAY_ITEMS':
			return {
				...state,
				loading: false,
				cart: action.payload,
				amount: state.cart.reduce((total, item) => item.amount + total, 0),
			};
		default:
			throw new Error('no matching action');
	}
};

const changeAmount = (carts, id, num) => {
	const tempCart = carts.map((cardItem) => {
		if (cardItem.id === id) {
			return { ...cardItem, amount: cardItem.amount + num };
		}
		return cardItem;
	});
	return tempCart.filter((item) => item.amount !== 0);
};

export default reducer;
