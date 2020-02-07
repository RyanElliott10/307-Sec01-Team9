import React from "react";
import * as Constants from "../../Utils/Constants";

export function Header() {
  const onTitleClick = () => {
    console.log("onTitleClick");
  };

  const onExploreClick = () => {
    console.log("onExploreClick");
  };

  const onRecClick = () => {
    console.log("onRecClick");
  };

  return (
    <div style={headerStyle}>
      <h1 style={titleStyle} onClick={onTitleClick}>
        BeerMe
      </h1>
      <div
        style={{ display: "flex", flexDirection: "row", paddingRight: "30px" }}
      >
        <h5 style={exploreStyle} onClick={onExploreClick}>
          Explore
        </h5>
        <h5 style={recStyle} onClick={onRecClick}>
          Recommended For You
        </h5>
      </div>
    </div>
  );
}

const headerStyle = {
  display: "flex",
  flex: 1,
  background: "#F4F4F4",
  padding: "10px",
  flexDirection: "row",
  justifyContent: "space-between",
  paddingLeft: "30px",
  alignItems: "center"
};

const titleStyle = {
  color: Constants.ORANGE_COLOR,
  paddingRight: "10px",
  cursor: "pointer"
};

const exploreStyle = {
  paddingRight: "10px",
  cursor: "pointer"
};

const recStyle = {
  paddingLeft: "10px",
  cursor: "pointer"
};

export default Header;
