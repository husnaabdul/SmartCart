import sqlite3
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def get_db_connection():
    connection = sqlite3.connect("smartcart.db")
    connection.row_factory = sqlite3.Row
    return connection

@app.route("/")
def home():
    return jsonify({
        "message": "Welcome to the SmartCart API!"
    })

@app.route("/api/products")
def get_products():
    connection = get_db_connection()

    products = connection.execute(
        "SELECT * FROM products"
    ).fetchall()

    connection.close()

    return jsonify([dict(product) for product in products])
@app.route("/api/price-history/<int:product_id>")
def get_price_history(product_id):
    connection = get_db_connection()

    history = connection.execute(
        """
        SELECT price, recorded_date
        FROM price_history
        WHERE product_id = ?
        ORDER BY recorded_date
        """,
        (product_id,)
    ).fetchall()

    connection.close()

    return jsonify([dict(item) for item in history])
if __name__ == "__main__":
    app.run(debug=True, port=5000)