import React from "react";
import Sidebar from "../sidebar/Sidebar";
import './Home.css'
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">
      <div className="home-left-side">
          <Sidebar />
        </div>
      <div className="home-right-side">
        <div className="right-top">
        <h2>Admin Dashboard</h2>
        </div>
        <div className="right-center">
          <div className="button-container">
            <Link to='/addproduct'><button className="btn-box"><span className="text">ADD NEW PRODUCT</span></button></Link>
            <Link to='/orderList'><button className="btn-box"><span className="text">ORDERS</span></button></Link>
            <Link to='/customer'><button className="btn-box"><span className="text">USERS</span></button></Link>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Home;
