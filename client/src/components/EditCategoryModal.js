import React, { useState, useEffect } from 'react';
import './Modal.css';

const EditCategoryModal = ({ category, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    item_count: '',
    image: null
  });
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name || '',
        item_count: category.item_count || '',
        image: null
      });
      // Set preview to current image if exists
      if (category.image_url && !category.image_url.startsWith('/api/placeholder')) {
        const baseUrl = process.env.REACT_APP_API_URL || '';
        if (baseUrl) {
          setPreview(`${baseUrl}${category.image_url}`);
        } else {
          setPreview(category.image_url);
        }
      }
    }
  }, [category]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size must be less than 5MB');
        return;
      }
      setFormData(prev => ({
        ...prev,
        image: file
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim()) {
      setError('Category name is required');
      return;
    }

    const itemCount = parseInt(formData.item_count) || 0;
    onSave(category.id, {
      name: formData.name.trim(),
      item_count: itemCount,
      image: formData.image
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Edit Category</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        {error && <div className="modal-error">{error}</div>}

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="name">Category Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter category name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="item_count">Item Count</label>
            <input
              type="number"
              id="item_count"
              name="item_count"
              value={formData.item_count}
              onChange={handleChange}
              min="0"
              placeholder="Enter item count"
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">Category Image</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
            />
            {preview && (
              <div className="image-preview">
                <img src={preview} alt="Preview" />
              </div>
            )}
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-save">
              Update Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCategoryModal;

