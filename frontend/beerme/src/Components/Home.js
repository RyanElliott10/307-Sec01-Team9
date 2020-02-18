import React, { Component } from "react";
<<<<<<< HEAD
import Logo from './BeerMe_Logo.png'; // Tell Webpack this JS file uses this image
import BOTD_Photo from './BOTD_photo.png';
import Separator from './Sep_Img.png';
import Header from "./Layout/Header";
=======
import BOTD_Photo from "./BOTD_photo.png";
import Separator from "./Sep_Img.png";
import Logo from "./BeerMe_Logo.png";
import NetClient from "../Utils/NetClient";
>>>>>>> 181d335381dad32423b7e7978b15afe37f5fa38a

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    NetClient.get("http://jsonplaceholder.typicode.com/todos").then(data => {
      this.setState({ topTen: data.slice(0, 10) });
      localStorage.setItem("appState", JSON.stringify(data.slice(0, 10)));
    });
  }

  renderBody() {
    return (
      <div style={styles.inRowStyle}>
        {this.renderBOTD()}
        <img src={Separator} alt="Separator" />
        <div style={styles.inColumnStyle}>
          <h2>Top Ten Beer Styles</h2>
          {this.state.topTen.map(beer => (
            <h4 key={beer.id}>{beer.title}</h4>
          ))}
        </div>
      </div>
    );
  }

  renderBOTD() {
    return (
      <div style={styles.inRowStyle}>
        <img src={BOTD_Photo} alt="BOTD_Photo" />
        <div style={styles.inColumnStyle}>
          <h2>Beer Of The Day</h2>
          <p>This is where the Beer of The Day explanation lives.</p>
          <p>More information about the Beer of The Day here.</p>
          <p>And we continue to talk about the Beer of the Day.</p>
          <p>Final thoughts about the beer. Wow, what a great beer!</p>
        </div>
      </div>
    );
  }

  renderLogo() {
    return (
      <div style={styles.logoStyle}>
        <img src={Logo} alt="Logo" />
      </div>
    );
  }

  render() {
    return (
      <div>
<<<<<<< HEAD
        <img src = {Logo} alt = "Logo"/>
        <div style={{ marginLeft: "200px", marginRight: "200px", marginTop: "45px", alignContent: "center"}}>
=======
        <div
          style={{
            marginLeft: "200px",
            marginRight: "200px",
            marginTop: "45px",
            alignContent: "center"
          }}
        >
>>>>>>> 181d335381dad32423b7e7978b15afe37f5fa38a
          {this.renderLogo()}
          {this.state.topTen ? this.renderBody() : null}
        </div>
      </div>
    );
  }
}

const styles = {
  logoStyle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  inRowStyle: {
    marginRight: "20px",
    marginLeft: "20px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  inColumnStyle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
};

export default Home;
