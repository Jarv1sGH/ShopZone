import React, { useEffect } from "react";
import Metadata from "../layout/Metadata";
import { useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import "./UserProfile.css";
import { useDispatch } from "react-redux";
import { logout } from "../../actions/userAction";

const UserProfile = () => {
  const { user, loading, isAuntheticated } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (isAuntheticated === false) {
      navigate("/Login");
    }
    // if (loading === false && user.role === "admin") {
    //   navigate("/admin");
    // };
  }, [isAuntheticated, navigate]);

  function logoutUser() {
    dispatch(logout());
    navigate("/");
    alert.success("Logout Successfully");
  }
  let Dashboard;
  if (loading === false && user.role === "admin") {
    Dashboard = (
      <Link className="Btn" to="/admin/dashboard">
        Dashboard
      </Link>
    );
  }
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Metadata title={`${user.name}'s Profile`} />
          <div className="container">
            <h2 id="userHeading"> Hello {user.name} </h2>
            <div className="card profileCard text-center">
              <div className="card-header">Account Details</div>
              <div className="card-body">
                <div className="details">
                  <h4 className="card-title"> Name </h4>
                  <p>{user.name}</p>
                  <h4>Email</h4> <p>{user.email}</p>
                </div>
                <div className="editContainer">
                  {Dashboard}
                  <Link className="Btn" to="/orders">
                    My Orders
                  </Link>
                  <Link className="Btn" to="/password/update">
                    Change Password
                  </Link>
                  <Link className="Btn " to="/me/update">
                    Edit Profile
                  </Link>
                  <Link className="Btn " to="/" onClick={logoutUser}>
                    Logout
                  </Link>
                </div>
              </div>
            </div>
            <div></div>
          </div>
        </>
      )}
    </>
  );
};

export default UserProfile;
