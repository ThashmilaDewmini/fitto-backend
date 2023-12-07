import React, { useState, useEffect } from "react";
import { db } from "./firebase"; // Import your Firestore instance
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  getDoc,
  or,
  orderBy,
} from "firebase/firestore";
import Sidebar from "./sidebar/Sidebar";
import "./ProductList.css";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(""); // State for selected category
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [editedProduct, setEditedProduct] = useState();
  const [newValue, setNewValue] = useState("");
  const [fieldName, setFieldName] = useState("");
  const [productID, setProductId] = useState("");
  const [updatedProductValue, setUpdatedProductValue] = useState("");

  const fetchProducts = async (category = "") => {
    try {
      console.log("Updating product with ID:", category);
      const productsRef = collection(db, "products");

      if (category) {
        const q = query(productsRef, where("categoryID", "==", category));
        const querySnapshot = await getDocs(q);
        console.log("Query Snapshot:", querySnapshot);

        const productData = [];
        querySnapshot.forEach((doc) => {
          productData.push({ id: doc.id, ...doc.data() });
        });
        console.log("Prodcut data: ", productData);
        setProducts(productData);
      } else {
        const querySnapshot = await getDocs(productsRef);
        const productData = [];
        querySnapshot.forEach((doc) => {
          productData.push({ id: doc.id, ...doc.data() });
        });
        setProducts(productData);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchProducts(selectedCategory);
  }, [selectedCategory]);

  //Funcation to delete a product
  const deleteProduct = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const productDocRef = doc(db, "products", productId);
        await deleteDoc(productDocRef);
        //Refreach the product list after deletion
        fetchProducts(selectedCategory);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleUpdate = async () => {
    try {
      //console.log('Updating product with ID:');
      const productRef = collection(db, "products");
      if (productID) {
        const q = query(productRef, where("productId", "==", productID));
        const querySnapshot = await getDocs(q);
        console.log("Query Snapshot:", querySnapshot);

        if (querySnapshot.empty) {
          console.log("No matching documents found.");
          return;
        }

        // Assuming there's only one matching document (product) for the productID
        const productDoc = querySnapshot.docs[0];
        console.log("Found matching document:", productDoc.data());
        // Update the productName field
        if (fieldName === "1") {
          console.log("field name:", fieldName);
          await updateDoc(productDoc.ref, { productId: updatedProductValue });
        } else if (fieldName === "2") {
          console.log("field name:", fieldName);
          await updateDoc(productDoc.ref, { productName: updatedProductValue });
        } else if (fieldName === "3") {
          console.log("field name:", fieldName);
          await updateDoc(productDoc.ref, {
            productDescription: updatedProductValue,
          });
        } else if (fieldName === "4") {
          console.log("field name:", fieldName);
          await updateDoc(productDoc.ref, { moduleLink: updatedProductValue });
        } else if (fieldName === "5") {
          console.log("field name:", fieldName);
          await updateDoc(productDoc.ref, {
            noItems: parseFloat(updatedProductValue),
          });
        } else if (fieldName === "6") {
          console.log("field name:", fieldName);
          await updateDoc(productDoc.ref, {
            productPrice: parseFloat(updatedProductValue),
          });
        } else if (fieldName === "7") {
          console.log("field name:", fieldName);
          await updateDoc(productDoc.ref, { categoryID: updatedProductValue });
        }
        alert("Updated Successfully");
        console.log("update name", updatedProductValue);
        console.log("Product name updated successfully");
        setProductId("")
        setFieldName("")
        setUpdatedProductValue("")
      }
    } catch (error) {
      console.error("Error updating product name:", error);
    }
  };
  return (
    <div className="product-list">
      <div className="product-list-left">
        <Sidebar />
      </div>
      <div className="product-list-right">
        <div className="product-list-title-container">
          <h2>Product List</h2>
        </div>
        <div className="product-list-body">
          <div className="category-filter">
            <label>
              Filter by Category:
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All</option>
                <option value="c001">Cap & Hat</option>
                <option value="c002">Jewelry</option>
                <option value="c003">Watch</option>
                <option value="c004">Sunglass</option>
              </select>
            </label>
          </div>
          <div className="product-list-table">
            <table>
              <thead>
                <tr>
                  <th className="table-head">Product ID</th>
                  <th className="table-head">Product Name</th>
                  <th className="table-head">Category ID</th>
                  <th className="table-head">Product Description</th>
                  <th className="table-head">Product Price</th>
                  <th className="table-head">Quantity</th>
                  <th className="table-head">3D Model Link</th>
                  <th className="table-head">Product Image</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td className="table-data">{product.productId}</td>
                    <td className="table-data">{product.productName}</td>
                    <td className="table-data">{product.categoryID}</td>
                    <td className="table-data">{product.productDescription}</td>
                    <td className="table-data">{product.productPrice}</td>
                    <td className="table-data">{product.noItems}</td>
                    <td className="table-data">{product.moduleLink}</td>
                    <td>
                      <img
                        src={product.productImageUrl}
                        alt={product.productName}
                        style={{ width: "100px" }}
                      />
                    </td>
                    <td>
                      <button onClick={() => deleteProduct(product.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="update-product-container">
            <div className="update-title">
              <h2>Update Product</h2>
            </div>
            <div className="update-form">
              <label>
                Product ID:
                <br />
                <input
                  type="text"
                  value={productID}
                  onChange={(e) => setProductId(e.target.value)}
                />
              </label>
              <br />
              <label>
                Select Filed:
                <br />
                <select
                  value={fieldName}
                  onChange={(e) => setFieldName(e.target.value)}
                >
                  <option value="">select</option>
                  <option value="1">productID</option>
                  <option value="2">productName</option>
                  <option value="3">productDescription</option>
                  <option value="4">moduleLink</option>
                  <option value="5">Quantity</option>
                  <option value="6">price</option>
                  <option value="7">CategoryID</option>
                </select>
              </label>
              <br />
              <label>
                New Value:
                <br />
                <input
                  type="text"
                  value={updatedProductValue}
                  onChange={(e) => setUpdatedProductValue(e.target.value)}
                />
              </label>
              <br />
              <div className="update-product-button">
                <button onClick={handleUpdate}>Update</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
