/// <reference types="cypress" />

import "@4tw/cypress-drag-drop";

describe("Constructor workflow", () => {
  beforeEach(() => {
    cy.viewport(1440, 800);
    cy.visit("http://localhost:3000/");
    cy.get('[data-test-id="ingredients-buns"]').as("buns");
    cy.get('[data-test-id="ingredients-sauces"]').as("sauces");
    cy.get('[data-test-id="ingredients-mains"]').as("mains");
    cy.get('[data-test-id="constructor-target"]').as("constructor");
  });

  it("should allow to drag and drop any kind of ingredients", () => {
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
  });

  it("should allow to change buns by drag and drop", () => {
    cy.get("@buns")
      .find('[data-test-id="ingredient-card"]')
      .first()
      .drag("@constructor");

    cy.get(".constructor-element__text")
      .first()
      .should("contain", "Краторная булка N-200i (верх)");

    cy.get("@sauces")
      .find('[data-test-id="ingredient-card"]')
      .last()
      .drag("@constructor");

    cy.get("@buns")
      .find('[data-test-id="ingredient-card"]')
      .last()
      .drag("@constructor");

    cy.get(".constructor-element__text")
      .first()
      .should("contain", "Флюоресцентная булка R2-D3 (верх)");
  });

  it("should allow to delete ingredients by click on icon", () => {
    cy.get("@sauces")
      .find('[data-test-id="ingredient-card"]')
      .last()
      .drag("@constructor");

    cy.get(".constructor-element__action").find("svg").click();
    cy.get(".constructor-element__action").should("not.exist");
  });
});
