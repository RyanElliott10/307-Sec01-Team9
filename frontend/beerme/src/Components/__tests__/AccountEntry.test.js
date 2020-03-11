import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";

import AccountEntry from "../AccountEntry";

it("renders correctly", () => {
  const tree = renderer.create(<AccountEntry />).toJSON();
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
  const ref = shallow(<AccountEntry />)
  ref.instance().setState({
    signInData: {
      email: "test@gmail.com",
      password: "password123",
    }
  });

  // expect(ref._validateAccountCreationForm()).toBeTruthy();
  expect(ref.state('signedIn')).toBeFalsy();
});


