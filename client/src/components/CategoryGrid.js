import React from 'react';
import CategoryCard from './CategoryCard';
import './CategoryGrid.css';

const CategoryGrid = ({ categories, onEdit, onDelete }) => {
  return (
    <div className="category-grid">
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
          onEdit={() => onEdit(category)}
          onDelete={() => onDelete(category.id)}
        />
      ))}
    </div>
  );
};

export default CategoryGrid;


