import { useEffect, useState } from "react";
import spotifyService from "../utils/SpotifyService.js";
import StarRating from "./StarRating.jsx";
import axios from "axios";
import "../styles/review.css";

function Review() {
  const accessToken = localStorage.getItem("accessToken");
  const service = spotifyService(accessToken);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  useEffect(() => {
    const getName = async () => {
      try {
        let name = await service.getUsername();
        setName(name);
        console.log(name);
      } catch (error) {
        console.error("Error fetching username:", error);
        // Optionally, you can set an error state here and handle it in the UI
      }
    };
    getName();
  }, [accessToken]);

  const handleRatingChange = (event) => {
    setRating(parseInt(event.target.value));
  };

  const handleReviewTextChange = (event) => {
    setReviewText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Add logic to submit the review and rating

    axios.post("http://localhost:3001/reviews", {
      review: reviewText,
      rating: rating,
      username: name,
    });

    console.log("Submitting review:", reviewText);
    console.log("Rating:", rating);
    // Optionally, you can call a function to submit the review to your backend
  };

  return (
    <div className="review-container">
      <h2>Write a Review</h2>
      <p>Welcome, {name}!</p>
      <form className="review-form" onSubmit={handleSubmit}>
        <label>
          Your Review:
          <textarea
            className="review-textarea"
            value={reviewText}
            onChange={handleReviewTextChange}
            rows={4}
            cols={50}
          />
        </label>
        <br />
        <label>
          Your Rating:
          <StarRating rating={rating} onRatingChange={setRating} />
        </label>
        <br />
        <button className="submit-button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Review;
