import React, { Component } from 'react'
import StarRatings from 'react-star-ratings';
import Photo from "../img/BOTD_photo.png";
import * as Constants from "..//Utils/Constants";
import { Form } from "react-bootstrap";
import { Redirect, Link } from "react-router-dom";

import UserController from "../Controllers/UserController";
import NetClient from '../Utils/NetClient';

export default class Rate extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
      NetClient.get(`https://localhost:44300/api/beerratings/${UserController.currBeerId}`).then(data => {
        console.log(data);
        this.setState({
          currentBeerRating: data
        })
      });
    }

    changeRating = (newRating, name ) => {
      this.setState({
        rating: newRating
      });

      const rateData = {
        UserId: UserController.userId,
        BeerId: UserController.currBeerId,
        Rating: newRating
      };

      NetClient.post("https://localhost:44300/api/beerratings", rateData).then(data => console.log(data));
    }

    renderBody() {
      return(
        <div style={styles.inColStyle}>
            <div style={styles.inRowStyle}>
              <img
                src={Photo}
                alt="Photo"
                style={{ width: 110, height: 180, marginRight: "20px" }}
              />
              <div style={styles.inBodyStyle}>    
                <h5>
                  {`Style: ${UserController.currStyle}`}
                </h5>
                <h5>
                  {`Alcohol Per Volume: ${UserController.currABV}`}
                </h5>
                <h5>
                  {`International Bittering Unit: ${UserController.currIBU}`}
                </h5>
              </div>   
            </div>
          </div>
      )
    }

    renderStars() {
      if (!UserController.isLoggedIn) {
        return(
          <Form style= {{alignItems: "center", justifyContent: "center"}}>
            <Form.Row>
            <Form.Label>{"In order to rate this beer, please"}</Form.Label>
              <Link
                to="/account-entry"
                style={{ color: "blue", marginLeft: "5px" }}
              >
                create an account.
              </Link>
            </Form.Row>
          </Form>
        )
      }
      else return (
        <div style={styles.inColStyle}>
          <h5>
            Rate this beer!
          </h5>
          <StarRatings
            rating={this.state.rating}
            starRatedColor= {Constants.ORANGE_COLOR}
            starHoverColor="grey"
            changeRating={this.changeRating}
            numberOfStars={5}
            name='rating'
            starSpacing="15px"
          />
        </div>
      )
    }

   
    render() {
      // rating = 2;
      return (
        <div style={styles.inTitleStyle}>
          <h1>
            {UserController.currBeer}
          </h1>
          <h5 style={{alignItems: "right"}}>
            {`Average Rating: ${this.state.currentBeerRating ? this.state.currentBeerRating.toFixed(2) : "Not yet rated"}`}
          </h5>
          {this.renderBody()}
          {this.renderStars()}
          
        </div>
      );
    }
}

const styles = {
  inColStyle: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    marginRight: "30px", 
    alignItems: "center"
  },
  inBodyStyle: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    marginLeft: "30px", 
    marginTop: "60px",
    marginBottom: "90px",
    alignItems: "left"   
  },
  inTitleStyle: {
    display: "flex",
    flexDirection: "column",
    marginLeft: "200px",
    marginRight: "200px", 
    marginBottom: "100px"
  },
  inRowStyle: {
    display: "flex",
    flexDirection: "row",
    marginTop: "50px"
  }
};

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