/// <reference types="cypress" />

import "@4tw/cypress-drag-drop";

const testUser = {
  email: "t.anderson@cortex.com",
  password: "qwerty123",
};

describe("Order workflow", () => {
  before(() => {
    cy.viewport(1440, 800);
    cy.visit("http://localhost:3000/login");

    cy.get("[type='email']").type(testUser.email);
    cy.get("[type='password']").type(testUser.password);
    cy.get('[data-test-id="login-button"]').click();
  });

  it("should allow to create order after choosing ingredients", () => {
    cy.get('[data-test-id="ingredients-buns"]').as("buns");
    cy.get('[data-test-id="ingredients-sauces"]').as("sauces");
    cy.get('[data-test-id="ingredients-mains"]').as("mains");
    cy.get('[data-test-id="constructor-target"]').as("constructor");
    cy.get('[data-test-id="constructor-button-order"]').as("orderButton");

    cy.get("@buns")
      .find('[data-test-id="ingredient-card"]')
      .first()
      .drag("@constructor");
    cy.get("@sauces")
      .find('[data-test-id="ingredient-card"]')
      .last()
      .drag("@constructor");
    cy.get("@mains")
      .find('[data-test-id="ingredient-card"]')
      .first()
      .drag("@constructor");

    cy.get("@orderButton").click();

    cy.get('[data-test-id="modal-order-title"]').should(
      "contain",
      "идентификатор заказа"
    );

    cy.get('[data-test-id="modal-order-number"]', { timeout: 20000 }).should(
      "not.have.value",
      "0000"
    );

    cy.get('[data-test-id="modal-button-close"]', { timeout: 25000 }).click();
    cy.get('[data-test-id="modal-order-container"]').should("not.exist");
  });
});
