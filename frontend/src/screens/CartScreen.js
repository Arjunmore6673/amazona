import axios from 'axios';
import { useContext, useEffect } from 'react';
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import { Store } from '../Store';
import { getError } from '../utls';
import { Link, useNavigate } from 'react-router-dom';

const CartScreen = () => {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
    user,
  } = state;

  useEffect(() => {}, []);

  const total = cartItems.reduce((prev, next) => {
    return prev + next.price * next.quantity;
  }, 0);
  const quantity = cartItems.reduce((prev, next) => {
    return prev + next.quantity;
  }, 0);

  const updateQuantity = async (item, type) => {
    const quantity = item ? item?.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data?.countInStock < quantity) {
      window.alert('Sorry, Product is out of stock');
      return;
    }
    ctxDispatch({ type: type, payload: item._id });
  };

  const deleteCartItem = async (item) => {
    ctxDispatch({ type: 'DELETE_CART_ITEM', payload: item._id });
  };

  const checkoutHandler = async () => {
    console.log('checkoutHandler', user);
    if (Object.keys(user).length > 0) {
      console.log('inside user');
      navigate('/shipping');
    } else {
      console.log('else user');
      navigate('/signin?redirect=/shipping');
    }
  };

  return (
    <div>
      <h1>Shopping Cart</h1>
      <Row>
        <Col lg={8} md={8}>
          {cartItems?.map((x) => {
            return (
              <ListGroup.Item key={x._id}>
                <Row className="align-items-center">
                  <Col>
                    <img
                      src={x.image}
                      alt={x.name}
                      className="img-fluid img-thumbnail rounded"
                    />
                  </Col>
                  <Col>
                    <Link to={`/product/${x.slug}`}>{x.name}</Link>
                  </Col>
                  <Col>
                    <Button
                      onClick={() => updateQuantity(x, 'DELETE_QUANTITY')}
                      variant="light"
                      disabled={x.quantity === 1}
                    >
                      <i className="fas fa-minus-circle"></i>
                    </Button>
                    <span>{x.quantity}</span>
                    <Button
                      onClick={() => updateQuantity(x, 'ADD_QUANTITY')}
                      variant="light"
                    >
                      <i className="fas fa-plus-circle"></i>
                    </Button>
                  </Col>
                  <Col>
                    <Button onClick={() => deleteCartItem(x)} variant="primary">
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            );
          })}
        </Col>
        <Col lg={4} md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>
                    Subtotal of {quantity} {` `} items: ${total}
                  </h3>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Button
                    type="button"
                    variant="primary"
                    onClick={checkoutHandler}
                    disabled={cartItems.length === 0}
                  >
                    Proceed to checkout
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default CartScreen;
