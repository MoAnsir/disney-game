/// <reference types="cypress" />

describe("Disney game", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("should load the heading, description and the start button", () => {
    cy.contains("Disney Film and TV game");

    cy.get(".heading").should("exist");
    cy.get(".start-button").should("exist");
    cy.get(".description").should("exist");
  });

  it("Should start the game and disable button", () => {
    cy.get(".start-button").should("exist").click();
    cy.get(".card").should("exist");
    cy.get(".start-button").should("be.disabled");
  });

  it("Should show an image with 4 answers ", () => {
    cy.get(".start-button").should("exist").click();
    cy.get(".card").should("exist");
    cy.get(".card img").should("exist");
    cy.get(".card .btn").should("have.length", 4);
  });

  it("should be hidden by default", () => {
    cy.get(".modal").should("exist").should("be.hidden");
  });

  it("Should finish after 10 rounds", () => {
    cy.get(".start-button").should("exist").click();
    cy.wrap([1, 2, 3, 4, 5, 6, 7, 8, 9]).each((index) => {
      cy.get(".card .btn.a-2").click();
    });
    cy.get(".game-over-button").should("exist");
  });

  it("Should show a modal after clicking finish button", () => {
    cy.get(".start-button").should("exist").click();
    cy.wrap([1, 2, 3, 4, 5, 6, 7, 8, 9]).each((index) => {
      cy.get(".card .btn.a-2").click();
    });
    cy.get(".game-over-button").should("exist").click();
    cy.get(".modal").should("exist").should("be.visible");
  });

  it("Should show score in modal", () => {
    cy.get(".start-button").should("exist").click();
    cy.wrap([1, 2, 3, 4, 5, 6, 7, 8, 9]).each((index) => {
      cy.get(".card .btn.a-2").click();
    });
    cy.get(".game-over-button").should("exist").click();
    cy.get(".modal .score").should("exist");
  });

  it("Should reset the game after 10 rounds", () => {
    cy.get(".start-button").should("exist").click();
    cy.wrap([1, 2, 3, 4, 5, 6, 7, 8, 9]).each((index) => {
      cy.get(".card .btn.a-2").click();
    });
    cy.get(".game-over-button").should("exist").click();
    cy.get(".modal-close").should("exist").should("be.visible").click();
    cy.get(".start-button").should("be.enabled");
    cy.get(".card").should("not.exist");
  });
});
