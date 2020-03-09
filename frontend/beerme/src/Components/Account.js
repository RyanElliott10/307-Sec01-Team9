import React, { Component } from "react";
import {
  Button,
  Form,
  Col,
  DropdownButton,
  ButtonToolbar,
  Dropdown
} from "react-bootstrap";

import UserController from "../Controllers/UserController";

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

  _renderDropdown(title, options) {
    return (
      <ButtonToolbar>
        <DropdownButton
          drop={"down"}
          variant="secondary"
          title={title}
          id={`${title}-selector`}
          key={`${title}-selector`}
        >
          {options.map(title => (
            <Dropdown.Item eventKey="title">`${title}`</Dropdown.Item>
          ))}
        </DropdownButton>
      </ButtonToolbar>
    );
  }

  _renderAddBeer() {
    if (!UserController.isBusiness) {
      return null;
    }

    return (
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
        <Button
          type="submit"
          disabled={!this._validateAddBeerForm()}
          onClick={this._handleAddBeerSubmit}
        >
          Add Beer
        </Button>
      </Form>
    );
  }

  render() {
    return (
      <div className="Login" style={broadStyle}>
        <Form>
          {this._renderCommon()}
          {this._renderAddBeer()}
        </Form>
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
