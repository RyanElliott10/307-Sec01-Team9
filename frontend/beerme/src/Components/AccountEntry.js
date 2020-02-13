import React, { Component } from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";

export class AccountEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  validateForm = () => {
    return this.state.email.length > 0 && this.state.password.length > 0;
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log(this.state);
  };

  render() {
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <text>Email</text>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={e =>
                this.setState({
                  email: e.target.value
                })
              }
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <text>Password</text>
            <FormControl
              value={this.state.password}
              onChange={e =>
                this.setState({
                  password: e.target.value
                })
              }
              type="password"
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Login
          </Button>
        </form>
      </div>
    );
  }
}

export default AccountEntry;
