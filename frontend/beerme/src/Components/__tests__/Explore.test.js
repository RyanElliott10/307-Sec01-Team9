import React from "react";
import renderer from "react-test-renderer";
import { shallow, mount } from "enzyme";
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

it("renders correctly with props", () => {
  const tree = renderer
    .create(
      <BrowserRouter>
        <Explore
          recommendedStyle={{ name: "Test", id: 0 }}
          currentPageIndex={2}
        />
      </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders correctly with state", () => {
  const ref = mount(
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

it("renders correctly with clicks", () => {
  const ref = mount(
    <BrowserRouter>
      <Explore />
    </BrowserRouter>
  );

  ref
    .find("#submit-button")
    .at(0)
    .simulate("click");
});

it("handles checkbox selections correctly", () => {
  const ref = mount(
    <BrowserRouter>
      <Explore />
    </BrowserRouter>
  );

  const inputs = ref.find("#checkbox-option");
  inputs.forEach(r => r.simulate("click"));
});
