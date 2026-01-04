import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import CategoryGrid from '../components/CategoryGrid';
import AddCategoryModal from '../components/AddCategoryModal';
import EditCategoryModal from '../components/EditCategoryModal';
import api from '../utils/api';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/categories');
      setCategories(response.data);
      setError('');
    } catch (error) {
      setError('Failed to load categories');
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = async (categoryData) => {
    try {
      const formData = new FormData();
      formData.append('name', categoryData.name);
      formData.append('item_count', categoryData.item_count);
      if (categoryData.image) {
        formData.append('image', categoryData.image);
      }

      const response = await api.post('/api/categories', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setCategories([response.data, ...categories]);
      setShowAddModal(false);
      setError('');
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to add category');
    }
  };

  const handleEditCategory = async (categoryId, categoryData) => {
    try {
      const formData = new FormData();
      formData.append('name', categoryData.name);
      formData.append('item_count', categoryData.item_count);
      if (categoryData.image) {
        formData.append('image', categoryData.image);
      }

      const response = await api.put(`/api/categories/${categoryId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setCategories(categories.map(cat => 
        cat.id === categoryId ? response.data : cat
      ));
      setEditingCategory(null);
      setError('');
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to update category');
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    if (!window.confirm('Are you sure you want to delete this category?')) {
      return;
    }

    try {
      await api.delete(`/api/categories/${categoryId}`);
      setCategories(categories.filter(cat => cat.id !== categoryId));
      setError('');
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to delete category');
    }
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-main">
        <Header user={user} onAddCategory={() => setShowAddModal(true)} />
        <div className="dashboard-content">
          <h1 className="dashboard-title">Categories</h1>
          
          {error && <div className="error-banner">{error}</div>}

          {loading ? (
            <div className="loading">Loading categories...</div>
          ) : (
            <CategoryGrid
              categories={categories}
              onEdit={(category) => setEditingCategory(category)}
              onDelete={handleDeleteCategory}
            />
          )}
        </div>
      </div>

      {showAddModal && (
        <AddCategoryModal
          onClose={() => setShowAddModal(false)}
          onSave={handleAddCategory}
        />
      )}

      {editingCategory && (
        <EditCategoryModal
          category={editingCategory}
          onClose={() => setEditingCategory(null)}
          onSave={handleEditCategory}
        />
      )}
    </div>
  );
};

export default Dashboard;

