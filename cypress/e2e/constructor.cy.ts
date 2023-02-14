/// <reference types="cypress" />

import "@4tw/cypress-drag-drop";
import { selectors } from "./constants";

describe("Constructor workflow", () => {
  beforeEach(() => {
    cy.viewport(1440, 800);
    cy.visit("/");
  });

  it("should allow to drag and drop any kind of ingredients", () => {
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
  });

  it("should allow to change buns by drag and drop", () => {
    cy.get(selectors.bunsIngredients)
      .find(selectors.ingredientCard)
      .first()
      .drag(selectors.constructor);

    cy.get(selectors.constructorElementText)
      .first()
      .should("contain", "Краторная булка N-200i (верх)");

    cy.get(selectors.saucesIngredients)
      .find(selectors.ingredientCard)
      .last()
      .drag(selectors.constructor);

    cy.get(selectors.bunsIngredients)
      .find(selectors.ingredientCard)
      .last()
      .drag(selectors.constructor);

    cy.get(selectors.constructorElementText)
      .first()
      .should("contain", "Флюоресцентная булка R2-D3 (верх)");
  });

  it("should allow to delete ingredients by click on icon", () => {
    cy.get(selectors.saucesIngredients)
      .find(selectors.ingredientCard)
      .last()
      .drag(selectors.constructor);

    cy.get(selectors.constructorElementAction).find("svg").click();
    cy.get(selectors.constructorElementAction).should("not.exist");
  });
});
