import React from "react";
import renderer from "react-test-renderer";
import { BrowserRouter } from "react-router-dom";

import Rate from "../Rate";

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
