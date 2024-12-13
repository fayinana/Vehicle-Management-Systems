import React from "react";
import NotFound from "./NotFound";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "@/index.css";
function MockedNotFound() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

describe("<NotFound />", () => {
  it("renders without crashing", () => {
    cy.mount(<MockedNotFound />);
  });

  it("displays the correct heading", () => {
    cy.mount(<MockedNotFound />);
    cy.get("h2").contains("Page Not Found");
  });

  it("contains a link to return home", () => {
    cy.mount(<MockedNotFound />);
    cy.get("button").contains("Go Back Home");
  });

  it("shows a 404 message", () => {
    cy.mount(<MockedNotFound />);
    cy.get("p").contains(
      "The page you're looking for doesn't exist or has been moved."
    );
  });
});
