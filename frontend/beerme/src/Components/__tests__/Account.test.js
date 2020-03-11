import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";

import Account from "../Account";

it("renders correctly", () => {
  const tree = renderer.create(<Account />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders correctly with state", () => {
  const ref = shallow(<Account />).instance();
  ref.setState({
    addBeerData: {
      name: "Corona",
      styles: "Style-here",
      color: "Pale"
    }
  });

  const expectedState = {
    addBeerData: {
      name: "Corona",
      styles: "Style-here",
      color: "Pale"
    }
  };

  expect(ref.state).toEqual(expectedState);
});
