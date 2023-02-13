/// <reference types="cypress" />

describe("Ingredient modal", () => {
  beforeEach(() => {
    cy.viewport(1440, 800);
    cy.visit("http://localhost:3000");
    cy.get('[data-test-id="ingredient-card"]').first().as("ingredient");
  });

  it("should be opened by click on card", () => {
    cy.get("@ingredient").click();

    cy.get('[data-test-id="ingredient-modal-container"]').should("exist");
    cy.get('[data-test-id="ingredient-modal-title"]').should(
      "contain",
      "Детали ингредиента"
    );
    cy.get('[data-test-id="ingredient-modal-calories"]').should(
      "contain",
      "Калории,ккал"
    );
    cy.get('[data-test-id="ingredient-modal-proteins"]').should(
      "contain",
      "Белки, г"
    );
    cy.get('[data-test-id="ingredient-modal-fat"]').should(
      "contain",
      "Жиры, г"
    );
    cy.get('[data-test-id="ingredient-modal-carbohydrates"]').should(
      "contain",
      "Углеводы, г"
    );
  });

  it("should be closed by click on close button", () => {
    cy.get("@ingredient").click();

    cy.get('[data-test-id="modal-button-close"]').click();
    cy.get('[data-test-id="ingredient-modal-container"]').should("not.exist");
  });
});
