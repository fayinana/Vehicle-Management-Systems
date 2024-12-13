import React from "react";
import { mount } from "cypress/react18";
import EditVehicleModal from "@/components/EditVehicleModal";
import { Vehicle } from "@/types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@/index.css";

const mockVehicle: Vehicle = {
  _id: "1",
  name: "Car A",
  status: "Active",
  updatedAt: new Date().toISOString(),
};

describe("EditVehicleModal Component", () => {
  let onCloseStub: Cypress.Stub;
  let editVehicleStub: Cypress.Stub;

  const createTestQueryClient = () =>
    new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

  beforeEach(() => {
    onCloseStub = cy.stub().as("onCloseStub");
    editVehicleStub = cy.stub().as("editVehicleStub");

    cy.mount(
      <QueryClientProvider client={createTestQueryClient()}>
        <EditVehicleModal
          isOpen={true}
          onClose={onCloseStub}
          vehicle={mockVehicle}
        />
      </QueryClientProvider>
    );
  });

  it("should render the modal with the correct title and dropdown", () => {
    cy.get("h3").contains("Edit Vehicle Status").should("be.visible");
    cy.get("select#status")
      .should("exist")
      .and("have.value", mockVehicle.status);
  });

  it("should close the modal when cancel is clicked", () => {
    cy.get('[test-data-id="cancel"]').click();
    cy.get("@onCloseStub").should("have.been.calledOnce");
  });
});
