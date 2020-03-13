import React, { Component } from "react";
import { Link } from "react-router-dom";

import LockedRecommended from "./LockedRecommended";
import NetClient from "../Utils/NetClient";
import PropTypes from "prop-types";
import UserController from "../Controllers/UserController";
import RecImages from "../data/RecImages";

export class Recommended extends Component {
  static propTypes = {
    mainDesc: PropTypes.string,
    photos: PropTypes.arrayOf(PropTypes.string),
    recBeers: PropTypes.arrayOf(PropTypes.object),
    fromExplore: PropTypes.bool
  };

  static defaultProps = {
    mainDesc: "Here is our personalized recommendation for new beer styles!"
  };

  constructor(props) {
    super(props);
    this.state = {
      mainDesc: this.props.mainDesc,
      photos: this.props.photos,
      recBeers: this.props.recBeers
    };
  }

  async componentDidMount() {
    if (!this.props.photos) {
      NetClient.get("https://jsonplaceholder.typicode.com/photos/").then(
        res => {
          // const pics = res.slice(0, 5).map(data => data.thumbnailUrl);
          const pics = RecImages.getImages().slice(0, 5);
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
  }

  renderPhotos() {
    if (this.state.photos === null) {
      return null;
    }
    return (
      <div>
        {this.state.photos.map(image => (
          <img src={image} key={image} style={styles.imgStyle} />
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
            id={"clickable-beer"}
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

  _renderBody() {
    if (this.props.fromExplore) {
      return (
        <div style={styles.inRowStyle}>
          {this.state.photos ? this.renderPhotos() : null}
          {this.state.recBeers ? this.renderRecBeers() : null}
        </div>
      );
    } else if (this.state.recBeers && this.state.recBeers.length == 0 || this.props.noRecs) {
      return (
        <div style={styles.inRowStyle}>
          You must rate at least 1 beer before we are able to recommend you any!
        </div>
      );
    } else if (UserController.getCurrentUser()) {
      return (
        <div style={styles.inRowStyle}>
          {this.state.photos ? this.renderPhotos() : null}
          {this.state.recBeers ? this.renderRecBeers() : null}
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
    paddingBottom: "20px",
    marginRight: "40px",
    marginLeft: "100px"
  },
  imgStyle: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    paddingBottom: "20px",
    marginRight: "40px",
    marginLeft: "100px",
    width: "110px",
    height: "180px"
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
