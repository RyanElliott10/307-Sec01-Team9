import React, { Component } from "react";

import NetClient from "../Utils/NetClient";
import PropTypes from "prop-types";

export class Recommended extends Component {
  static propTypes = {
    mainDesc: PropTypes.string,
    photos: PropTypes.arrayOf(PropTypes.string),
    recBeers: PropTypes.arrayOf(PropTypes.object),
    recDesc: PropTypes.arrayOf(PropTypes.string)
  };

  static defaultProps = {
    mainDesc:
      "Here is our personalized recommendation for new beer styles based off people with similar tastes!"
  };

  constructor(props) {
    super(props);
    this.state = {
      mainDesc: this.props.mainDesc,
      photos: this.props.photos,
      recBeers: this.props.recBeers,
      recDesc: this.props.recDesc
    };
  }

  componentDidMount() {
    // GET for beer images
    if (!this.props.photos) {
      NetClient.get("https://jsonplaceholder.typicode.com/photos/").then(
        res => {
          const pics = res.slice(0, 5).map(data => data.thumbnailUrl);
          this.setState({
            photos: pics,
            loading: false,
            error: null
          });
        }
      );
    }

    // GET for beer names
    if (!this.props.recBeers) {
      NetClient.get("http://jsonplaceholder.typicode.com/todos").then(data => {
        this.setState({
          recBeers: data.slice(0, 5)
        });
        localStorage.setItem("appState", JSON.stringify(data.slice(0, 5)));
      });
    }

    // GET for beer descriptions
    if (!this.props.recDesc) {
      NetClient.get("http://jsonplaceholder.typicode.com/todos").then(data => {
        console.log("YOTE:", data.slice(20, 30));
        this.setState({
          recDesc: data.slice(20, 30)
        });
        localStorage.setItem("appState", JSON.stringify(data.slice(20, 30)));
      });
    }
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
        <h5>{this.props.mainDesc}</h5>
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
