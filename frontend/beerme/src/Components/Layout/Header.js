import React from "react";
import { Link } from "react-router-dom";

import * as Constants from "../../Utils/Constants";
import UserController from "../../Controllers/UserController";

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
        color = "#000";
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
      <Link to="/" style={titleStyle} className="beerme-homepage-clickable">
        <h1
          onClick={onTitleClick}
          onMouseEnter={event => onMouseOver(event)}
          onMouseOut={event => onMouseOut(event, 1)}
        >
          BeerMe
        </h1>
      </Link>
      <div
        style={{ display: "flex", flexDirection: "row", paddingRight: "30px" }}
      >
        <Link
          to="/explore"
          style={exploreStyle}
          className={"explore_header_link"}
        >
          <h6
            onClick={onExploreClick}
            onMouseEnter={event => onMouseOver(event)}
            onMouseOut={event => onMouseOut(event, 2)}
          >
            Explore
          </h6>
        </Link>
        <Link
          to="/recommended"
          style={recStyle}
          className={"recommended_header_link"}
        >
          <h6
            onClick={onRecClick}
            onMouseEnter={event => onMouseOver(event)}
            onMouseOut={event => onMouseOut(event, 2)}
          >
            Recommended
          </h6>
        </Link>
        <Link
          to={UserController.getCurrentUser() ? "/account" : "/account-entry"}
          style={recStyle}
          className={"account_account_entry_header_link"}
        >
          <h6
            onClick={onRecClick}
            onMouseEnter={event => onMouseOver(event)}
            onMouseOut={event => onMouseOut(event, 2)}
          >
            Account
          </h6>
        </Link>
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
  alignItems: "center",
  marginBottom: "20px"
};

const titleStyle = {
  color: Constants.ORANGE_COLOR,
  textDecoration: "none",
  paddingRight: "10px",
  cursor: "pointer"
};

const exploreStyle = {
  textDecoration: "none",
  paddingRight: "10px",
  cursor: "pointer",
  color: "#000"
};

const recStyle = {
  textDecoration: "none",
  paddingLeft: "10px",
  cursor: "pointer",
  color: "#000"
};

export default Header;
