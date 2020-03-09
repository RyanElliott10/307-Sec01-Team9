import React, { Component } from "react";
import { Link } from "react-router-dom";

import NetClient from "../Utils/NetClient";
import PropTypes from "prop-types";
import UserController from "../Controllers/UserController";
import LockedRecommended from "./LockedRecommended";

export class Recommended extends Component {
  static propTypes = {
    mainDesc: PropTypes.string,
    photos: PropTypes.arrayOf(PropTypes.string),
    recBeers: PropTypes.arrayOf(PropTypes.object),
    recDesc: PropTypes.arrayOf(PropTypes.string)
  };

  static defaultProps = {
    mainDesc: "Here is our personalized recommendation for new beer styles!"
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

  async componentDidMount() {
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

    if (!this.props.recBeers) {
      NetClient.post(
        "https://localhost:44300/api/BeerRecommendations",
        UserController.getCurrentUserObject()
      ).then(data => {
        if (UserController.cachedBeers.length === 0) {
          NetClient.get("https://localhost:44300/api/beers").then(allBeers => {
            UserController.cachedBeers = allBeers;
            const filteredBeers = UserController.cachedBeers.filter(
              cachedBeer => data.includes(cachedBeer.Id)
            );
            this.setState({
              recBeers: filteredBeers
            });
          });
        } else {
          const filteredBeers = UserController.cachedBeers.filter(cachedBeer =>
            data.includes(cachedBeer.Id)
          );
          this.setState({
            recBeers: filteredBeers
          });
        }
      });
    }

    if (!this.props.recDesc) {
      NetClient.get("http://jsonplaceholder.typicode.com/todos").then(data => {
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
          <Link
            to="/search-result"
            onClick={() => {
              UserController.currBeer = beer.BeerName;
              UserController.currBeerId = beer.Id;
              UserController.currStyle = beer.Style;
              UserController.currABV = beer.ABV;
              UserController.currIBU = beer.IBU;
            }}
          >
            <p key={beer.BeerName}>{beer.BeerName}</p>
          </Link>
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

  _renderBody() {
    if (UserController.getCurrentUser()) {
      return (
        <div style={styles.inRowStyle}>
          {this.state.photos ? this.renderPhotos() : null}
          {this.state.recBeers ? this.renderRecBeers() : null}
          {this.state.recDesc ? this.renderDescriptions() : null}
        </div>
      );
    }

    return <LockedRecommended />;
  }

  render() {
    return (
      <div style={styles.inTitleStyle}>
        <h1>Recommended For You</h1>
        <h5>{this.props.mainDesc}</h5>
        {this._renderBody()}
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
