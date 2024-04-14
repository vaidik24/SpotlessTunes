import { useState } from "react";
import { FaStar } from "react-icons/fa";
import PropTypes from "prop-types";
import "../styles/starrating.css";

function StarRating({ rating, onRatingChange }) {
  const [hoverRating, setHoverRating] = useState(0);

  const handleMouseEnter = (starValue) => {
    setHoverRating(starValue);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  return (
    <div className="star-rating">
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        return (
          <FaStar
            key={index}
            className={`star ${
              starValue <= (hoverRating || rating) ? "star-filled" : ""
            }`}
            onMouseEnter={() => handleMouseEnter(starValue)}
            onMouseLeave={handleMouseLeave}
            onClick={() => onRatingChange(starValue)} // This line calls the onRatingChange function when a star is clicked
          />
        );
      })}
    </div>
  );
}

StarRating.propTypes = {
  rating: PropTypes.string,
  onRatingChange: PropTypes.func,
};

export default StarRating;
