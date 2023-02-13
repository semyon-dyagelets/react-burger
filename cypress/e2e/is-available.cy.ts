/// <reference types="cypress" />

describe("Service", () => {
  it("should be available on localhost:3000", () => {
    cy.viewport(1440, 800);
    cy.visit("http://localhost:3000");
    cy.contains("Соберите бургер");
  });
});
