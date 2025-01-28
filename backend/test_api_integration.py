import pytest
import json
from app import app

@pytest.fixture
def client():
    app.testing = True
    with app.test_client() as client:
        yield client

def test_predict_valid_input(client):
    """测试有效输入的完整流程"""
    payload = {"features": [3.5, 20, 5.2, 1.2, 1500, 3.0, 37.5, -122.5]}
    response = client.post('/predict', json=payload)
    data = json.loads(response.data)
    assert response.status_code == 200
    assert "prediction" in data
    assert isinstance(data["prediction"], float)

def test_predict_invalid_input(client):
    """测试无效输入的处理"""
    payload = {"features": ["invalid", None, {}, [], ""]}
    response = client.post('/predict', json=payload)
    assert response.status_code == 400
    data = json.loads(response.data)
    assert "error" in data

def test_predict_edge_case(client):
    """测试边界值输入"""
    payload = {"features": [0, 0, 0, 0, 0, 0, -90, 180]}
    response = client.post('/predict', json=payload)
    data = json.loads(response.data)
    assert response.status_code == 200
    assert "prediction" in data
    assert isinstance(data["prediction"], float)