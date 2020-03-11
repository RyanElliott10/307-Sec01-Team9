import React from "react";
import renderer from "react-test-renderer";

import LockedRecommended from "../LockedRecommended";

it("renders correctly", () => {
  const tree = renderer.create(<LockedRecommended />).toJSON();
  expect(tree).toMatchSnapshot();
});
