import React, { Component } from "react";
import { Button, ButtonToolbar, Form, Col } from "react-bootstrap";
import MainController from "../Controllers/UserController";

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

  _validateAddBeerForm() {
    return (
      this.state.addBeerData.name.length > 0 &&
      this.state.addBeerData.styles.length > 0 &&
      this.state.addBeerData.color.length > 0
    );
  }

  _handleAddBeerSubmit = async event => {
    event.preventDefault();
    console.log("STATE:", this.state);
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
      <form onSubmit={this._handleAddBeerSubmit}>
        <Form onSubmit={this._handleAddBeerSubmit}>
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
            <Form.Group as={Col} controlId="formGridBeerStyle">
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
            <Form.Group as={Col} controlId="formGridBeerColor">
              <Form.Label>Color</Form.Label>
              {this._renderControl("name", "Dark", false, e => {
                const newBeerData = this.state.addBeerData;
                newBeerData.color = e.target.value;
                this.setState({
                  addBeerData: newBeerData
                });
              })}
            </Form.Group>
          </Form.Row>
          <ButtonToolbar style={{ justifyContent: "space-between" }}>
            <Button
              type="submit"
              onSubmit={this._handleAddBeerSubmit}
              disabled={!this._validateAddBeerForm()}
            >
              Add Beer
            </Button>
          </ButtonToolbar>
        </Form>
      </form>
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
