from flask import Flask, request, jsonify
import pickle
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # 启用 CORS 支持

def load_model():
    """加载模型和特征名称"""
    with open('housing_model.pkl', 'rb') as f:
        model_data = pickle.load(f)
    return model_data

# 加载模型
model_data = load_model()
model = model_data["model"]
feature_names = model_data["feature_names"]

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    features = data.get('features')
    
    # 验证输入特征数量是否正确
    if len(features) != len(feature_names):
        return jsonify({"error": f"Expected {len(feature_names)} features: {feature_names}"}), 400

    # 转换为 NumPy 数组并预测
    features = np.array(features).reshape(1, -1)
    prediction = model.predict(features)[0]
    return jsonify({'prediction': prediction})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)