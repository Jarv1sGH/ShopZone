const express = require("express");
const {
  newOrder,
  getOrderDetails,
  myOrders,
  allOrders,
  updateOrderStatus,
  deleteOrder,
} = require("../controllers/orderController");
const router = express.Router();
const { isAuthenticatedUser, authRole } = require("../middleware/authCheck");

router.route("/order/new").post(isAuthenticatedUser, newOrder);

router.route("/order/:id").get(isAuthenticatedUser, getOrderDetails);

router.route("/orders/me").get(isAuthenticatedUser, myOrders);

router
  .route("/admin/orders")
  .get(isAuthenticatedUser, authRole("admin"), allOrders);

router
  .route("/admin/order/:id")
  .put(isAuthenticatedUser, authRole("admin"), updateOrderStatus);

router
  .route("/admin/order/:id")
  .delete(isAuthenticatedUser, authRole("admin"), deleteOrder);

module.exports = router;
