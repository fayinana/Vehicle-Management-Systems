import Spinner from "./Spinner";
import "@/index.css";
describe("Spinner Component", () => {
  it("renders", () => {
    cy.mount(<Spinner />);
  });
});
