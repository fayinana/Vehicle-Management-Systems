import React from "react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { mount } from "cypress/react";
import Layout from "@/components/Layout";
import "@/index.css";

describe("Layout Component", () => {
  const childContent = (
    <div data-test-id="child-content">Test Child Content</div>
  );

  const mountWithRouter = (initialPath) => {
    mount(
      <MemoryRouter initialEntries={[initialPath]}>
        <Layout>{childContent}</Layout>
      </MemoryRouter>
    );
  };

  it("should render the layout and child content", () => {
    mountWithRouter("/");
    cy.get("[data-test-id='title']")
      .contains("Vehicle Manager")
      .should("be.visible");
    cy.get("[data-test-id='child-content']")
      .contains("Test Child Content")
      .should("be.visible");
  });

  it("should highlight the active navigation link", () => {
    mountWithRouter("/add");
    cy.get("a")
      .contains("Add Vehicle")
      .should("have.class", "bg-primary text-primary-foreground");
    cy.get("a")
      .contains("Dashboard")
      .should("not.have.class", "bg-primary text-primary-foreground");
  });

  it("should correctly navigate between links", () => {
    mount(
      <BrowserRouter>
        <Layout>{childContent}</Layout>
      </BrowserRouter>
    );

    cy.get("a").contains("Dashboard").click({ force: true });
    cy.location("pathname").should("eq", "/");
    cy.get("a")
      .contains("Dashboard")
      .should("have.class", "bg-primary text-primary-foreground");

    cy.get("a").contains("Add Vehicle").click({ force: true });
    cy.location("pathname").should("eq", "/add");
    cy.get("a")
      .contains("Add Vehicle")
      .should("have.class", "bg-primary text-primary-foreground");
  });
});
