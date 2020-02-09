import React, { Component } from "react";
import PropTypes from "prop-types";
import * as Constants from "../Utils/Constants";

export class ExploreButton extends Component {
  render() {
    return (
      <div style={this.props.style}>
        <button style={btnStyle} onClick={this.props.onClick}>
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
  color: "#fff"
};

export default ExploreButton;
