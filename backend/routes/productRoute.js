const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  reviewProduct,
  getAllProductReviews,
  deleteReview,
  getAdminProducts,
} = require("../controllers/productController");
const { isAuthenticatedUser, authRole } = require("../middleware/authCheck");

const router = express.Router();

//Product Routes
router.route("/products").get(getAllProducts);

router
  .route("/admin/products")
  .get(isAuthenticatedUser, authRole("admin"), getAdminProducts);

router
  .route("/admin/product/new")
  .post(isAuthenticatedUser, authRole("admin"), createProduct);

router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, authRole("admin"), updateProduct);

router
  .route("/admin/product/:id")
  .delete(isAuthenticatedUser, authRole("admin"), deleteProduct);

router.route("/product/:id").get(getProductDetails);

router.route("/review").put(isAuthenticatedUser, reviewProduct);

router.route("/reviews").get(getAllProductReviews);

router.route("/reviews").delete(isAuthenticatedUser, deleteReview);

module.exports = router;
