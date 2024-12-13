import "cypress/support";
describe("AddVehicle Component", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5071/");
    cy.contains("Add Vehicle").should("be.visible").click();
  });

  it("should allow entering a vehicle name and selecting a status", () => {
    cy.get('label[for="name"]').type("Toyota Camry");
    cy.get('select[id="status"]').select("Active");
    cy.get('button[type="submit"]').click();
    cy.contains("Vehicle added successfully!");
  });

  it("should display an error message when the vehicle name is not provided", () => {
    cy.get('select[id="status"]').select("Active");
    cy.get('button[type="submit"]').click();
    cy.get(".text-red-600").should("contain", "Vehicle name is required");
  });

  it("should allow canceling the operation", () => {
    cy.get('button[type="button"]').click();
    cy.url().should("eq", "http://localhost:5071/");
  });
});
