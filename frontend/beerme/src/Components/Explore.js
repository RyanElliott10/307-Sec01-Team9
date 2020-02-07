import React, { Component } from "react";
import ExploreButton from "./ExploreButton";
import PropTypes from "prop-types";

export class Explore extends Component {
  onPreviousClick = () => {
    console.log("Previous");
	};
	
	_renderHeader() {
		
	}

  render() {
    return (
      <div>
				{this._renderHeader()}
        <h1>Explore</h1>
				<ExploreButton onClick={this.onPreviousClick} title={"<-- Previous"} />
      </div>
    );
  }
}

// Explore.PropTypes = {

// };

export default Explore;
