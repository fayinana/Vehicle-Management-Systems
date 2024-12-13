describe("Vehicle Management - Edit Vehicle", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5071/");
  });

  it("should edit vehicle status successfully", () => {
    cy.get('[data-testid="action-button-1"]').click();
    cy.get('[data-testid="edit-1"]').should("be.visible").click();
    cy.get("h3").should("contain.text", "Edit Vehicle Status");
    cy.get("form").should("be.visible");
    cy.get('select[id="status"]').should("not.be.disabled");
    cy.get('select[id="status"]').select("Active", { force: true });
    cy.get('button[type="submit"]').click({ force: true });
    cy.contains("Vehicle status changed successfully!");
  });

  it("should close the modal when Cancel is clicked", () => {
    cy.get('[data-testid="action-button-1"]').click();
    cy.get('[data-testid="edit-1"]').should("be.visible").click();
    cy.get("h3").should("contain.text", "Edit Vehicle Status");
    cy.get("form").should("be.visible");
    cy.get("button").contains("Cancel").click();
  });
});
