import React from "react";
import renderer from "react-test-renderer";
import { MemoryRouter as Router } from "react-router-dom";

import Main from "../Main";

it("renders correctly", () => {
  const tree = renderer
    .create(
      <Router>
        <Main />
      </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
