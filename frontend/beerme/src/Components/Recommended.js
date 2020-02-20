import React, { Component } from "react";
import NetClient from "../Utils/NetClient";

export class Recommended extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    NetClient.get("http://jsonplaceholder.typicode.com/photos").then(data => {
      this.setState({ photos : data.slice(0, 10) });
      localStorage.setItem("appState", data.slice(0, 10));
    });
  }

  renderBody() {
    return (
      <div style={styles.inColumnStyle}>
        <h2>Recommendations:</h2>
        {this.state.photos.map(beer => (
          <p key={beer.id}>{beer.title}</p>
        ))}
      </div>
    );
  }

  render() {
    return (
      <div style = {styles.inColStyle}>
        <h1>Recommended For You</h1>
        <h5>Here is our personalized recommendation for new beer styles based off people with similar tastes!</h5>
        {this.state.photos ? this.renderBody() : null}
      </div>
    );
  }
}
const styles = {
  inColStyle: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    marginLeft: "200px",
  }
}

export default Recommended;
