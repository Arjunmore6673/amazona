import { Link } from 'react-router-dom';
import data from '../data';

const HomeScreen = () => {
  return (
    <div>
      <h1>Featured Products</h1>
      <div className="products">
        {data.products?.map((x) => {
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
