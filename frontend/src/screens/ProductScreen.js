import axios from 'axios';
import { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import Rating from '../components/Rating';
import { Helmet } from 'react-helmet-async';
import MessageBox from '../components/MessegeBox';
import LoadingBox from '../components/LoadingBox';
import { getError } from '../utls';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, product: action.payload };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return { ...state };
  }
};
const ProductScreen = () => {
  const params = useParams();
  const { slug } = params || {};
  const [{ loading, product, error }, dispatch] = useReducer(reducer, {
    loading: true,
    product: {},
    error: '',
  });

  useEffect(() => {
    fetchData();
  }, [slug]);

  const fetchData = async () => {
    try {
      dispatch({ type: 'FETCH_REQUEST' });
      const result = await axios.get(`/api/products/slug/${slug}`);
      console.log(result, 'result');
      dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
    } catch (e) {
      console.log(e);
      dispatch({ type: 'FETCH_FAIL', payload: getError(e) });
    }
  };

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <Row>
        <Col md={6}>
          <img src={product.image} alt={product.name} className="img-large" />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <Helmet>
              <title>{product.name}</title>
            </Helmet>
            <ListGroup.Item>
              <h1>{product.name}</h1>
            </ListGroup.Item>
          </ListGroup>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Rating
                rating={product.rating}
                numReviews={product.numReviews}
              ></Rating>
            </ListGroup.Item>
          </ListGroup>

          <ListGroup variant="flush">
            <ListGroup.Item>
              <Row>
                <Col>Price:</Col>
                <Col>{product.price}</Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Row>
                <Col>Description:</Col>
                <Col>{product.description}</Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={3}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>{product.price}</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? (
                        <div>available</div>
                      ) : (
                        <div>not available</div>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    {product.countInStock > 0 ? (
                      <Button>Add to Cart</Button>
                    ) : null}
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default ProductScreen;
