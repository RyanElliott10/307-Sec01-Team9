import React from "react";
import renderer from "react-test-renderer";

import AccountEntry from "../AccountEntry";

it("renders correctly", () => {
  const tree = renderer.create(<AccountEntry />).toJSON();
  expect(tree).toMatchSnapshot();
});
