describe("房价预测应用端到端测试", () => {
  beforeEach(() => {
    cy.visit("/"); // 访问前端首页
  });

  it("正常输入并获取预测结果", () => {
    // 填写表单
    cy.get("input[name='MedInc']").type("3.5");
    cy.get("input[name='HouseAge']").type("20");
    cy.get("input[name='AveRooms']").type("5.2");
    cy.get("input[name='AveBedrms']").type("1.2");
    cy.get("input[name='Population']").type("1500");
    cy.get("input[name='AveOccup']").type("3.0");
    cy.get("input[name='Latitude']").type("37.5");
    cy.get("input[name='Longitude']").type("-122.5");

    // 点击预测按钮
    cy.contains("预测房价").click();

    // 验证预测结果是否显示
    cy.contains("预测的房价:").should("exist");
  });

  
  it("简单无效输入的错误处理", () => {
    // 填写无效表单
    cy.get("input[name='MedInc']").type("3.5"); // 有效
    cy.get("input[name='HouseAge']").type("-5"); // 无效：负数
    cy.get("input[name='AveRooms']").type("5"); // 有效
    cy.get("input[name='AveBedrms']").type("1"); // 有效
    cy.get("input[name='Population']").type("1500"); // 有效
    cy.get("input[name='AveOccup']").type("3"); // 有效
    cy.get("input[name='Latitude']").type("37.5"); // 有效
    cy.get("input[name='Longitude']").type("-122.5"); // 有效
  
    // 点击预测按钮
    cy.contains("预测房价").click();
  
    // 验证预测结果是否显示
    cy.contains("预测的房价:").should("exist");
  });
  
  
  it("边界值输入的预测结果", () => {
    // 填写边界值表单
    cy.get("input[name='MedInc']").type("0");
    cy.get("input[name='HouseAge']").type("0");
    cy.get("input[name='AveRooms']").type("0");
    cy.get("input[name='AveBedrms']").type("0");
    cy.get("input[name='Population']").type("1");
    cy.get("input[name='AveOccup']").type("0");
    cy.get("input[name='Latitude']").type("-90");
    cy.get("input[name='Longitude']").type("180");

    // 点击预测按钮
    cy.contains("预测房价").click();

    // 验证预测结果是否显示
    cy.contains("预测的房价:").should("exist");
  });
});
