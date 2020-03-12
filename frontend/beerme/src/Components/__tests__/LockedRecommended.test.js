import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";
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

it("renders correctly with clicks", () => {
  const ref = mount(
    <Router>
      <LockedRecommended />
    </Router>
  );

  ref
    .find("#go-to-create-account-link")
    .at(0)
    .simulate("click");
});
