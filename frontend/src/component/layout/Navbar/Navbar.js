import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Navbar.css";
const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const [isActive, setActive] = useState(false);

  const toggleClass = () => {
    setActive(!isActive);
  };

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
  };

  var dashboard;
  if (isAuthenticated && user?.role === "admin") {
    dashboard = (
      <li className="menu-item">
        <Link className="menu-link" to="/admin/dashboard" >
          Dashboard
        </Link>
      </li>
    );
  }

  var loginButton;
  var ordersButton;
  if (isAuthenticated) {
    loginButton = "Account";
    ordersButton = (
      <li className="menu-item">
        <Link className="menu-link" to="/orders">
          Orders
        </Link>
      </li>
    );
  } else {
    loginButton = "Sign-In";
  }
  return (
    <>
      <header className="header" id="header">
        <nav className="navbar container">
          <Link to="/" className="brand">
            <i className="fa-solid fa-shop"></i> ShopZone
          </Link>
          <div className="search">
            <form
              role="search"
              onSubmit={searchSubmitHandler}
              className="search-form"
            >
              <input
                className="search-input"
                type="text"
                placeholder="Search"
                onChange={(e) => setKeyword(e.target.value)}
              />
              <a  href="/search">
                <button type="submit" className="search-submit">
                  <i className="fa-solid fa-magnifying-glass bx bx-search"></i>
                </button>
              </a>
            </form>
          </div>
          {/* <div className="menu " id="menu"> */}
          <div  className={isActive ? "menu is-active" : "menu"} id="menu" onClick={toggleClass}>
            <ul className="menu-inner">
              <li className="menu-item">
                <Link to="/" className="menu-link">
                  Home
                </Link>
              </li>
              {dashboard}
              <li className="menu-item">
                <Link to="/products" className="menu-link">
                  Products
                </Link>
              </li>
              <li className="menu-item">
                <Link to="/cart" className="menu-link">
                  Cart(
                  {cartItems.length})
                </Link>
              </li>
              {ordersButton}
              <li className="menu-item">
                <Link to="/Login" className="menu-link">
                  {loginButton}
                </Link>
              </li>
            </ul>
          </div>
          <div className={ isActive ? "burger is-active" :"burger"} id="burger" onClick={toggleClass}>
            <span className="burger-line"></span>
            <span className="burger-line"></span>
            <span className="burger-line"></span>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
