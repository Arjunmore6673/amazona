import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import {
  Badge,
  CarouselItem,
  Container,
  Nav,
  Navbar,
  NavDropdown,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Store } from './Store';
import { useContext } from 'react';
import CartScreen from './screens/CartScreen';
import SignInScreen from './screens/SignInScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SignupScreen from './screens/SignupScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, user } = state;

  console.log(user, 'user');

  const quantity = cart.cartItems?.reduce(
    (prev, current) => {
      let quantity = current.quantity;
      return Number(prev) + Number(quantity);
    },
    [0]
  );

  const signOutHandler = async () => {
    ctxDispatch({ type: 'USER_SIGN_OUT' });
  };

  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <header>
          <Navbar bg="dark" variant="dark">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>amazona</Navbar.Brand>
              </LinkContainer>

              <Nav className="me-auto">
                <Link to={'/cart'} className="nav-link">
                  Cart
                  {cart.cartItems?.length > 0 && <Badge>{quantity}</Badge>}
                </Link>
                {Object.keys(user)?.length ? (
                  <NavDropdown title={user.name} id="basic-nav-dropdown">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>User Profile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/orderhistory">
                      <NavDropdown.Item>Order History</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                    <Link
                      to="#"
                      onClick={signOutHandler}
                      className="dropdown-item"
                    >
                      Sign out
                    </Link>
                  </NavDropdown>
                ) : (
                  <Link to={'/signin'} className="nav-link">
                    Sign in
                  </Link>
                )}
              </Nav>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/product/:slug" exact element={<ProductScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/signin" element={<SignInScreen />} />
              <Route path="/shipping" element={<ShippingAddressScreen />} />
              <Route path="/signup" element={<SignupScreen />} />
              <Route path="/payment" element={<PaymentMethodScreen />} />
              <Route path="/placeorder" element={<PlaceOrderScreen />} />
              <Route path="/" element={<HomeScreen />} />
            </Routes>
          </Container>
        </main>

        <footer>
          <div className="text-center">all rights reserved</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
