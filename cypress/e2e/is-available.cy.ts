/// <reference types="cypress" />

import { selectors } from "./constants";

describe("Service", () => {
  it("should be available on localhost:3000", () => {
    cy.viewport(1440, 800);
    cy.visit("/");
    cy.get(selectors.burgerIngredientsSection).should(
      "contain",
      "Соберите бургер"
    );
  });
});
