import React, { useEffect, useState } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productActions";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import { useParams } from "react-router";
import Pagination from "react-js-pagination";
import { useAlert } from "react-alert";
import Metadata from "../layout/Metadata";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import NoProduct from "../layout/Not Found/NoProduct";

const categories = [
  "Electronics",
  "Smartphones",
  "Laptops",
  "Toys",
  "Books",
  "Home & Kitchen",
  "Computer Parts & Accessories",
];

const Products = () => {
  const dispatch = useDispatch(); // To dispatch actions from redux store

  const alert = useAlert();

  const { keyword } = useParams();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 250000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);

  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products); //get the state from redux store
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    window.scrollTo(0, 0); // added so that it scrolls to the top
    dispatch(getProduct(keyword, currentPage, price, category, ratings));
  }, [dispatch, keyword, currentPage, price, alert, error, category, ratings]);
  let count = filteredProductsCount;

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Metadata title={"ShopZone - Products"} />

          <div className="productsPageContainer">
            <div className="filterBox">
              <Typography>Categories</Typography>
              <ul className="categoryBox">
                {categories.map((category) => (
                  <li
                    className="category-link"
                    key={category}
                    onClick={() => setCategory(category)}
                  >
                    {category}
                  </li>
                ))}
              </ul>

              <div className="sliders">
                <fieldset>
                  <Typography>Ratings Above</Typography>

                  <Slider
                    value={ratings}
                    onChange={(e, newRating) => {
                      setRatings(newRating);
                    }}
                    marks={true}
                    valueLabelDisplay="auto"
                    aria-labelledby="continous-slider"
                    color="secondary"
                    min={0}
                    max={5}
                  />
                </fieldset>

                <Typography>Price</Typography>
                <Slider
                  value={price}
                  onChange={priceHandler}
                  valueLabelDisplay="auto"
                  aria-labelledby="range-slider"
                  color="secondary"
                  min={0}
                  max={250000}
                />
              </div>
            </div>

            <div className="productsContainer">
              <div className="productsHeading">
                <h2>All Products</h2>
              </div>
              {filteredProductsCount === 0 ? (
                <NoProduct />
              ) : (
                <div className="products">
                  {products &&
                    products.map((product) => (
                      <ProductCard key={product._id} product={product} />
                    ))}
                </div>
              )}
              {resultPerPage < count && (
                <div className="paginationBox">
                  <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={resultPerPage}
                    totalItemsCount={productsCount}
                    onChange={setCurrentPageNo}
                    nextPageText=">"
                    prevPageText="<"
                    firstPageText="First"
                    lastPageText="Last"
                    itemClass="page-item"
                    linkClass="page-link"
                    activeClass="pageItemActive"
                    activeLinkClass="pageLinkActive"
                  />
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Products;
