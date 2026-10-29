
import sqlite3

connection = sqlite3.connect("backend/smartcart.db")
cursor = connection.cursor()

# Create the products table
cursor.execute("""
CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    price REAL NOT NULL,
    oldPrice REAL NOT NULL,
    rating REAL NOT NULL,
    emoji TEXT,
    color TEXT,
    store TEXT NOT NULL
)
""")

# Add sample products
products = [
    (1, "Sony WH-1000XM5", "Electronics", 24990, 29990, 4.8, "🎧", "#e9e8ff", "TechStore"),
    (2, "Apple Watch SE", "Electronics", 24900, 28900, 4.7, "⌚", "#e4f3eb", "GadgetHub"),
    (3, "Nike Air Max", "Fashion", 7995, 9995, 4.6, "👟", "#fff0e5", "StyleZone"),
    (4, "Canon EOS R50", "Electronics", 58990, 64990, 4.9, "📷", "#e4edf9", "CameraWorld"),
    (5, "Minimalist Backpack", "Fashion", 1499, 1999, 4.5, "🎒", "#f8e9ed", "StyleZone"),
    (6, "Smart Coffee Maker", "Home", 3499, 4499, 4.4, "☕", "#f5eddc", "HomeNest"),
    (7, "Mechanical Keyboard", "Electronics", 4299, 5499, 4.7, "⌨️", "#e8e8ee", "TechStore"),
    (8, "Skincare Essentials", "Beauty", 1299, 1699, 4.6, "🧴", "#f8e7df", "GlowStore")
]

cursor.executemany("""
INSERT OR REPLACE INTO products
(id, name, category, price, oldPrice, rating, emoji, color, store)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
""", products)

# Create the price history table
cursor.execute("""
CREATE TABLE IF NOT EXISTS price_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL,
    price REAL NOT NULL,
    recorded_date TEXT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(id)
)
""")

# Add sample price history
price_history = [
    (1, 27990, "2026-10-01"),
    (1, 26990, "2026-10-10"),
    (1, 25990, "2026-10-20"),
    (1, 24990, "2026-10-29"),
    (2, 27900, "2026-10-01"),
    (2, 26900, "2026-10-10"),
    (2, 25900, "2026-10-20"),
    (2, 24900, "2026-10-29"),
    (3, 8995, "2026-10-01"),
    (3, 8495, "2026-10-10"),
    (3, 8295, "2026-10-20"),
    (3, 7995, "2026-10-29")
]

cursor.executemany("""
INSERT INTO price_history (product_id, price, recorded_date)
VALUES (?, ?, ?)
""", price_history)

connection.commit()
connection.close()

print("SmartCart database and price history created successfully!")
