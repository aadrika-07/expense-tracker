from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
from werkzeug.security import (
    generate_password_hash,
    check_password_hash
)

app = Flask(__name__)
CORS(app)

# DATABASE CONNECTION
def get_db_connection():
    conn = sqlite3.connect("database.db")
    conn.row_factory = sqlite3.Row
    return conn

# CREATE TABLE
def create_table():
    conn = get_db_connection()

    conn.execute("""
        CREATE TABLE IF NOT EXISTS expenses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            amount REAL NOT NULL,
            category TEXT NOT NULL,
            date TEXT NOT NULL
        )
    """)

    conn.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )
    """)

    conn.commit()
    conn.close()

create_table()

# HOME ROUTE
@app.route("/")
def home():
    return {
        "message": "Expense Tracker Backend Running"
    }

# GET ALL EXPENSES
@app.route("/expenses", methods=["GET"])
def get_expenses():

    conn = get_db_connection()

    expenses = conn.execute(
        "SELECT * FROM expenses"
    ).fetchall()

    conn.close()

    return jsonify([
        dict(expense)
        for expense in expenses
    ])

# ADD EXPENSE
@app.route("/expenses", methods=["POST"])
def add_expense():

    data = request.json

    title = data["title"]
    amount = data["amount"]
    category = data["category"]
    date = data["date"]

    conn = get_db_connection()

    conn.execute(
        """
        INSERT INTO expenses
        (title, amount, category, date)
        VALUES (?, ?, ?, ?)
        """,
        (title, amount, category, date)
    )

    conn.commit()
    conn.close()

    return {
        "message": "Expense Added Successfully"
    }

# DELETE EXPENSE
@app.route("/expenses/<int:id>", methods=["DELETE"])
def delete_expense(id):

    conn = get_db_connection()

    conn.execute(
        "DELETE FROM expenses WHERE id = ?",
        (id,)
    )

    conn.commit()
    conn.close()

    return jsonify({
        "message": "Expense deleted successfully"
    })


# UPDATE EXPENSE
@app.route("/expenses/<int:id>", methods=["PUT"])
def update_expense(id):

    data = request.json

    conn = get_db_connection()

    conn.execute(
        """
        UPDATE expenses
        SET title = ?,
            amount = ?,
            category = ?,
            date = ?
        WHERE id = ?
        """,
        (
            data["title"],
            data["amount"],
            data["category"],
            data["date"],
            id
        )
    )

    conn.commit()
    conn.close()

    return jsonify({
        "message": "Expense updated successfully"
    })

@app.route("/register", methods=["POST"])
def register():

    data = request.json

    username = data["username"]
    email = data["email"]
    password = data["password"]

    hashed_password = generate_password_hash(
        password
    )

    conn = get_db_connection()

    try:

        conn.execute(
            """
            INSERT INTO users
            (username, email, password)
            VALUES (?, ?, ?)
            """,
            (
                username,
                email,
                hashed_password
            )
        )

        conn.commit()

        return jsonify(
            {
                "message":
                "User registered successfully"
            }
        )

    except Exception as e:

        return jsonify(
            {
                "error":
                str(e)
            }
        ), 400

    finally:

        conn.close()

@app.route("/login", methods=["POST"])
def login():

    data = request.json

    email = data["email"]
    password = data["password"]

    conn = get_db_connection()

    user = conn.execute(
        """
        SELECT * FROM users
        WHERE email = ?
        """,
        (email,)
    ).fetchone()

    conn.close()

    if user and check_password_hash(
        user["password"],
        password
    ):
        return jsonify({
            "message": "Login successful",
            "user": {
                "id": user["id"],
                "username": user["username"],
                "email": user["email"]
            }
        })

    return jsonify({
        "message": "Invalid email or password"
    }), 401

if __name__ == "__main__":
    app.run(debug=True)