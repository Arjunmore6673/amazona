import { createContext, useReducer } from 'react';

export const Store = createContext();

const initialState = {
  cart: {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
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
      localStorage.setItem('cartItems', JSON.stringify(cartItems));

      return {
        ...state,
        cart: {
          ...state.cart,
          cartItems: cartItems,
        },
      };
    }
    case 'ADD_QUANTITY': {
      let cartItems = state.cart.cartItems?.map((x) =>
        x._id === action.payload
          ? {
              ...x,
              quantity: x.quantity + 1,
            }
          : x
      );

      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return {
        ...state,
        cart: {
          ...state.cart,
          cartItems: cartItems,
        },
      };
    }
    case 'DELETE_QUANTITY':
      let cartItems = state.cart.cartItems?.filter(
        (x) => x._id !== action.payload
      );

      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return {
        ...state,
        cart: {
          ...state.cart,
          cartItems: cartItems,
        },
      };
    case 'DELETE_CART_ITEM':
      return {
        ...state,
        cart: {
          ...state.cart,
          cartItems: state.cart.cartItems?.filter(
            (x) => x._id !== action.payload
          ),
        },
      };
    default:
      return state;
  }
};

export const StoreProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
};
