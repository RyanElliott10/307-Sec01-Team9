import React, { Component } from "react";
import NetClient from "../Utils/NetClient";

export class Recommended extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    NetClient.get(`https://jsonplaceholder.typicode.com/photos/`)
    .then(res => {
      const pics = res.slice(0, 5).map(data => data.thumbnailUrl);
      this.setState({
        photos: pics,
        loading: false,
        error: null
      });
    })

    NetClient.get("http://jsonplaceholder.typicode.com/todos")
    .then(data => {
      this.setState({
         recBeers: data.slice(0, 10)
      });
      localStorage.setItem("appState", JSON.stringify(data.slice(0, 10)));
    });
  }


  renderPhotos() {
    if (this.state.photos === null) {
      return null;
    }
    return (
      <div style={styles.inColumnStyle}>
        {this.state.photos.map(image => (  
          <img style={styles.inColumnStyle} src= {image}/>
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
    )  
}

  

  render() {
    return (
      <div style = {styles.inColStyle}>
        <h1>Recommended For You</h1>
        <h5>Here is our personalized recommendation for new beer styles based off people with similar tastes!</h5>
        <div style = {styles.inRowStyle}>
          {this.state.photos ? this.renderPhotos() : null}
          {this.state.topTen ? this.renderRecBeers() : null}
        </div>
      </div>
    );
  }
}
const styles = {
  inColStyle: {
    display: "flex",
    flexDirection: "column",
    marginLeft: "200px",
  },
  inRowStyle: {
    display: "flex",
    flexDirection: "row",
    marginLeft: "200px",
  }
}

export default Recommended;
