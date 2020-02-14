import React, { Component } from "react";
import { Button, ButtonToolbar, Form, Col } from "react-bootstrap";

export class AccountEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isCreateAccount: false
    };
    this.input = null;
  }

  validateForm = () => {
    return this.state.email.length > 0 && this.state.password.length > 0;
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log(this.state);
  };

  _renderCreateAccount() {
    return (
      <Form>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridName">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="name" placeholder="Mark" />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="name" placeholder="Johnson" />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
        </Form.Row>

        <ButtonToolbar style={{justifyContent: "space-between"}}>
          <Button variant="primary" type="submit">
            Submit
          </Button>
          <Button variant="secondary" type="submit" onClick={() => this.setState({isCreateAccount: false})}>
            Already have an account? Log in
          </Button>
        </ButtonToolbar>
      </Form>
    );
  }

  _renderSignIn() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Form.Group controlId="formGroupEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={e =>
              this.setState({
                email: e.target.value
              })
            }
          />
        </Form.Group>
        <Form.Group controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={e =>
              this.setState({
                password: e.target.value
              })
            }
          />
        </Form.Group>
        <ButtonToolbar style={{justifyContent: "space-between"}}>
          <Button disabled={!this.validateForm()} type="submit">
            Login
          </Button>
          <Button variant="secondary" type="submit" onClick={() => this.setState({isCreateAccount: true})}>
            Don't have an account? Create one
          </Button>
        </ButtonToolbar>
      </form>
    );
  }

  _renderBody() {
    if (this.state.isCreateAccount) {
      return this._renderCreateAccount();
    }
    return this._renderSignIn();
  }

  render() {
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
