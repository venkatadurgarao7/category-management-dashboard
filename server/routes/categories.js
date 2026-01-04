const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { getDb } = require('../database/db');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadsDir = path.join(__dirname, '..', 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'category-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// Get all categories
router.get('/', authenticateToken, (req, res) => {
  try {
    const db = getDb();
    db.all('SELECT * FROM categories ORDER BY created_at DESC', [], (err, categories) => {
      if (err) {
        return res.status(500).json({ error: 'Error fetching categories' });
      }
      res.json(categories);
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single category
router.get('/:id', authenticateToken, (req, res) => {
  try {
    const db = getDb();
    const { id } = req.params;
    db.get('SELECT * FROM categories WHERE id = ?', [id], (err, category) => {
      if (err) {
        return res.status(500).json({ error: 'Error fetching category' });
      }
      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }
      res.json(category);
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Create category
router.post('/', authenticateToken, upload.single('image'), (req, res) => {
  try {
    const { name, item_count } = req.body;

    // Validation
    if (!name) {
      return res.status(400).json({ error: 'Category name is required' });
    }

    const itemCount = parseInt(item_count) || 0;
    let imageUrl = null;

    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    }

    const db = getDb();
    db.run(
      'INSERT INTO categories (name, item_count, image_url) VALUES (?, ?, ?)',
      [name, itemCount, imageUrl],
      function (err) {
        if (err) {
          return res.status(500).json({ error: 'Error creating category' });
        }

        db.get('SELECT * FROM categories WHERE id = ?', [this.lastID], (err, category) => {
          if (err) {
            return res.status(500).json({ error: 'Error fetching created category' });
          }
          res.status(201).json(category);
        });
      }
    );
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update category
router.put('/:id', authenticateToken, upload.single('image'), (req, res) => {
  try {
    const { id } = req.params;
    const { name, item_count } = req.body;

    // Validation
    if (!name) {
      return res.status(400).json({ error: 'Category name is required' });
    }

    const itemCount = parseInt(item_count) || 0;
    const db = getDb();

    // First, get the existing category
    db.get('SELECT * FROM categories WHERE id = ?', [id], (err, category) => {
      if (err) {
        return res.status(500).json({ error: 'Error fetching category' });
      }
      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }

      let imageUrl = category.image_url;

      // If new image is uploaded, delete old image and use new one
      if (req.file) {
        // Delete old image if it exists and is not a placeholder
        if (category.image_url && !category.image_url.startsWith('/api/placeholder')) {
          const oldImagePath = path.join(__dirname, '..', category.image_url);
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }
        }
        imageUrl = `/uploads/${req.file.filename}`;
      }

      // Update category
      db.run(
        'UPDATE categories SET name = ?, item_count = ?, image_url = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        [name, itemCount, imageUrl, id],
        function (err) {
          if (err) {
            return res.status(500).json({ error: 'Error updating category' });
          }

          db.get('SELECT * FROM categories WHERE id = ?', [id], (err, updatedCategory) => {
            if (err) {
              return res.status(500).json({ error: 'Error fetching updated category' });
            }
            res.json(updatedCategory);
          });
        }
      );
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete category
router.delete('/:id', authenticateToken, (req, res) => {
  try {
    const { id } = req.params;
    const db = getDb();

    // Get category to delete its image
    db.get('SELECT * FROM categories WHERE id = ?', [id], (err, category) => {
      if (err) {
        return res.status(500).json({ error: 'Error fetching category' });
      }
      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }

      // Delete image file if it exists and is not a placeholder
      if (category.image_url && !category.image_url.startsWith('/api/placeholder')) {
        const imagePath = path.join(__dirname, '..', category.image_url);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }

      // Delete category
      db.run('DELETE FROM categories WHERE id = ?', [id], (err) => {
        if (err) {
          return res.status(500).json({ error: 'Error deleting category' });
        }
        res.json({ message: 'Category deleted successfully' });
      });
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

