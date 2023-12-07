import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, doc, getDocs, query } from "firebase/firestore";
import Sidebar from "./sidebar/Sidebar";
import './Viewproduct.css';

function ViewProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      let list = [];
      try {
        // Fetch the products collection from Firebase Firestore
        const querySnapshot = await getDocs(collection(db, "products"));
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setProducts(list);
        console.log(list);
      } catch (err) {
        alert("Error occur when the Fetching data from databse");
        console.log(err);
      }
    };

    fetchProducts();
  }, []);

  console.log(products);

  return (
    <div className="view-product-container">
      <div className="view-product-left">
        <Sidebar/>
      </div>
      <div className="view-producr-right">
        <div className="view-product-title">
          <h2>Product List</h2>
        </div> 
        <div className="view-product-body">
          <table className="view-product-table">
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Product Name</th>
                <th>Product Description</th>
                <th>Product Price</th>
                <th>Number of Items</th>
                <th>Product Image</th>
                <th>3D Model Link</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.productId}</td>
                  <td>{product.productName}</td>
                  <td>{product.productDescription}</td>
                  <td>{product.productPrice}</td>
                  <td>{product.noItems}</td>
                  <td>{product.moduleLink}</td>
                  <td>
                    <img
                      src={product.productImageUrl}
                      alt={product.productName}
                      style={{ width: "100px" }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ViewProducts;
