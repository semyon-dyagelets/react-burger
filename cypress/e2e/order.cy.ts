/// <reference types="cypress" />

import "@4tw/cypress-drag-drop";
import { selectors, testUser } from "./constants";

describe("Order workflow", () => {
  before(() => {
    cy.viewport(1440, 800);
    cy.visit("login");
    cy.get("[type='email']").type(testUser.email);
    cy.get("[type='password']").type(testUser.password);
    cy.get('[data-test-id="login-button"]').click();
  });

  it("should allow to create order after choosing ingredients", () => {
    cy.get(selectors.bunsIngredients)
      .find(selectors.ingredientCard)
      .first()
      .drag(selectors.constructor);

    cy.get(selectors.saucesIngredients)
      .find(selectors.ingredientCard)
      .last()
      .drag(selectors.constructor);

    cy.get(selectors.mainsIngredients)
      .find(selectors.ingredientCard)
      .first()
      .drag(selectors.constructor);

    cy.get(selectors.constructorOrderButton).click();

    cy.get('[data-test-id="modal-order-title"]').should(
      "contain",
      "идентификатор заказа"
    );

    cy.get('[data-test-id="modal-order-number"]', { timeout: 20000 }).should(
      "not.have.value",
      "0000"
    );

    cy.get(selectors.modalButtonClose, { timeout: 25000 }).click();

    cy.get('[data-test-id="modal-order-container"]').should("not.exist");
  });
});
