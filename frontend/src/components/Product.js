import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Product = ({ product }) => {
  return (
    <>
      <Card>
        <Link to={`/product/${product.slug}`}>
          <img
            src={product.image}
            alt={product.name}
            className="card-img-top"
          />
        </Link>

        <Card.Body className="product-info">
          <Link to={`/product/${product.slug}`}>
            <Card.Title>{product.name}</Card.Title>
          </Link>
          <Rating
            rating={product.rating}
            numReviews={product.numReviews}
          ></Rating>
          <Card.Text>${product.price}</Card.Text>
          <Button>add to cart</Button>
        </Card.Body>
      </Card>
    </>
  );
};
export default Product;
