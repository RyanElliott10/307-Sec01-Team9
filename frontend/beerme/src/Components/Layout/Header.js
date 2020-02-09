import React from "react";
import * as Constants from "../../Utils/Constants";

export function Header() {
  const onMouseOver = event => {
    event.target.style.color = Constants.HOVER_ORANGE_COLOR;
  };

  const onMouseOut = (event, key) => {
    let color = null;
    switch (key) {
      case 1:
        color = Constants.ORANGE_COLOR;
        break;
      case 2:
        color = "#000";
				break;
			default:
				break;
    }
    event.target.style.color = color;
  };

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
      <h1
        style={titleStyle}
        onClick={onTitleClick}
        onMouseEnter={event => onMouseOver(event)}
        onMouseOut={event => onMouseOut(event, 1)}
      >
        BeerMe
      </h1>
      <div
        style={{ display: "flex", flexDirection: "row", paddingRight: "30px" }}
      >
        <h5
          style={exploreStyle}
          onClick={onExploreClick}
          onMouseEnter={event => onMouseOver(event)}
          onMouseOut={event => onMouseOut(event, 2)}
        >
          Explore
        </h5>
        <h5
          style={recStyle}
          onClick={onRecClick}
          onMouseEnter={event => onMouseOver(event)}
          onMouseOut={event => onMouseOut(event, 2)}
        >
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
