import React, { useState } from "react";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { db } from "./firebase"; // Import your Firestore instance
import { storage } from "./firebase";
import "./Addproduct.css";
import { v4 } from "uuid";
import Sidebar from "./sidebar/Sidebar";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";


const Addproduct = () => {
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [noItems, setNoItems] = useState("");
  const [moduleLink, setModuleLink] = useState("");
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");
  const [categoryID, setCategoryID] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = [
    { name: "Cap & Hat", categoryID: "c001" },
    { name: "Sunglass", categoryID: "c004" },
    { name: "Watch", categoryID: "c003" },
    { name: "Jewelry", categoryID: "c002" },
  ];

  

  const handleImageUpload = (e) => {
    const imageFile = e.target.files[0];
    setImage(imageFile);
  };

  const handleAddProduct = async () => {
    if (
      productId &&
      productName &&
      productDescription &&
      productPrice &&
      noItems &&
      moduleLink &&
      selectedCategory &&
      image
    ) {
      // Upload the image to Firebase Storage
      const imageRef = ref(storage, `Imgs/${v4()}`);
      await uploadBytes(imageRef, image);
      const imageUrl = await getDownloadURL(imageRef);


      const productData = {
        productId,
        productName,
        productDescription,
        productPrice: parseFloat(productPrice),
        noItems,
        moduleLink,
        categoryID: selectedCategory,
        productImageUrl: imageUrl,
      };

      const productRef = collection(db, "products");
      await addDoc(productRef, productData);

     // const categoryRef = collection(db, selectedCategory);
      //await addDoc(categoryRef, productData);

      alert("Product added successfully");

      // Clear the input fields and reset category selection
      setProductId("");
      setProductName("");
      setProductDescription("");
      setProductPrice("");
      setNoItems("");
      setModuleLink("");
      setCategory("");
      document.getElementById("imageInput").value = "";
      setImage(null);
      setSelectedCategory("");
      setCategoryID("");
    } else {
      alert("Please fill in all fields, select a category and select an image");
    }
  };

  return (
    <div className="add-product-container">
      <div className="sidebar-container">
        <Sidebar />
      </div>
      <div className="main-container">
        <div className="add-product-title-container">
          <h2 className="add-product-title">Add Product</h2>
        </div>
        <div className="form-container">
          <form>
            <label className="from-labels">
              Product ID:
              <input
                className="from-inputs"
                type="text"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </label>
            <br></br>
            <label className="from-labels">
              Category:
              <br />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.categoryID} value={category.categoryID}>
                    {category.name}
                  </option>
                ))}
              </select>
            </label>
            <br></br>
            <label className="from-labels">
              Product Name:
              <input
                className="from-inputs"
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </label>
            <br></br>
            <label className="from-labels">
              Product Descriptaion:
              <input
                className="from-inputs"
                type="text"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
              />
            </label>
            <br></br>
            <label className="from-labels">
              Product Price:
              <input
                className="from-inputs"
                type="number"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
              />
            </label>
            <br></br>
            <label className="from-labels">
              Number of Items:
              <input
                className="from-inputs"
                type="number"
                value={noItems}
                onChange={(e) => setNoItems(e.target.value)}
              />
            </label>
            <br></br>
            <label className="from-labels">
              Product Image:
              <input
                id="imageInput"
                className="from-inputs"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </label>
            <br></br>
            <label className="from-labels">
              3D Model Link:
              <input
                className="from-inputs"
                type="text"
                value={moduleLink}
                onChange={(e) => setModuleLink(e.target.value)}
              />
            </label>
            <br></br>
            <div className="form-btn">
              <button type="button" onClick={handleAddProduct}>
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Addproduct;
