import {
  CreditCardOutlined,
  DashboardSharp,
  ExitToApp,
  MenuOutlined,
  PersonOutline,
  StoreOutlined,
} from "@material-ui/icons";
import React, { useState } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";

function Sidebar() {

  return (
    <div className="sidebar">
      <div className="top">
        <span className="logo">FitTo Admin</span>
      </div>

      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link className="sidebar-link" to="/home">
            <li>
              <DashboardSharp className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <p className="title">LISTS</p>
          <Link className="sidebar-link" to="/customer">
            <li>
              <PersonOutline className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <Link className="sidebar-link" to="/productlist">
            <li>
              <StoreOutlined className="icon" />
              <span>Products</span>
            </li>
          </Link>
          <Link className="sidebar-link" to="/orderList">
            <li>
              <CreditCardOutlined className="icon" />
              <span>Orders</span>
            </li>
          </Link>

          <p className="title">USER</p>

         <Link className="sidebar-link" to="/"> <li>
            <ExitToApp className="icon" />
            <span>Logout</span>
          </li></Link>
        </ul>
      </div>
      
    </div>
  );
}

export default Sidebar;
