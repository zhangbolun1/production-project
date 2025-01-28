import React, { useState } from "react";

function App() {
  const [features, setFeatures] = useState({
    MedInc: "",
    HouseAge: "",
    AveRooms: "",
    AveBedrms: "",
    Population: "",
    AveOccup: "",
    Latitude: "",
    Longitude: "",
  });

  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null); // 新增状态用于错误提示

  const handleChange = (e) => {
    setFeatures({
      ...features,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const featureArray = Object.values(features).map((val) => parseFloat(val));
  
    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL;

      const response = await fetch(`${backendUrl}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ features: featureArray }),
      });
      
  
      console.log("Response object:", response); // 调试 fetch 返回的对象
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const data = await response.json();
      console.log("Received prediction:", data); // 调试返回的数据
      setPrediction(data.prediction);
      setError(null); // 清除错误状态
    } catch (error) {
      console.error("Fetch error:", error);
      setError("发生错误，请重试"); // 设置错误提示
    }
  };
  

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>房价预测应用</h1>
      <form onSubmit={handleSubmit}>
        {Object.keys(features).map((feature) => (
          <div key={feature} style={{ marginBottom: "10px" }}>
            <label>
              {feature}: 
              <input
                type="number"
                step="any"
                name={feature}
                value={features[feature]}
                onChange={handleChange}
                required
              />
            </label>
          </div>
        ))}
        <button type="submit">预测房价</button>
      </form>

      {error && <div style={{ color: "red", marginTop: "20px" }}>{error}</div>}

      {prediction !== null && (
        <div style={{ marginTop: "20px" }}>
          <h2>预测的房价: {prediction.toFixed(2)}</h2>
        </div>
      )}
    </div>
  );
}

export default App;