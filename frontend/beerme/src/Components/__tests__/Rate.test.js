import React from "react";
import renderer from "react-test-renderer";

import Rate from "../Rate";

it("renders correctly", () => {
  const tree = renderer.create(<Rate />).toJSON();
  expect(tree).toMatchSnapshot();
});
