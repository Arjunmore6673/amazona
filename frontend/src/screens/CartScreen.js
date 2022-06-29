import axios from 'axios';
import { useContext, useEffect } from 'react';
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import { Store } from '../Store';
import { getError } from '../utls';
import { Link } from 'react-router-dom';

const CartScreen = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;
  const fetchData = async () => {
    try {
      ctxDispatch({ type: 'FETCH_REQUEST' });
      const result = await axios.get(`/api/products`);
      console.log(result, 'result');
      ctxDispatch({ type: 'FETCH_SUCCESS', payload: result.data });
    } catch (e) {
      console.log(e);
      ctxDispatch({ type: 'FETCH_FAIL', payload: getError(e) });
    }
  };

  useEffect(() => {}, []);

  const { cartItems } = cart || {};

  const total = cartItems.reduce((prev, next) => {
    return prev + next.price * next.quantity;
  }, 0);
  const quantity = cartItems.reduce((prev, next) => {
    return prev + next.quantity;
  }, 0);

  return (
    <div>
      <h1>Shopping Cart</h1>
      <Row>
        <Col lg={8} md={8}>
          {cartItems?.map((x) => {
            return (
              <ListGroup.Item>
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
                    <Button variant="light" disabled={x.quantity === 1}>
                      <i className="fas fa-minus-circle"></i>
                    </Button>
                    <span>{x.quantity}</span>
                    <Button variant="light" disabled={x.quantity === 1}>
                      <i className="fas fa-plus-circle"></i>
                    </Button>
                  </Col>
                  <Col>
                    <Button variant="primary">
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
