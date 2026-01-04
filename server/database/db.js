const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, 'database.sqlite');
const uploadsDir = path.join(__dirname, '..', 'uploads');

// Ensure uploads directory exists
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

let db;

const initDatabase = () => {
  return new Promise((resolve, reject) => {
    db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error('Error opening database:', err.message);
        reject(err);
        return;
      }
      console.log('Connected to SQLite database');

      // Create users table
      db.run(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          email TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `, (err) => {
        if (err) {
          console.error('Error creating users table:', err.message);
          reject(err);
          return;
        }
      });

      // Create categories table
      db.run(`
        CREATE TABLE IF NOT EXISTS categories (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          item_count INTEGER NOT NULL DEFAULT 0,
          image_url TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `, (err) => {
        if (err) {
          console.error('Error creating categories table:', err.message);
          reject(err);
          return;
        }

        // Insert sample categories if table is empty
        db.get('SELECT COUNT(*) as count FROM categories', (err, row) => {
          if (err) {
            console.error('Error checking categories:', err.message);
            reject(err);
            return;
          }

          if (row.count === 0) {
            const sampleCategories = [
              { name: 'Men Clothes', item_count: 24, image_url: '/api/placeholder/men-clothes.jpg' },
              { name: 'Women Clothes', item_count: 12, image_url: '/api/placeholder/women-clothes.jpg' },
              { name: 'Accessories', item_count: 43, image_url: '/api/placeholder/accessories.jpg' },
              { name: 'Cotton Clothes', item_count: 31, image_url: '/api/placeholder/cotton-clothes.jpg' },
              { name: 'Summer Clothes', item_count: 26, image_url: '/api/placeholder/summer-clothes.jpg' },
              { name: 'Wedding Clothes', item_count: 52, image_url: '/api/placeholder/wedding-clothes.jpg' },
              { name: 'Spring Collection', item_count: 24, image_url: '/api/placeholder/spring-collection.jpg' },
              { name: 'Casual Clothes', item_count: 52, image_url: '/api/placeholder/casual-clothes.jpg' },
              { name: 'Hats', item_count: 26, image_url: '/api/placeholder/hats.jpg' }
            ];

            const stmt = db.prepare(`
              INSERT INTO categories (name, item_count, image_url)
              VALUES (?, ?, ?)
            `);

            sampleCategories.forEach(category => {
              stmt.run(category.name, category.item_count, category.image_url);
            });

            stmt.finalize((err) => {
              if (err) {
                console.error('Error inserting sample categories:', err.message);
                reject(err);
                return;
              }
              console.log('Sample categories inserted');
              resolve();
            });
          } else {
            resolve();
          }
        });
      });
    });
  });
};

const getDb = () => {
  if (!db) {
    throw new Error('Database not initialized');
  }
  return db;
};

module.exports = { initDatabase, getDb };

