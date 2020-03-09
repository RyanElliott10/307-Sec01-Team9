import React, { Component } from "react";
import { Form } from "react-bootstrap";

import { Redirect, Link } from "react-router-dom";
import Lock from "../img/lock.png";

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
            <img
              src={Lock}
              style={{
                width: "300px",
                height: "300px",
                marginTop: "50px",
                marginBottom: "30px",
                marginLeft: "50px",
                alignItems: "center"
              }}
              alt="Lock"
            />
          </Form.Row>
          <Form.Row>
            <Form.Label>{"In order to view recommended, please"}</Form.Label>
            <Link
              to="/account-entry"
              style={{ color: "blue", marginLeft: "5px" }}
            >
              create or sign into an account.
            </Link>
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
