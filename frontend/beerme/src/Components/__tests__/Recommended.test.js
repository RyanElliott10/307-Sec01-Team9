import React from "react";
import renderer from "react-test-renderer";

import Recommended from "../Recommended";

it("renders correctly", () => {
  const tree = renderer.create(<Recommended />).toJSON();
  expect(tree).toMatchSnapshot();
});
