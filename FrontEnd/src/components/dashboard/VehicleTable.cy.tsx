import VehicleTable from "@/components/dashboard/VehicleTable";
import { Vehicle } from "@/types";
import "@/index.css";

const mockVehicles: Vehicle[] = [
  {
    _id: "1",
    name: "Car A",
    status: "Active",
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "2",
    name: "Car B",
    status: "Inactive",
    updatedAt: new Date().toISOString(),
  },
];

const getStatusColor = (status: string) =>
  status === "Active" ? "bg-green-500 text-white" : "bg-red-500 text-white";

describe("VehicleTable Component", () => {
  beforeEach(() => {
    const onActionMock = cy.spy().as("onActionSpy");
    cy.mount(
      <VehicleTable
        vehicles={mockVehicles}
        isLoading={false}
        onAction={onActionMock}
        getStatusColor={getStatusColor}
      />
    );
  });

  it("should render the table with vehicle data", () => {});

  it("should render the dropdown menu for each row", () => {
    cy.get('[data-testid="action-button-0"]').should("exist");
    cy.get('[data-testid="action-button-1"]').should("exist");
  });

  it("should trigger the edit action when clicking 'Edit'", () => {
    cy.get('[data-testid="action-button-0"]').click();
    cy.get('[data-testid="edit-0"]').should("exist").click();

    cy.get("@onActionSpy").should("have.been.calledOnceWith", "edit", "1");
  });

  it("should show 'No vehicles found' when the list is empty", () => {
    const onActionMock = cy.spy().as("onActionSpy");
    cy.mount(
      <VehicleTable
        vehicles={[]}
        isLoading={false}
        onAction={onActionMock}
        getStatusColor={getStatusColor}
      />
    );

    cy.get("td").contains("No vehicles found");
  });
});
