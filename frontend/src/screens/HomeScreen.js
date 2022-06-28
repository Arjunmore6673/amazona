import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const result = await axios.get('/api/products');
    setProducts(result.data);
  };

  return (
    <div>
      <h1>Featured Products</h1>
      <div className="products">
        {products?.map((x) => {
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
        })}
      </div>
    </div>
  );
};
export default HomeScreen;
