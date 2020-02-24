import React, { Component } from "react";
import BOTD_Photo from "../img/BOTD_photo.png";
import Logo from "../img/BeerMe_Logo.png";
import NetClient from "../Utils/NetClient";
import Separator from "../img/Sep_Img.png";
import ReactSearchBox from 'react-search-box'

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
        <div style={styles.inListStyle}>
          <h2>Top Ten Beer Styles</h2>
          {this.state.topTen.map(beer => (
            <p key={beer.id}>{beer.title}</p>
          ))}
        </div>
      </div>
    );
  }

  renderBOTD() {
    return (
      <div style={styles.inRowStyle}>
        <img src={BOTD_Photo} alt="BOTD_Photo" style={{width: 150, height:200}}/>
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

  data = [
    {
      key: 'Corona',
      value: 'Corona',
    },
    {
      key: 'Modelo',
      value: 'Modelo',
    },
    {
      key: 'Lagunitas',
      value: 'Lagunitas',
    },
    {
      key: 'Blue Moon',
      value: 'Blue Moon',
    },
    {
      key: '805',
      value: '805',
    },
  ]

  renderSearchBox() {
    return (
      <div style= {{width: "50%", marginRight: "auto", marginLeft: "auto", marginBottom: "40px"}}>
        <ReactSearchBox
          placeholder="Search"
          data={this.data}
          callback={record => console.log(record)}
        />
      </div>
    )
  }

  render() {
    return (
      <div>
        <div
          style={{
            marginLeft: "200px",
            marginRight: "200px",
            marginTop: "45px",
            alignContent: "center",
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
    alignItems: "center",
  },
  inRowStyle: {
    marginRight: "20px",
    marginLeft: "20px",
    display: "flex",
    flexDirection: "row",
    alignItems: "top",
  },
  inColumnStyle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  inListStyle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "right",
  }
};

export default Home;
