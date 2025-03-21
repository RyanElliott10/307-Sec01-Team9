import React, { Component } from "react";
import { Button, Form, Col } from "react-bootstrap";
import Select from "react-select";
import { Redirect } from "react-router-dom";

import NetClient from "../Utils/NetClient";
import UserController from "../Controllers/UserController";

export class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addBeerName: "",
      addBeerData: {
        label: "",
        value: null
      },
      removeBeerData: {
        label: "",
        value: null
      }
    };
  }

  componentDidMount() {
    this.setState({
      allStyles: [{ value: 0, label: "test" }]
    });

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

    this.fetchRemoveBeers();
  }

  fetchRemoveBeers() {
    NetClient.get(
      `https://localhost:44300/api/BeersByBusiness/${UserController.userId}`
    ).then(data => {
      const businessBeers = data.map(d => {
        return {
          value: d.Id,
          label: d.BeerName
        };
      });

      this.setState({
        businessBeers: businessBeers
      });
    });
  }

  _validateAddBeerForm() {
    return (
      this.state.addBeerData.label.length > 0 &&
      this.state.addBeerData.value !== null &&
      this.state.addBeerName.length > 0
    );
  }

  _validateRemoveBeer() {
    return true;
  }

  _handleAddBeerSubmit = async event => {
    event.preventDefault();
    NetClient.post("https://localhost:44300/api/Beers", {
      BeerName: this.state.addBeerName,
      StyleId: this.addBeerValue,
      UserId: UserController.userId
    });

    this.setState(
      {
        addBeerName: "",
        addBeerData: {
          label: "",
          value: null
        }
      },
      () => (this.addBeerFormRef.value = this.state.addBeerName)
    );

    setTimeout(() => this.fetchRemoveBeers(), 400);
  };

  _handleRemoveBeerSubmit = async event => {
    event.preventDefault();
    if (this.state.removeBeerData) {
      NetClient.delete(
        `https://localhost:44300/api/beers/${this.state.removeBeerData.value}`
      );

      setTimeout(() => this.fetchRemoveBeers(), 400);
      this.removeBeerForm.value = null;
      this.setState({
        removeBeerData: null
      });
    }
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

  _renderButton(variant, disabled, onClick, text, id) {
    return (
      <Button
        type="submit"
        variant={variant}
        disabled={disabled}
        onClick={onClick}
        id={id}
      >
        {text}
      </Button>
    );
  }

  _renderAddBeerNameField() {
    return (
      <>
        <Form.Label>Name of Beer</Form.Label>
        <Form.Control
          ref={form => (this.addBeerFormRef = form)}
          disabled={false}
          type={"name"}
          placeholder={"Corona"}
          onChange={e => {
            const newName = e.target.value;
            this.setState({
              addBeerName: newName
            });
          }}
        />
      </>
    );
  }

  _renderAddBeerDropdown() {
    return (
      <>
        <Form>
          <Form.Label>Style</Form.Label>
        </Form>
        <Select
          ref={form => (this.removeBeerForm = form)}
          options={this.state.allStyles}
          value={this.state.addBeerData}
          id={"add-beer-dropdown"}
          onChange={event => {
            this.addBeerLabel = event.label;
            this.addBeerValue = event.value;

            this.setState({
              addBeerData: {
                label: event.label,
                value: event.value
              }
            });
          }}
        />
      </>
    );
  }

  _renderAddBeer() {
    return (
      <Form.Group as={Col} controlId="formGridFirstName">
        <h2>Add a Beer</h2>
        <hr />
        <Form.Row>
          <Form.Group as={Col} controlId="formGridBeerName">
            {this._renderAddBeerNameField()}
          </Form.Group>
        </Form.Row>
        {this._renderAddBeerDropdown()}
        <hr />
        <Form.Row>
          {this._renderButton(
            "primary",
            !this._validateAddBeerForm(),
            this._handleAddBeerSubmit,
            "Add Beer",
            "add-beer-button"
          )}
        </Form.Row>
      </Form.Group>
    );
  }

  _renderRemoveBeer() {
    return (
      <Form.Group as={Col} controlId="formGridLastName">
        <h2>Remove a Beer</h2>
        <hr />
        <Form.Label>Name of Beer</Form.Label>
        <Select
          options={this.state.businessBeers}
          onChange={event =>
            this.setState({
              removeBeerData: {
                name: event.label,
                value: event.value
              }
            })
          }
        />
        <hr />
        {this._renderButton(
          "danger",
          !this._validateRemoveBeer(),
          this._handleRemoveBeerSubmit,
          "Remove Beer",
          "remove-beer-button"
        )}
      </Form.Group>
    );
  }

  _renderAddRemove() {
    if (!UserController.isBusiness) {
      return null;
    }

    return (
      <Form.Group as={Col} controlId="formGridFirstName">
        <Form onSubmit={this._handleCreateAccountSubmit}>
          <Form.Row>
            {this._renderAddBeer()}
            <div />
            {this._renderRemoveBeer()}
          </Form.Row>
        </Form>
      </Form.Group>
    );
  }

  _renderLogout() {
    return (
      <Form>
        {this._renderButton(
          "danger",
          false,
          () => UserController.logout(),
          "Logout",
          "logout-button"
        )}
      </Form>
    );
  }

  render() {
    if (UserController.getCurrentUser()) {
      return (
        <div className="Login" style={broadStyle}>
          <Form>
            <div style={{justifyContent: "right", alignItems: "right", display: "flex", marginLeft: "1225px"}}>
              {this._renderLogout()}
            </div>
            <div style={{marginLeft: "15px"}}>
              {this._renderBusinessName()}
            </div>
            {this._renderCommon()}
            <div style={{marginTop:"20px"}}>
              {this._renderAddRemove()}
            </div>
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
