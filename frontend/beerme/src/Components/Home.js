import React, { Component } from "react";
import Logo from './BeerMe_Logo.png'; // Tell Webpack this JS file uses this image
import BOTD_Photo from './BOTD_photo.png';
import Separator from './Sep_Img.png';
import Header from "./Layout/Header";

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderTopTen() {
    return (
      <div style={inRowStyle}>
        {this.renderBOTD()}
        <img src = {Separator}
          alt = "Separator"
        />
        <div style={inColumnStyle}>
          <h2>
            Top Ten Beer Styles
          </h2>
          <h4>
            1. Pilsner
          </h4>
          <h4>
            2. IPA
          </h4>
          <h4>
            3. Ale
          </h4>
          <h4>
            4. Lager
          </h4>
        </div>
      </div>
    )
  }


  renderBOTD() {
    return (
      <div style={inRowStyle}>
        <img src = {BOTD_Photo}
          alt = "BOTD_Photo"
        />
        <div style={inColumnStyle}>
        <h2>
            Beer Of The Day
          </h2>
          <p>
           This is where the Beer of The Day explanation lives.
          </p>
          <p>
            More information about the Beer of The Day here.
          </p>
          <p>
            And we continue to talk about the Beer of the Day.
          </p>
          <p>
            Final thoughts about the beer. Wow, what a great beer!
          </p>
        </div>
      </div>
    )
  }

  renderLogo() {
    return (
      <div style={logoStyle}>
        <img src = {Logo}
          alt = "Logo"
        />
      </div>
    );
  }

  render() {
    return (
      <div>
        <img src = {Logo} alt = "Logo"/>
        <div style={{ marginLeft: "200px", marginRight: "200px", marginTop: "45px", alignContent: "center"}}>
          {this.renderLogo()}
          {this.renderTopTen()}
        </div>
      </div>
    );
  }
}

const logoStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center"
};

const inRowStyle = {
  marginRight: "20px",
  marginLeft: "20px",
  display: "flex",
  flexDirection: "row",
  alignItems: "center"
}

const inColumnStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center"
}

const addLineBreaks = string =>
  string.split('\n').map((text, index) => (
    <React.Fragment key={`${text}-${index}`}>
      {text}
      <br />
    </React.Fragment>
  ));

export default Home;
