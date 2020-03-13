import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";
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

it("renders handles text input correctly", () => {
  const ref = mount(
    <Router>
      <Home />
    </Router>
  );

  const inputs = ref
    .find("#react-search-box")
    .at(0)
    .simulate("change", { target: { name: "width", value: 50 } });
});
