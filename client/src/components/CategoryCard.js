import React, { useState } from 'react';
import './CategoryCard.css';

const CategoryCard = ({ category, onEdit, onDelete }) => {
  const [imageError, setImageError] = useState(false);

  const getImageUrl = () => {
    if (imageError) {
      return 'https://via.placeholder.com/300x200?text=No+Image';
    }
    if (category.image_url) {
      if (category.image_url.startsWith('/api/placeholder')) {
        // Use placeholder images for sample data
        return `https://via.placeholder.com/300x200?text=${encodeURIComponent(category.name)}`;
      }
      // For uploaded images
      // In development, use proxy (empty string means same origin)
      // In production, use REACT_APP_API_URL if set
      const baseUrl = process.env.REACT_APP_API_URL || '';
      if (baseUrl) {
        return `${baseUrl}${category.image_url}`;
      }
      // In development with proxy, just use the path
      return category.image_url;
    }
    return `https://via.placeholder.com/300x200?text=${encodeURIComponent(category.name)}`;
  };

  return (
    <div className="category-card">
      <div className="category-image-container">
        <img
          src={getImageUrl()}
          alt={category.name}
          className="category-image"
          onError={() => setImageError(true)}
        />
        <div className="category-overlay">
          <button className="edit-btn" onClick={onEdit} title="Edit Category">
            ✏️
          </button>
          <button className="delete-btn" onClick={onDelete} title="Delete Category">
            🗑️
          </button>
        </div>
      </div>
      <div className="category-info">
        <h3 className="category-name">{category.name}</h3>
        <p className="category-count">{category.item_count} items</p>
      </div>
    </div>
  );
};

export default CategoryCard;

