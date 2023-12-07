// CategorySelector.js

import React, { useState } from 'react';

const CategorySelector = ({ onSelectCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategoryChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedCategory(selectedValue);
    onSelectCategory(selectedValue);
  };

  return (
    <select value={selectedCategory} onChange={handleCategoryChange}>
      <option value="">Select a category</option>
      <option value="caps">Caps</option>
      <option value="jewelry">Jewelry</option>
      <option value="sunglasses">Sunglasses</option>
      <option value="watches">Watches</option>
    </select>
  );
};

export default CategorySelector;

