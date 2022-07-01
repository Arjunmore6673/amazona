import { createContext, useReducer } from 'react';

export const Store = createContext();

const initialState = {
  user: localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : {},
  cart: {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
    shippingAddress: localStorage.getItem('shippingAddress')
      ? JSON.parse(localStorage.getItem('shippingAddress'))
      : {},
    paymentMethod: localStorage.getItem('paymentMethod')
      ? localStorage.getItem('paymentMethod')
      : '',
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
      console.log(cartItems, 'cartItems');
      return {
        ...state,
        cart: {
          ...state.cart,
          cartItems: cartItems,
        },
      };
    case 'DELETE_CART_ITEM': {
      let cartItems = state.cart.cartItems?.filter(
        (x) => x._id !== action.payload
      );
      localStorage.setItem('cartItems', JSON.stringify(cartItems || []));
      return {
        ...state,
        cart: {
          ...state.cart,
          cartItems: cartItems,
        },
      };
    }
    case 'USER_LOGIN': {
      localStorage.setItem('user', JSON.stringify(action.payload));
      return {
        ...state,
        user: action.payload,
      };
    }
    case 'USER_SIGN_OUT': {
      localStorage.removeItem('user');
      return {
        ...state,
        user: {},
        cart: {
          cartItems: [],
          shippingAddress: {},
          paymentMethod: '',
        },
      };
    }

    case 'SAVE_SHIPPING_ADDRESS':
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress: action.payload,
        },
      };
    case 'SAVE_PAYMENT_METHOD':
      return {
        ...state,
        cart: {
          ...state.cart,
          paymentMethod: action.payload,
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
