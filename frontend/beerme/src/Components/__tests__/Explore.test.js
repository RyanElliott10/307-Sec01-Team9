import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
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

it("renders correctly with state", () => {
  const ref = shallow(
    <BrowserRouter>
      <Explore />
    </BrowserRouter>
  ).instance();

  ref.setState({
    recommendedStyle: true
  });

  const expectedState = {
    recommendedStyle: true
  };

  expect(ref.state).toEqual(expectedState);
});
