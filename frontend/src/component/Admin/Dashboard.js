import React, { useEffect } from "react";
import Sidebar from "./Sidebar.js";
import "./Dashboard.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from "../../actions/productActions";
import { getAllOrders } from "../../actions/orderAction.js";
import { getAllUsers } from "../../actions/userAction.js";
import MetaData from "../layout/Metadata";
import Loader from "../layout/Loader/Loader.js";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);

  const { products } = useSelector((state) => state.products);

  const { orders } = useSelector((state) => state.allOrders);

  const { users } = useSelector((state) => state.allUsers);

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.orderTotal;
    });
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="dashboard">
          <MetaData title="Dashboard - Admin Panel" />
          <Sidebar />

          <div className="dashboardContainer">
            <Typography component="h1">Dashboard</Typography>

            <div className="dashboardSummary">
              <div>
                <p>
                  Total Amount <br /> ₹{totalAmount}
                </p>
              </div>
              <div className="dashboardSummaryBox2 ">
                <div className="d-flex cardDiv">
                  <div className="col-sm-6">
                    <Link to="/admin/products">
                      <div className="card  adminProdCard adminCard">
                        <div className="adminCardBody">
                          <i className="fa-solid fa-box-open"></i>
                          <h1>Products</h1>
                          <h4>{products && products.length}</h4>
                        </div>
                        <h6>Out Of Stock: {outOfStock}</h6>
                      </div>
                    </Link>
                  </div>
                  <div className="col-sm-6">
                    <Link to="/admin/orders">
                      <div className="card adminCard adminOrdersCard">
                        <div className="adminCardBody">
                          <i className="fa-solid fa-boxes-stacked"></i>
                          <h1>Orders</h1>
                          <h4>{orders && orders.length}</h4>
                          <p></p>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className="col-sm-6">
                    <Link to="/admin/users">
                      <div className="card adminUsersCard adminCard">
                        <div className="adminCardBody">
                          <i className="fa-solid fa-users"></i>
                          <h1>Users</h1>
                          <h4>{users && users.length}</h4>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="doughnutChart">
         <Doughnut data={doughnutState} />
       </div> */}
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
