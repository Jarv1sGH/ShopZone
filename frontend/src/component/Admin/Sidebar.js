import React from "react";
import "./sidebar.css";
import { Link } from "react-router-dom";
import { TreeView, TreeItem } from "@material-ui/lab";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/">
        <h1 className="brand">
          <i className="fa-solid fa-shop"></i> SHOPZONE
        </h1>
      </Link>
      <Link to="/admin/dashboard">
        <p>
          <i className="fa-solid fa-table-columns"></i> Dashboard
        </p>
      </Link>
      <Link>
        <TreeView
          defaultCollapseIcon={<i className="fa-solid fa-chevron-down"></i>}
          defaultExpandIcon={<i className="fa-solid fa-box-open"></i>}
        >
          <TreeItem nodeId="1" label="Products">
            <Link to="/admin/products">
              <TreeItem
                nodeId="2"
                label="All"
                icon={<i className="fa-solid fa-file-pen"></i>}
              />
            </Link>

            <Link to="/admin/product">
              <TreeItem
                nodeId="3"
                label="Create"
                icon={<i className="fa-solid fa-plus"></i>}
              />
            </Link>
          </TreeItem>
        </TreeView>
      </Link>
      <Link to="/admin/orders">
        <p>
          <i className="fa-solid fa-boxes-stacked"></i>
          Orders
        </p>
      </Link>
      <Link to="/admin/users">
        <p>
          <i className="fa-solid fa-users"></i> Users
        </p>
      </Link>
      <Link to="/admin/reviews">
        <p>
          <i className="fa-solid fa-square-pen"></i>
          Reviews
        </p>
      </Link>
    </div>
  );
};

export default Sidebar;
