import { useContext } from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import Rating from './Rating';
import axios from 'axios';

const Product = ({ product }) => {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  console.log(state, 'state');
  const { cart } = state;

  const addToCardHandler = async () => {
    const existItem = cart.cartItems?.find((x) => x._id === product._id);
    const quantity = existItem ? existItem?.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data?.quantity < quantity) {
      window.alert('Sorry, Product is out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: product,
    });
    navigate('/cart');
  };

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
          <Button onClick={addToCardHandler}>add to cart</Button>
        </Card.Body>
      </Card>
    </>
  );
};
export default Product;
