describe("404 Page Navigation", () => {
  it("Should navigate back to the home page when 'Back to Home' button is clicked", () => {
    cy.visit("http://localhost:5071/notfound");
    cy.get("button").contains("Go Back Home").click();
    cy.url().should("eq", "http://localhost:5071/");
  });
});
