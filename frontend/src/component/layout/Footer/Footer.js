import React from "react";
// import {Link} from "react-router-dom";
import "./Footer.css";
const Footer = () => {
  return (
    <footer id="footer">
      <div id="footerLeft">
        <h4>
          Contact Us <i className="fa-solid fa-phone"></i>
        </h4>
        <p>
          <i className="fa-regular fa-envelope"></i> shopzontempemail@gmail.com
        </p>
      </div>
      <div id="footerMid">
        <h1>ShopZone</h1>
        <p>This is not a real Ecommerce website and is only made for educational and learning purposes.</p>
        <p> Copyright 2022 &copy; ShopZone</p>
      </div>
      <div id="footerRight">
        <h4>Connect with us</h4>
        <a href="https://www.instagram.com">
          {" "}
          <i className="fa-brands fa-instagram"></i> Instagram
        </a>
        <a href="https://www.twitter.com">
          {" "}
          <i className="fa-brands fa-twitter"></i> Twitter
        </a>
        <a href="https://www.reddit.com">
          {" "}
          <i className="fa-brands fa-reddit-alien"></i> Reddit
        </a>
      </div>
    </footer>
  );
};

export default Footer;
