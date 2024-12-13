import { BrowserRouter } from "react-router-dom";
import { mount } from "cypress/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AddVehicle from "./AddVehicle";
import "@/index.css";

describe("AddVehicle Component", () => {
  const queryClient = new QueryClient();

  const mountWithRouter = (initialPath) => {
    mount(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AddVehicle />
        </BrowserRouter>
      </QueryClientProvider>
    );
  };

  it("should render AddVehicle form with navigation and form submission", () => {
    mountWithRouter("/add");
    cy.get("input[id='name']").should("exist");
  });

  it("should show status selector", () => {
    mountWithRouter("/add");
    cy.get("select#status").should("exist");
  });

  it("should contain cancel button", () => {
    mountWithRouter("/add");
    cy.get('button[type="button"]').contains("Cancel");
  });
  it("should contain Add Vehicle button", () => {
    mountWithRouter("/add");
    cy.get('button[type="submit"]').contains("Add Vehicle");
  });
});
