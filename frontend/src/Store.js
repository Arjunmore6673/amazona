import { createContext, useReducer } from 'react';

export const Store = createContext();

const initialState = {
  cart: {
    cartItems: [],
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'CART_ADD_ITEM': {
      const { _id } = action.payload;
      let checkIsSlugThere = state.cart.cartItems?.find((x) => x._id === _id);
      let cartItems = state.cart.cartItems;
      if (checkIsSlugThere) {
        cartItems = state.cart.cartItems?.map((x) => {
          return x._id === _id ? { ...x, quantity: x.quantity + 1 } : x;
        });
      } else {
        cartItems.push({ ...action.payload, quantity: 1 });
      }

      return {
        ...state,
        cart: {
          ...state.cart,
          cartItems: cartItems,
        },
      };
    }
    default:
      return state;
  }
};

export const StoreProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
};
