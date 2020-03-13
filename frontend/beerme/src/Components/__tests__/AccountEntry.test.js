import React from "react";
import renderer from "react-test-renderer";
import { mount, shallow } from "enzyme";
import { BrowserRouter } from "react-router-dom";

import AccountEntry from "../AccountEntry";
import UserController from "../../Controllers/UserController";

it("renders correctly", () => {
  const tree = renderer.create(<AccountEntry />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders correctly with a current user", () => {
  UserController.isLoggedIn = true;
  const tree = renderer
    .create(
      <BrowserRouter>
        <AccountEntry />
      </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("_validateLoginForm correctly says the login form is valid with full data", () => {
  const ref = shallow(<AccountEntry />).instance();
  ref.setState({
    signInData: {
      email: "test@gmail.com",
      password: "password123"
    }
  });

  expect(ref._validateLoginForm()).toBeTruthy();
});

it("_validateAccountCreationForm correctly says the create account form is valid with full data", () => {
  const ref = shallow(<AccountEntry />).instance();
  ref.setState({
    createAccountData: {
      firstName: "First",
      lastName: "Last",
      email: "test@gmail.com",
      password: "password123",
      confirmPassword: "password123",
      isBusiness: true,
      businessName: "BeerMe"
    }
  });

  expect(ref._validateAccountCreationForm()).toBeTruthy();
});

it("_handleSignInSubmit does not sign in with invalid information", () => {
  UserController.isLoggedIn = false;
  const ref = shallow(<AccountEntry />);
  ref.instance().setState({
    signInData: {
      email: "test@gmail.com",
      password: "password123"
    }
  });

  // expect(ref._validateAccountCreationForm()).toBeTruthy();
  expect(ref.state("signedIn")).toBeFalsy();
});

it("renders correctly with login clicks", () => {
  const ref = mount(
    <BrowserRouter>
      <AccountEntry />
    </BrowserRouter>
  );

  ref
    .find("#switch-to-create-account")
    .at(0)
    .simulate("click");
  ref
    .find("#switch-to-login")
    .at(0)
    .simulate("click");
  ref
    .find("#login-button")
    .at(0)
    .simulate("click");
});

it("renders correctly with create account clicks", () => {
  const ref = mount(
    <BrowserRouter>
      <AccountEntry />
    </BrowserRouter>
  );

  ref
    .find("#switch-to-create-account")
    .at(0)
    .simulate("click");

  ref.update();

  ref
    .find("#submit-button")
    .at(0)
    .simulate("click");
});

it("renders handles text input correctly", () => {
  const ref = mount(
    <BrowserRouter>
      <AccountEntry />
    </BrowserRouter>
  );

  const inputs = ref.find("#control-input");
  inputs.forEach(r =>
    r.simulate("change", { target: { name: "width", value: 50 } })
  );
});
