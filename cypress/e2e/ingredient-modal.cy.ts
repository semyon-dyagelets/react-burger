/// <reference types="cypress" />

import { selectors } from "./constants";

describe("Ingredient modal", () => {
  beforeEach(() => {
    cy.viewport(1440, 800);
    cy.visit('/');
  });

  it("should be opened by click on card", () => {
    cy.get(selectors.ingredientCard).first().click();

    cy.get(selectors.ingredientModalContainer).should("exist");
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
    cy.get(selectors.ingredientCard).first().click();

    cy.get(selectors.modalButtonClose).click();
    cy.get(selectors.ingredientModalContainer).should("not.exist");
  });
});
