import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Star = ({ full, half }) => {
  return (
    <i
      className={
        full ? 'fas fa-star' : half ? 'fas fa-star-half-alt' : 'far fa-star'
      }
    ></i>
  );
};

const Rating = ({ rating, numReviews }) => {
  return (
    <div className="rating">
      <span>
        <Star full={rating >= 1} half={rating === 0.5} />
        <Star full={rating >= 2} half={rating === 1.5} />
        <Star full={rating >= 3} half={rating === 2.5} />
        <Star full={rating >= 4} half={rating === 3.5} />
        <Star full={rating >= 5} half={rating === 4.5} />
      </span>
      <span>{numReviews} reviews</span>
    </div>
  );
};
export default Rating;
