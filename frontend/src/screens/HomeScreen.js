import axios from 'axios';
import { useEffect, useReducer } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Product from '../components/Product';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessegeBox';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, products: action.payload };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return { ...state };
  }
};

const HomeScreen = () => {
  // const [products, setProducts] = useState([]);
  const [{ loading, products, error }, dispatch] = useReducer(reducer, {
    loading: true,
    products: [],
    error: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      dispatch({ type: 'FETCH_REQUEST' });
      const result = await axios.get('/api/products');
      console.log(result, 'result');
      dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
    } catch (e) {
      dispatch({ type: 'FETCH_FAIL', payload: e.toString() });
    }
  };

  return (
    <div>
      <Helmet>
        <title>amazona</title>
      </Helmet>
      <h1>Featured Products</h1>
      <div className="products">
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        {loading ? (
          <LoadingBox />
        ) : (
          <Row>
            {products?.map((x) => {
              return (
                <Col key={x.slug} sm={4} md={4} lg={3} className="mb-3">
                  <Product product={x} />
                </Col>
              );
            })}
          </Row>
        )}
      </div>
    </div>
  );
};
export default HomeScreen;
