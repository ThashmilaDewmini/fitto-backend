import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase';

const Category = () => {
  const [categoryId, setCategoryId] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [categories, setCategories] = useState([]); // To display existing categories

  const addCategory = async () => {
    if (categoryId && categoryName) {
      const categoryData = {
        categoryId,
        categoryName,
      };

      const categoriesRef = collection(db, 'category');
      await addDoc(categoriesRef, categoryData);

      alert('Category added successfully');

      // Clear input fields
      setCategoryId('');
      setCategoryName('');
    } else {
      alert('Please fill in both category ID and name');
    }
  };

  return (
    <div>
      <h2>Add Category</h2>
      <form>
        <label>
          Category ID:
          <input
            type="text"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          />
        </label>
        <br />
        <label>
          Category Name:
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </label>
        <br />
        <button type="button" onClick={addCategory}>
          Add Category
        </button>
      </form>

      <h2>Existing Categories</h2>
      <ul>
        {categories.map((category, index) => (
          <li key={index}>{category.categoryName}</li>
        ))}
      </ul>
    </div>
  );
};

export default Category;
