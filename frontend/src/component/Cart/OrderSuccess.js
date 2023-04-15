import React from "react";
import "./Cart.css";
import { Typography } from "@material-ui/core";
import { Link, Navigate } from "react-router-dom";
import {useSelector } from "react-redux";
const OrderSuccess = () => {
  const { loading , order} = useSelector((state) => state.newOrder);
  if (!loading && !order) {
    return <Navigate to="/" replace />; // <-- return Redirect
  }
  return (
    <div className="orderSuccess">
      <i className="fa-solid fa-circle-check"></i>

      <Typography>Your Order has been placed successfully. </Typography>
      <Link to="/orders">View Orders</Link>
    </div>
  );
};

export default OrderSuccess;
