import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";
import { MemoryRouter as Router } from "react-router-dom";

import Header from "../Header";

it("renders correctly", () => {
  const tree = renderer
    .create(
      <Router>
        <Header />
      </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders correctly with clicks", () => {
  const ref = mount(
    <Router>
      <Header />
    </Router>
  );

  ref
    .find("#explore-header-clickable")
    .at(0)
    .simulate("click");

  ref
    .find("#recommended-header-clickable")
    .at(0)
    .simulate("click");

  ref
    .find("#account-header-clickable")
    .at(0)
    .simulate("click");

  ref
    .find("#beerme-header-clickable")
    .at(0)
    .simulate("click");
});
