import React, { Component } from 'react'
import StarRatings from './react-star-ratings';
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
          <StarRatings
            rating={this.state.rating}
            starRatedColor="blue"
            changeRating={this.changeRating}
            numberOfStars={6}
            name='rating'
          />
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