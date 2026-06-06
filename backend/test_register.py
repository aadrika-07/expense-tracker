import requests

response = requests.post(
    "http://127.0.0.1:5000/register",
    json={
        "username": "Jiya",
        "email": "jiya@example.com",
        "password": "123456"
    }
)

print(response.json())