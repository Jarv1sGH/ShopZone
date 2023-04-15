import React, { useEffect, useState } from "react";
import "./Home.css";
import ProductCard from "./ProductCard.js";
import Metadata from "../layout/Metadata";
import { clearErrors, getProduct } from "../../actions/productActions";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import TrendingProduct from "./TrendingProduct";
import banner from "./../../images/banner.png";

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);
  const [homePageProducts, setHomePageProducts] = useState({});

  const fetchHomePageProducts = async (category) => {
    const link = `/api/v1/products?&page= ${1}&category=${category}`;
    const response = await fetch(link);
    const data = await response.json();
    return data;
  };

  const fetchAllHomePageProducts = async () => {
    try {
      const smartphoneProducts = await fetchHomePageProducts("Smartphones");
      const electronicProducts = await fetchHomePageProducts("Electronics");
      return {
        smartphones: smartphoneProducts,
        electronics: electronicProducts,
      };
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  useEffect(() => {
    fetchAllHomePageProducts().then((homePageProducts) =>
      setHomePageProducts(homePageProducts)
    );
  });
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Metadata title={"ShopZone - Home"} />
          <div className=" homeContainer">
            <div>
              <div className="banner">
                <img src={banner} alt="banner" />
              </div>
              <div className="featuredProducts">
                <h3 className="productHeading">Featured Products</h3>
                <div className="products">
                  {products &&
                    products
                      .slice(0, 6)
                      .map((product) => (
                        <ProductCard key={product._id} product={product} />
                      ))}
                </div>
              </div>
            </div>

            <TrendingProduct homePageProducts={homePageProducts} />

            <div>
              <div className="featuredProducts">
                <h3 className="productHeading">Top Selling Smartphones</h3>
                <div className="products">
                  {homePageProducts?.smartphones?.products &&
                    homePageProducts?.smartphones?.products
                      .slice(0, 6)
                      .map((product) => (
                        <ProductCard key={product._id} product={product} />
                      ))}
                </div>
              </div>
            </div>

            <div>
              <div className="featuredProducts">
                <h3 className="productHeading">Electronics Store</h3>
                <div className="products">
                  {homePageProducts?.electronics?.products &&
                    homePageProducts?.electronics?.products
                      .slice(0, 6)
                      .map((product) => (
                        <ProductCard key={product._id} product={product} />
                      ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
