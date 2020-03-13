import React from "react";
import renderer from "react-test-renderer";
import { shallow, mount } from "enzyme";
import { MemoryRouter as Router } from "react-router-dom";

import Recommended from "../Recommended";
import UserController from "../../Controllers/UserController";

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

it("renders correctly with fromExplore prop", () => {
  const tree = renderer
    .create(
      <Router>
        <Recommended fromExplore={true} mainDesc={"true"} recBeers={["hi"]} />
      </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders correctly with noRecs prop", () => {
  const tree = renderer
    .create(
      <Router>
        <Recommended noRecs={true} recBeers={["hi"]} />
      </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders correctly with a user", () => {
  UserController.isLoggedIn = true;
  const tree = renderer
    .create(
      <Router>
        <Recommended />
      </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("handles clicking a beer correctly", () => {
  const ref = mount(
    <Router>
      <Recommended />
    </Router>
  );

  const inputs = ref.find("#clickable-beer");
  inputs.forEach(r => r.simulate("click"));
});
