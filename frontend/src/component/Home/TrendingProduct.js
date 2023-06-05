import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import ImageGallery from "react-image-gallery";
const TrendingProduct = (props) => {
  const navigate = useNavigate();
  const { homePageProducts } = props;
  let options1 = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "red",
    isHalf: true,
    size: window.innerWidth < 600 ? 20 : 20,
    value: homePageProducts?.electronics?.products[0]?.ratings,
  };
  let options2 = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "red",
    isHalf: true,
    size: window.innerWidth < 600 ? 20 : 20,
    value: homePageProducts?.smartphones?.products[3]?.ratings,
  };
  const images1 = homePageProducts?.electronics?.products?.[0]?.images
    .slice(0, 6)
    .map((item) => {
      return {
        original: item.url,
        thumbnail: item.url,
      };
    });
  const images2 = homePageProducts?.smartphones?.products?.[3]?.images
    .slice(0, 6)
    .map((item) => {
      return {
        original: item.url,
        thumbnail: item.url,
      };
    });

  const handleClick1 = () => {
    navigate(`/product/${homePageProducts?.electronics?.products[0]?._id}`);
    
  };
  const handleClick2 = () => {
    navigate(`/product/${homePageProducts?.smartphones?.products[3]?._id}`);
  };

  const renderItem1 = (item) => {
    return <img src={item.original} onClick={handleClick1} alt="" />;
  };
  const renderItem2 = (item) => {
    return <img src={item.original} onClick={handleClick2} alt=""/>;
  };
  return (
    <div className="trendingItemOuter">
      <div id="trendingHeader">
        <h2 className="productHeading">Trending Products</h2>
      </div>
      <div className="trendingItem">
        {/* 1st product */}

        {homePageProducts?.electronics?.products !== undefined && (
          <div className="trendingItemInner">
            <div>
              <div className="trendingItemImg">
                {/* <Link
                  to={`/product/${homePageProducts?.electronics?.products[0]?._id}`}
                > */}
                <ImageGallery
                  items={images1}
                  showPlayButton={false}
                  showFullscreenButton={false}
                  autoPlay={true}
                  showNav={false}
                  renderItem={renderItem1}
                />
                {/* </Link> */}
              </div>
            </div>

            <div className="trendingItemDetails">
              <Link
                to={`/product/${homePageProducts?.electronics?.products[0]?._id}`}
              >
                <p>{homePageProducts?.electronics?.products?.[0]?.name}</p>
              </Link>
              <p>
                {" "}
                {homePageProducts?.electronics?.products?.[0]?.description.slice(
                  0,
                  130
                )}
                ...
              </p>
              <span className="trendingItemPrice">{`₹ ${homePageProducts?.electronics?.products?.[0]?.price}`}</span>
            </div>
            <div className="ratings">
              <ReactStars {...options1} />
            </div>
          </div>
        )}

        {/* Second product */}

        {homePageProducts?.smartphones?.products !== undefined && (
          <div className="trendingItemInner">
            <div>
              <div className="trendingItemImg">
                {/* <Link
                  to={`/product/${homePageProducts?.smartphones?.products[3]?._id}`}
                > */}
                <ImageGallery
                  items={images2}
                  showPlayButton={false}
                  showFullscreenButton={false}
                  autoPlay={true}
                  showNav={false}
                  renderItem={renderItem2}
                />
                {/* </Link> */}
              </div>
            </div>
            <div className="trendingItemDetails">
              <Link
                to={`/product/${homePageProducts?.smartphones?.products[3]?._id}`}
              >
                <p>{homePageProducts?.smartphones?.products?.[3]?.name}</p>
              </Link>
              <p>
                {" "}
                {homePageProducts?.smartphones?.products?.[3]?.description.slice(
                  0,
                  142
                )}
                ...
              </p>
              <span className="trendingItemPrice">{`₹ ${homePageProducts?.smartphones?.products?.[3]?.price}`}</span>
            </div>
            <div className="ratings">
              <ReactStars {...options2} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrendingProduct;
