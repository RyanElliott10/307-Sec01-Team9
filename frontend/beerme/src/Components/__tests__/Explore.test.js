import React from "react";
import renderer from "react-test-renderer";
import { BrowserRouter } from "react-router-dom";

import Explore from "../Explore";

it("renders correctly", () => {
  const tree = renderer
    .create(
      <BrowserRouter>
        <Explore />
      </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
