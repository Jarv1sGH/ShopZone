import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import "./productCard.css";
const ProductCard = ({ product }) => {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "red",
    value: product.ratings,
    isHalf: true,
    size: window.innerWidth < 600 ? 20 : 16,
  };

  return (
    <Link to={`/product/${product._id}`}>
      <div className="productCard">
        <div className="productImage">
          <img src={product.images[0].url} alt={product.name} />
          <div className="ratingContainer">
            <ReactStars {...options} />
          </div>
        </div>

        <div className="productInfo">
          <p>{product.name}</p>
          {/* <p>{product.name.slice(0,40)}{product.name.length > 40 ? "..." : ""}</p> */}
          <span id="price">{`₹ ${product.price}`}</span>
         
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
