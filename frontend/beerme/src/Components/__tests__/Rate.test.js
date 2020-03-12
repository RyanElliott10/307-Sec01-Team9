import React from "react";
import renderer from "react-test-renderer";
import { BrowserRouter } from "react-router-dom";

import Rate from "../Rate";
import UserController from "../../Controllers/UserController";

it("renders correctly", () => {
  const tree = renderer
    .create(
      <BrowserRouter>
        <Rate />
      </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders correctly for businesses", () => {
  UserController.isBusiness = true;
  const tree = renderer
    .create(
      <BrowserRouter>
        <Rate />
      </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders correctly for businesses", () => {
  UserController.isBusiness = false;
  UserController.isLoggedIn = false;
  const tree = renderer
    .create(
      <BrowserRouter>
        <Rate />
      </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
