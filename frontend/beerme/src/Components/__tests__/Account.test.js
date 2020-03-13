import React from "react";
import renderer from "react-test-renderer";
import { mount, shallow } from "enzyme";
import { BrowserRouter } from "react-router-dom";

import Account from "../Account";
import UserController from "../../Controllers/UserController";

it("renders correctly", () => {
  const tree = renderer
    .create(
      <BrowserRouter>
        <Account />
      </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders correctly with a user logged in", () => {
  UserController.isLoggedIn = true;
  const tree = renderer
    .create(
      <BrowserRouter>
        <Account />
      </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders correctly with a business", () => {
  UserController.isLoggedIn = true;
  UserController.isBusiness = true;
  UserController.businessName = "Test Business";
  const tree = renderer
    .create(
      <BrowserRouter>
        <Account />
      </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders correctly with state", () => {
  const ref = shallow(
    <BrowserRouter>
      <Account />
    </BrowserRouter>
  ).instance();
  ref.setState({
    addBeerData: {
      name: "Corona",
      styles: "Style-here",
      color: "Pale"
    }
  });

  const expectedState = {
    addBeerData: {
      name: "Corona",
      styles: "Style-here",
      color: "Pale"
    }
  };

  expect(ref.state).toEqual(expectedState);
});

it("handles clicks correctly", () => {
  UserController.isLoggedIn = true;
  UserController.isBusiness = true;
  const ref = mount(
    <BrowserRouter>
      <Account />
    </BrowserRouter>
  );

  ref
    .find("#add-beer-button")
    .at(0)
    .simulate("click");
  ref
    .find("#remove-beer-button")
    .at(0)
    .simulate("click");
});

it("handles logout correctly", () => {
  UserController.isLoggedIn = true;
  const ref = mount(
    <BrowserRouter>
      <Account />
    </BrowserRouter>
  );

  ref
    .find("#logout-button")
    .at(0)
    .simulate("click");
});

it("handles selecting beers to add correctly", () => {
  UserController.isLoggedIn = true;
  UserController.isBusiness = true;
  const ref = mount(
    <BrowserRouter>
      <Account />
    </BrowserRouter>
  );

  ref
    .find("#add-beer-dropdown")
    .at(0)
    .simulate("click");
});

it("handles selecting beers to remove correctly", () => {
  UserController.isLoggedIn = true;
  UserController.isBusiness = true;
  const ref = mount(
    <BrowserRouter>
      <Account />
    </BrowserRouter>
  );

  ref
    .find("#add-beer-dropdown")
    .at(0)
    .simulate("click");
});
