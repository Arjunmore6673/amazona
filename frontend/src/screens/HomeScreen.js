import axios from 'axios';
import { useEffect, useReducer } from 'react';
import { Link } from 'react-router-dom';
import logger from 'use-reducer-logger';

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
  const [{ loading, products, error }, dispatch] = useReducer(logger(reducer), {
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
      <h1>Featured Products</h1>
      <div className="products">
        {error && <div>{error}</div>}
        {loading ? (
          <div>Loading...</div>
        ) : (
          products?.map((x) => {
            return (
              <div key={x.slug} className="product">
                <Link to={`/product/${x.slug}`}>
                  <img src={x.image} alt={x.name} />
                </Link>

                <div className="product-info">
                  <Link to={`/product/${x.slug}`}>
                    <p>{x.name}</p>
                  </Link>

                  <p>
                    <strong>{x.price}</strong>
                  </p>
                  <button>add to cart</button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
export default HomeScreen;
