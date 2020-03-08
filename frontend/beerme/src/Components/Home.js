import React, { Component } from "react";
import BOTD_Photo from "../img/BOTD_photo.png";
import Logo from "../img/BeerMe_Logo.png";
import NetClient from "../Utils/NetClient";
import Separator from "../img/Sep_Img.png";
import ReactSearchBox from "react-search-box";
import { Route } from 'react-router-dom';

import UserController from "../Controllers/UserController";

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // GET for Top Ten beers
    NetClient.get("http://jsonplaceholder.typicode.com/todos").then(data => {
      this.setState({ topTen: data.slice(0, 10) });
      localStorage.setItem("appState", JSON.stringify(data.slice(0, 10)));
    });

  }

  renderTopTen() {
    return (
      <div style={styles.inListStyle}>
        <h2>Top Ten Beer Styles</h2>
        {this.state.topTen.map(beer => (
          <p key={beer.id}>{beer.title}</p>
        ))}
      </div>
    );
  }

  renderBody() {
    return (
      <div style={styles.inRowStyle}>
        <img
          src={BOTD_Photo}
          alt="BOTD_Photo"
          style={{ width: 110, height: 180, marginRight: "20px" }}
        />
        {this.renderBOTD()}
        <img src={Separator} alt="Separator" />
        {this.renderTopTen()}
      </div>
    );
  }

  renderBOTD() {
    return (
      <div style={styles.inColumnStyle}>
        <h2>Beer Of The Day</h2>
        <p>
          Hive 56 is a dark sour ale aged with honey in an oak foudre for
          eighteen months. The beer is deep mahogany in color with aromas of
          strawberries, lemon, and tropical fruit; notes of dark chocolate,
          raspberries, and figs present themselves upon the first sip, followed
          by a lingering tartness.
        </p>
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

  data = [
    {
      key: "Corona",
      value: "Corona"
    },
    {
      key: "Modelo",
      value: "Modelo"
    },
    {
      key: "Lagunitas",
      value: "Lagunitas"
    },
    {
      key: "Blue Moon",
      value: "Blue Moon"
    },
    {
      key: "805",
      value: "805"
    }
  ];

  renderSearchBox() {
    return (
      <div
        style={{
          width: "50%",
          marginRight: "auto",
          marginLeft: "auto",
          marginBottom: "40px"
        }}
      >
        
        <Route render={({ history}) => (
          <ReactSearchBox
            placeholder="Search"
            data={this.data
            onSelect={(record) => {
              console.log(record)
              UserController.currBeer = record.value
              history.push('/search-result')
            }}
          />
        )} />
      </div>
    );
  }

  render() {
    return (
      <div>
        <div
          style={{
            marginLeft: "200px",
            marginRight: "200px",
            marginTop: "45px",
            alignContent: "center"
          }}
        >
          {this.renderLogo()}
          {this.renderSearchBox()}
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
    marginRight: "70px",
    marginLeft: "70px",
    display: "flex",
    flexDirection: "row",
    flex: 1,
    alignItems: "top"
  },
  inColumnStyle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flex: 1
  },
  inListStyle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "right"
  }
};

export default Home;
