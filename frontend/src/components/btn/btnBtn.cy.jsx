import React from "react";
import { Btn } from "./Btn";

describe("<Btn />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Btn />);
  });
});
