const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://housing-frontend-latest.onrender.com", // 替换为前端运行的地址
  },
});
