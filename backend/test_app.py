import requests  # 确保引入 requests 模块

BASE_URL = "http://127.0.0.1:5000/predict"

def test_valid_input():
    payload = {"features": [3.5, 20, 5.2, 1.2, 1500, 3.0, 37.5, -122.5]}
    response = requests.post(BASE_URL, json=payload)
    assert response.status_code == 200
    assert "prediction" in response.json()

def test_edge_case_input():
    payload = {"features": [0, 0, 0, 0, 0, 0, -90, 180]}
    response = requests.post(BASE_URL, json=payload)
    assert response.status_code == 200
    assert "prediction" in response.json()

def test_invalid_input():
    payload = {"features": ["invalid", None, {}, [], ""]}
    response = requests.post(BASE_URL, json=payload)
    assert response.status_code == 400  # 确保返回 HTTP 400 错误