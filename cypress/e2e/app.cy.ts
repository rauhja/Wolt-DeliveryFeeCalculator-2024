describe("Delivery Fee Calculator", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });
  it("renders correctly", () => {
    cy.get("[data-test-id='cartValue']").should("be.visible");
    cy.get("[data-test-id='deliveryDistance']").should("be.visible");
    cy.get("[data-test-id='numberOfItems']").should("be.visible");
    cy.get("[data-test-id='orderTime']").should("be.visible");
    cy.get("[data-test-id='calculateButton']").should("be.visible");
  });

  it("allows user to calculate delivery fee", () => {
    cy.get("[data-test-id='cartValue']").type("8.9");
    cy.get("[data-test-id='deliveryDistance']").type("1000");
    cy.get("[data-test-id='numberOfItems']").type("4");
    cy.get("[data-test-id='orderTime']").type("010520261459");
    cy.get("[data-test-id='calculateButton']").click();
    cy.get("[data-test-id='fee']").should("have.text", "3.10€");
  });

  it("allows user to reset form", () => {
    cy.get("[data-test-id='cartValue']").type("8.9");
    cy.get("[data-test-id='deliveryDistance']").type("1000");
    cy.get("[data-test-id='numberOfItems']").type("4");
    cy.get("[data-test-id='orderTime']").type("010520261459");
    cy.get("[data-test-id='calculateButton']").click();
    cy.get("[data-test-id='fee']").should("have.text", "3.10€");
    cy.get("[data-test-id='resetButton']").click();
    cy.get("[data-test-id='cartValue']").should("have.value", "");
    cy.get("[data-test-id='deliveryDistance']").should("have.value", "");
    cy.get("[data-test-id='numberOfItems']").should("have.value", "");
  });

  it("disables Calculate button when fields are not filled", () => {
    cy.get("[data-test-id='calculateButton']").should("be.disabled");
  });

  it("disables Calculate button when some fields are filled", () => {
    cy.get("[data-test-id='cartValue']").type("8.9");
    cy.get("[data-test-id='calculateButton']").should("be.disabled");
  });

  it("raises error when cart value is not a number", () => {
    cy.get("[data-test-id='cartValue']").type("a");
    cy.get("[id='cartValue-helper-text']").should(
      "have.text",
      "Please enter a valid number"
    );
  });

  it("raises error when delivery distance is not a number", () => {
    cy.get("[data-test-id='deliveryDistance']").type("a");
    cy.get("[id='deliveryDistance-helper-text']").should(
      "have.text",
      "Value must be a positive number and greater than 0"
    );
  });

  it("raises error when number of items is not a number", () => {
    cy.get("[data-test-id='numberOfItems']").type("a");
    cy.get("[id='numberOfItems-helper-text']").should(
      "have.text",
      "Value must be a positive number and greater than 0"
    );
  });

  it("disables Calculate button when date is in the past", () => {
    cy.get("[data-test-id='cartValue']").type("8.9");
    cy.get("[data-test-id='deliveryDistance']").type("1000");
    cy.get("[data-test-id='numberOfItems']").type("4");
    cy.get("[data-test-id='orderTime']").type("010520201459");
    cy.get("[data-test-id='calculateButton']").should("be.disabled");
  });
});
