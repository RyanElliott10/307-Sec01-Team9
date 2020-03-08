import React, { Component } from "react";
import { Button, ButtonToolbar, Form, Col } from "react-bootstrap";

import LockSVG from "../img/svg/LockSVG";
import { Redirect } from "react-router-dom";

export class LockedRecommended extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _createAccount = event => {
    event.preventDefault();
    console.log("_createAccount");
    this.setState({
      redirect: true
    });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/account-entry" />;
    }
    return (
      <div style={styles.mainContainer}>
        <Form style={styles.mainForm} onSubmit={this._createAccount}>
          <Form.Row>
            <LockSVG
              fill="#fff"
              width={350}
              className="lock"
              style={{
                justifyContent: "center",
                justifySelf: "content",
                justifyItems: "center"
              }}
            />
          </Form.Row>
          <Form.Row>
            <Form.Label>
              In order to view recommended, please create an account.
            </Form.Label>
          </Form.Row>
          <Form.Row>
            <Button variant="primary" type="submit">
              Create An Account
            </Button>
          </Form.Row>
        </Form>
      </div>
    );
  }
}

const styles = {
  mainContainer: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgb(244, 244, 244)"
  },

  mainForm: {
    justifyContent: "center"
  }
};

export default LockedRecommended;
