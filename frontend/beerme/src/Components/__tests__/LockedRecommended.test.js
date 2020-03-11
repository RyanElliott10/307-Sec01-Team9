import React from "react";
import renderer from "react-test-renderer";
import { MemoryRouter as Router } from "react-router-dom";

import LockedRecommended from "../LockedRecommended";

it("renders correctly", () => {
  const tree = renderer
    .create(
      <Router>
        <LockedRecommended />
      </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
