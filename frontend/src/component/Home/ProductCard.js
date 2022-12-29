import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

const ProductCard = ({ product }) => {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "gold",
    value: product.ratings,
    isHalf: true,
    size: window.innerWidth < 600 ? 20 : 25,
  };

  return (
    <Link className="prodCard" to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt={product.name} />
      <h4>{product.name}</h4>
      <div className="ratingDiv">
        <ReactStars {...options} />{" "}
        <span id="reviews">({product.numOfReviews} Reviews)</span>
      </div>
      <span id="price">{`₹ ${product.price}`}</span>
    </Link>
  );
};

export default ProductCard;
