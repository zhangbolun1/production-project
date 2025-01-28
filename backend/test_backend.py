import pytest
import json
from app import app, load_model

@pytest.fixture
def client():
    app.testing = True
    with app.test_client() as client:
        yield client

def test_model_loading():
    """测试模型加载"""
    model_data = load_model()
    assert model_data["model"] is not None, "模型未成功加载"
    assert len(model_data["feature_names"]) > 0, "特征名称未正确加载"

def test_valid_input(client):
    """测试有效输入"""
    payload = {"features": [3.5, 20, 5.2, 1.2, 1500, 3.0, 37.5, -122.5]}
    response = client.post('/predict', json=payload)
    data = json.loads(response.data)
    assert response.status_code == 200
    assert "prediction" in data

def test_invalid_input(client):
    """测试无效输入"""
    payload = {"features": ["invalid", None, {}, [], ""]}
    response = client.post('/predict', json=payload)
    assert response.status_code == 400
    data = json.loads(response.data)
    assert "error" in data