import React, { Component } from "react";
import Logo from './BeerMe_Logo.png'; // Tell Webpack this JS file uses this image
import Header from "./Layout/Header";

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <img src = {Logo} alt = "Logo"/>
      </div>
    );
  }
}

export default Home;
