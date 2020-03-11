import React from "react";
import renderer from "react-test-renderer";
import { MemoryRouter as Router } from "react-router-dom";

import Home from "../Home";

it("renders correctly", () => {
  const tree = renderer
    .create(
      <Router>
        <Home />
      </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
