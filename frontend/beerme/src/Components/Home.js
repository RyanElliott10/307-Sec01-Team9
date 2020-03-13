import React, { Component } from "react";
import { Route } from "react-router-dom";
import ReactSearchBox from "react-search-box";

import BOTD_Photo from "../img/BOTD_photo.png";
import Logo from "../img/BeerMe_Logo.png";
import Separator from "../img/Sep_Img.png";

import NetClient from "../Utils/NetClient";
import UserController from "../Controllers/UserController";

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

    NetClient.get("https://localhost:44300/api/beers").then(data => {
      UserController.cachedBeers = data;
      const searchData = data.map(d => {
        return {
          key: d.BeerName,
          value: d.BeerName,
          id: d.Id,
          style: d.Style,
          abv: d.ABV,
          ibu: d.IBU
        };
      });
      this.setState({
        allBeers: searchData
      });
    });
  }

  renderTopTen() {
    return (
      <div style={styles.inListStyle}>
        <h2>Top Ten Beer Styles</h2>
        <p>1. Hive 56</p>
        <p>2. Raspberry Eisbok</p>
        <p>3. Blanc de Blancs</p>
        <p>4. Hoponius Union</p>
        <p>5. Nugget Nectar</p>
        <p>6. Sprang</p>
        <p>7. Zenne Y Frontera</p>
        <p>8. Citra Bitter Monk</p>
        <p>9. Celebrator</p>
        <p>10. Bracia</p>
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
        <Route
          render={({ history }) => (
            <ReactSearchBox
              placeholder="Search"
              id={"react-search-box"}
              data={this.state.allBeers}
              onSelect={record => {
                UserController.currBeer = record.value;
                UserController.currStyle = record.style;
                UserController.currABV = record.abv;
                UserController.currIBU = record.ibu;
                UserController.currBeerId = record.id;
                history.push("/search-result");
              }}
            />
          )}
        />
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
          {this.renderBody()}
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
