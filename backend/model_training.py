import numpy as np
import pandas as pd
from sklearn.datasets import fetch_california_housing
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error
import pickle

# 加载加州房价数据集
housing = fetch_california_housing(as_frame=True)
data = housing.data
data['PRICE'] = housing.target

# 数据分割
X = data.drop(columns=['PRICE'])
y = data['PRICE']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 模型训练
model = LinearRegression()
model.fit(X_train, y_train)

# 评估模型
y_pred = model.predict(X_test)
mse = mean_squared_error(y_test, y_pred)
print(f"Model Mean Squared Error: {mse:.2f}")

# 保存模型和特征名称
model_data = {
    "model": model,
    "feature_names": list(X.columns)  # 保存特征名称
}
with open('housing_model.pkl', 'wb') as f:
    pickle.dump(model_data, f)

print("Model saved as housing_model.pkl")