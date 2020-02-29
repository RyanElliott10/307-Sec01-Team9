import React, { Component } from "react";
import { Button, ButtonToolbar, Form, Col } from "react-bootstrap";
import MainController from "../Controllers/UserController";

// TODO: Add onAddBeerClick() that, among other things, prints the current state.

export class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addBeerData: {
        name: "",
        styles: "",
        color: ""
      }
    };
  }

  _validateLoginForm() {
    return true;
    // return (
    //   this.state.signInData.email.length > 0 &&
    //   this.state.signInData.password.length > 0
    // );
  }

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

  _renderCommon() {
    return (
      <Form.Group as={Col} controlId="formGridFirstName">
        <Form onSubmit={this._handleCreateAccountSubmit}>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridFirstName">
              <Form.Label>First Name</Form.Label>
              {this._renderControl("name", "Mark", true)}
            </Form.Group>
            <Form.Group as={Col} controlId="formGridLastName">
              <Form.Label>Last Name</Form.Label>
              {this._renderControl("name", "Johnson", true)}
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email Address</Form.Label>
              {this._renderControl("email", "Email", true)}
            </Form.Group>
          </Form.Row>
        </Form>
      </Form.Group>
    );
  }

  _renderAddBeer() {
    if (!MainController.isBusiness()) {
      return null;
    }
    return (
      <Form.Group as={Col} controlId="formGridFirstName">
        <Form onSubmit={this._handleCreateAccountSubmit}>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridFirstName">
              <Form.Label>Name of Beer</Form.Label>
              {this._renderControl("name", "Corona", false, e => {
                const newBeerData = this.state.addBeerData;
                newBeerData.name = e.target.value;
                this.setState({
                  addBeerData: newBeerData
                });
              })}
            </Form.Group>
            <Form.Group as={Col} controlId="formGridLastName">
              <Form.Label>Style(s)</Form.Label>
              {this._renderControl("name", "IPA", false, e => {
                const newBeerData = this.state.addBeerData;
                newBeerData.styles = e.target.value;
                this.setState({
                  addBeerData: newBeerData
                });
              })}
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Color</Form.Label>
              {this._renderControl("name", "Dark", false, e => {
                const newBeerData = this.state.addBeerData;
                newBeerData.colors = e.target.value;
                this.setState({
                  addBeerData: newBeerData
                });
              })}
            </Form.Group>
          </Form.Row>
          <ButtonToolbar style={{ justifyContent: "space-between" }}>
            <Button disabled={!this._validateLoginForm()} type="submit">
              Add a Beer
            </Button>
          </ButtonToolbar>
        </Form>
      </Form.Group>
    );
  }

  render() {
    return (
      <div className="Login" style={broadStyle}>
        <Form.Row>
          {this._renderCommon()}
          {this._renderAddBeer()}
        </Form.Row>
      </div>
    );
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
