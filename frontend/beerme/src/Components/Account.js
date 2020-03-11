import React, { Component } from "react";
import { Button, Form, Col } from "react-bootstrap";
import Select from "react-select";
import { Redirect } from "react-router-dom";

import NetClient from "../Utils/NetClient";
import UserController from "../Controllers/UserController";

// FOR POST:
//  BeerName, StyleId

export class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addBeerData: {
        name: "",
        styles: "",
        styleClicked: false
      }
    };
  }

  componentDidMount() {
    NetClient.get("https://localhost:44300/api/BeerStyles").then(data => {
      const styles = data.map(d => {
        return {
          value: d.Id,
          label: d.Style
        };
      });
      
      this.setState({
        allStyles: styles
      });
    });
  }

  _validateAddBeerForm() {
    return (
      this.state.addBeerData.name.length > 0 &&
      this.state.addBeerData.styles.length > 0
    );
  }

  _handleAddBeerSubmit = async event => {
    event.preventDefault();
    UserController.addBeer(this.state.addBeerData);
  };

  _renderControl(type, value, isDisabled, onChange = () => {}) {
    return (
      <Form.Control
        disabled={isDisabled}
        type={type}
        placeholder={value}
        onChange={onChange}
      />
    );
  }

  _renderBusinessName() {
    if (UserController.isBusiness) {
      return <h2>{UserController.businessName}</h2>;
    }
    return null;
  }

  _renderCommon() {
    return (
      <Form.Group as={Col} controlId="formGridFirstName">
        <Form onSubmit={this._handleCreateAccountSubmit}>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridFirstName">
              <Form.Label>First Name</Form.Label>
              {this._renderControl("name", UserController.firstName, true)}
            </Form.Group>
            <Form.Group as={Col} controlId="formGridLastName">
              <Form.Label>Last Name</Form.Label>
              {this._renderControl("name", UserController.lastName, true)}
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email Address</Form.Label>
              {this._renderControl("email", UserController.email, true)}
            </Form.Group>
          </Form.Row>
        </Form>
      </Form.Group>
    );
  }

  _renderAddBeer() {
    if (!UserController.isBusiness) {
      return null;
    }

    // TO BE DELETED
    const scaryAnimals = [
      { label: "Alligators", value: 1 },
      { label: "Crocodiles", value: 2 },
      { label: "Sharks", value: 3 },
      { label: "Small crocodiles", value: 4 },
      { label: "Smallest crocodiles", value: 5 },
      { label: "Snakes", value: 6 }
    ];

    return (
      <React.Fragment>
        <Form as={Col}>
          <h2>Add a Beer!</h2>
          <hr></hr>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridBeerName">
              <Form.Label>Name of Beer</Form.Label>
              {this._renderControl("name", "Corona", false, e => {
                const newBeerData = this.state.addBeerData;
                newBeerData.name = e.target.value;
                this.setState({
                  addBeerData: newBeerData
                });
              })}
            </Form.Group>
          </Form.Row>
        </Form>
        <div style={{ marginLeft: "15px", marginRight: "15px" }}>
          <Form>
            <Form.Label>Style</Form.Label>
          </Form>
          <Select options={this.state.allStyles} />
          <hr />
          <Button
            type="submit"
            disabled={!this._validateAddBeerForm()}
            onClick={this._handleAddBeerSubmit}
          >
            Add Beer
          </Button>
        </div>
      </React.Fragment>
    );
  }

  render() {
    if (UserController.getCurrentUser()) {
      return (
        <div className="Login" style={broadStyle}>
          <Form>
            {this._renderBusinessName()}
            {this._renderCommon()}
            {this._renderAddBeer()}
          </Form>
        </div>
      );
    }
    return <Redirect to="/account-entry" />;
  }
}

const broadStyle = {
  paddingTop: "50px",
  marginLeft: "100px",
  marginRight: "100px",
  alignItems: "center",
  justifyContent: "center"
};

export default Account;
