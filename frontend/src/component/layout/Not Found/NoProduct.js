import React from "react";
import "./NotFound.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const NoProduct = () => {
  return (
    <div className="PageNotFound">
       <i className="fa-solid fa-face-grin-beam-sweat"></i>
      <Typography>No Products matched the search critera </Typography>
      <Link to="/products">Products</Link>
    </div>
  );
};

export default NoProduct;
