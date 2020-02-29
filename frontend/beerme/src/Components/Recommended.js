import React, { Component } from "react";
import NetClient from "../Utils/NetClient";

export class Recommended extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    NetClient.get(`https://jsonplaceholder.typicode.com/photos/`).then(res => {
      const pics = res.slice(0, 10).map(data => data.thumbnailUrl);
      this.setState({
        photos: pics,
        loading: false,
        error: null
      });
    });

    NetClient.get("http://jsonplaceholder.typicode.com/todos").then(data => {
      this.setState({
        recBeers: data.slice(0, 10)
      });
      localStorage.setItem("appState", JSON.stringify(data.slice(0, 10)));
    });

    NetClient.get("http://jsonplaceholder.typicode.com/todos").then(data => {
      this.setState({
        recDesc: data.slice(20, 30)
      });
      localStorage.setItem("appState", JSON.stringify(data.slice(0, 10)));
    });
  }

  renderPhotos() {
    if (this.state.photos === null) {
      return null;
    }
    return (
      <div style={styles.inColStyle}>
        {this.state.photos.map(image => (
          <img src={image} key={image} />
        ))}
      </div>
    );
  }

  renderRecBeers() {
    return (
      <div style={styles.inColStyle}>
        {this.state.recBeers.map(beer => (
          <p key={beer.id}>{beer.title}</p>
        ))}
      </div>
    );
  }

  renderDescriptions() {
    return (
      <div style={styles.inColStyle}>
        {this.state.recDesc.map(beer => (
          <p key={beer.id}>{beer.title}</p>
        ))}
      </div>
    );
  }

  render() {
    return (
      <div style={styles.inTitleStyle}>
        <h1>Recommended For You</h1>
        <h5>
          Here is our personalized recommendation for new beer styles based off
          people with similar tastes!
        </h5>
        <div style={styles.inRowStyle}>
          {this.state.photos ? this.renderPhotos() : null}
          {this.state.recBeers ? this.renderRecBeers() : null}
          {this.state.recDesc ? this.renderDescriptions() : null}
        </div>
      </div>
    );
  }
}
const styles = {
  inColStyle: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    marginRight: "30px"
  },
  inTitleStyle: {
    display: "flex",
    flexDirection: "column",
    marginLeft: "200px",
    marginRight: "200px"
  },
  inRowStyle: {
    display: "flex",
    flexDirection: "row",
    marginTop: "50px"
  }
};

export default Recommended;
