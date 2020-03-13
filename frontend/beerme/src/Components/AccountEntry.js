import React, { Component } from "react";
import { Button, ButtonToolbar, Form, Col } from "react-bootstrap";
import { Redirect } from "react-router-dom";

import UserController from "../Controllers/UserController";

export class AccountEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: UserController.getCurrentUser(),
      isBusiness: false,
      createAccountData: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        businessName: ""
      },
      signInData: {
        email: "",
        password: "",
        isCreateAccount: false
      }
    };
  }

  _validateLoginForm() {
    return (
      this.state.signInData.email.length > 0 &&
      this.state.signInData.password.length > 0
    );
  }

  _validateAccountCreationForm() {
    const busVal = this.state.isBusiness
      ? this.state.createAccountData.businessName.length > 0
      : true;
    return (
      this.state.createAccountData.confirmPassword.length > 0 &&
      this.state.createAccountData.password.length > 0 &&
      this.state.createAccountData.email.length > 0 &&
      this.state.createAccountData.firstName.length > 0 &&
      this.state.createAccountData.lastName.length > 0 &&
      busVal
    );
  }

  _handleSignInSubmit = async event => {
    event.preventDefault();
    console.log(this.state);
    if (
      await UserController.login(
        this.state.signInData.email,
        this.state.signInData.password
      )
    ) {
      this.setState({
        signedIn: true
      });
    }
  };

  _handleCreateAccountSubmit = async event => {
    event.preventDefault();
    console.log(this.state);
    if (
      this.state.createAccountData.password !==
      this.state.createAccountData.confirmPassword
    ) {
      alert("Please make sure your passwords match.");
      return;
    }

    if (
      await UserController.createAccount(
        this.state.createAccountData.firstName,
        this.state.createAccountData.lastName,
        this.state.createAccountData.email,
        this.state.createAccountData.password,
        this.state.isBusiness,
        this.state.createAccountData.businessName
      )
    ) {
      this.setState({
        signedIn: true
      });
    }
  };

  _renderBusinessField() {
    return (
      <Form.Row>
        <Form.Group as={Col} controlId="formBusinessName">
          <Form.Label>Business Name</Form.Label>
          {this._renderControl("name", "BeerMe", e => {
            const newCreateAccountData = this.state.createAccountData;
            newCreateAccountData.businessName = e.target.value;
            this.setState({
              businessName: newCreateAccountData
            });
          })}
        </Form.Group>
      </Form.Row>
    );
  }

  _renderControl(type, placeholder, onChange) {
    return (
      <Form.Control type={type} placeholder={placeholder} onChange={onChange} id={"control-input"} />
    );
  }

  _renderCreateAccount() {
    return (
      <Form onSubmit={this._handleCreateAccountSubmit}>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridFirstName">
            <Form.Label>First Name</Form.Label>
            {this._renderControl("name", "Mark", e => {
              const newCreateAccountData = this.state.createAccountData;
              newCreateAccountData.firstName = e.target.value;
              this.setState({
                createAccountData: newCreateAccountData
              });
            })}
          </Form.Group>
          <Form.Group as={Col} controlId="formGridLastName">
            <Form.Label>Last Name</Form.Label>
            {this._renderControl("name", "Johnson", e => {
              const newCreateAccountData = this.state.createAccountData;
              newCreateAccountData.lastName = e.target.value;
              this.setState({
                createAccountData: newCreateAccountData
              });
            })}
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email Address</Form.Label>
            {this._renderControl("email", "Email", e => {
              const newCreateAccountData = this.state.createAccountData;
              newCreateAccountData.email = e.target.value;
              this.setState({
                createAccountData: newCreateAccountData
              });
            })}
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Password</Form.Label>
            {this._renderControl("password", "Password", e => {
              const newCreateAccountData = this.state.createAccountData;
              newCreateAccountData.password = e.target.value;
              this.setState({
                createAccountData: newCreateAccountData
              });
            })}
          </Form.Group>

          <Form.Group as={Col} controlId="formGridConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            {this._renderControl("password", "Confirm Password", e => {
              const newCreateAccountData = this.state.createAccountData;
              newCreateAccountData.confirmPassword = e.target.value;
              this.setState({
                createAccountData: newCreateAccountData
              });
            })}
          </Form.Group>
        </Form.Row>

        <Form>
          <div className="mb-3">
            <Form.Check
              custom
              id="isBusiness"
              label={"Are you a business?"}
              onClick={() =>
                this.setState({ isBusiness: !this.state.isBusiness })
              }
            />
          </div>
        </Form>

        {this.state.isBusiness ? this._renderBusinessField() : null}

        <ButtonToolbar style={{ justifyContent: "space-between" }}>
          <Button
            variant="primary"
            type="submit"
            disabled={!this._validateAccountCreationForm()}
            id={"submit-button"}
          >
            Submit
          </Button>
          <Button
            variant="secondary"
            type="submit"
            onClick={() => this.setState({ isCreateAccount: false })}
            id={"switch-to-login"}
          >
            Already have an account? Log in
          </Button>
        </ButtonToolbar>
      </Form>
    );
  }

  _renderSignIn() {
    return (
      <Form onSubmit={this._handleSignInSubmit}>
        <Form.Group controlId="formGroupEmail">
          <Form.Label>Email Address</Form.Label>
          {this._renderControl("email", "Email", e => {
            const newSignInData = this.state.signInData;
            newSignInData.email = e.target.value;
            this.setState({
              signInData: newSignInData
            });
          })}
        </Form.Group>

        <Form.Group controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          {this._renderControl("password", "Password", e => {
            const newSignInData = this.state.signInData;
            newSignInData.password = e.target.value;
            this.setState({
              signInData: newSignInData
            });
          })}
        </Form.Group>

        <ButtonToolbar style={{ justifyContent: "space-between" }}>
          <Button
            disabled={!this._validateLoginForm()}
            type="submit"
            id={"login-button"}
          >
            Login
          </Button>
          <Button
            variant="secondary"
            type="submit"
            id={"switch-to-create-account"}
            onClick={() => this.setState({ isCreateAccount: true })}
          >
            Don't have an account? Create one
          </Button>
        </ButtonToolbar>
      </Form>
    );
  }

  _renderBody() {
    if (this.state.isCreateAccount) {
      return this._renderCreateAccount();
    }
    return this._renderSignIn();
  }

  render() {
    if (this.state.signedIn) {
      return <Redirect to="/account" />;
    }
    return (
      <div className="Login" style={broadStyle}>
        {this._renderBody()}
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

export default AccountEntry;
