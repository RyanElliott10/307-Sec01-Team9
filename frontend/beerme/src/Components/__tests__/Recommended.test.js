import React from "react";
import renderer from "react-test-renderer";
import { MemoryRouter as Router } from "react-router-dom";

import Recommended from "../Recommended";

it("renders correctly", () => {
  const tree = renderer
    .create(
      <Router>
        <Recommended />
      </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
