import React, { Component } from 'react'
import StarRatings from 'react-star-ratings';
import Photo from "../img/BOTD_photo.png";

export default class Rate extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    changeRating( newRating, name ) {
      this.setState({
        rating: newRating
      });
    }
   
    render() {
      // rating = 2;
      return (
        <div style={{display: "flex",  marginTop: "60px", flexDirection: "column", alignItems: "center"}}>
          <h1>
            Corona
          </h1>
          <div style={{marginTop: "50px", alignItems: "center"}}>
          <h5>
              Rate this beer so we know what you like!
          </h5>
            <StarRatings
              rating={this.state.rating}
              starRatedColor="blue"
              starHoverColor="grey"
              changeRating={this.changeRating}
              numberOfStars={5}
              name='rating'
              starSpacing="15px"
            />
          </div>
        </div>
      );
    }
}


class Bar extends Component {
    render() {
      // aggregateRating = 2.35;
      return (
        <StarRatings
          rating={2.403}
          starDimension="40px"
          starSpacing="15px"
        />
      );
    }
  }