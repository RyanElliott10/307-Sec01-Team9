import React, { Component } from "react";
import PropTypes from "prop-types";
import * as Constants from "../Utils/Constants";

export class ExploreButton extends Component {
  onMouseOver = event => {
    event.target.style.backgroundColor = Constants.HOVER_ORANGE_COLOR;
  };

  onMouseOut = event => {
    event.target.style.backgroundColor = Constants.ORANGE_COLOR;
  };

  render() {
    return (
      <div style={this.props.style}>
        <button
          style={btnStyle}
          onClick={this.props.onClick}
          onMouseEnter={event => this.onMouseOver(event)}
          onMouseOut={event => this.onMouseOut(event)}
        >
          {this.props.title}
        </button>
      </div>
    );
  }
}

ExploreButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
};

const btnStyle = {
  height: "30px",
  width: "100px",
  background: Constants.ORANGE_COLOR,
  border: "none",
  color: "#fff",
	cursor: "pointer",
	fontSize: "12px"
};

export default ExploreButton;
