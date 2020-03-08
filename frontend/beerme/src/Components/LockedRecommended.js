import React, { Component } from "react";
import { Button, ButtonToolbar, Form, Col } from "react-bootstrap";

import LockSVG from "../img/svg/LockSVG";
import { Redirect } from "react-router-dom";
import Lock from "../img/lock.png"

import { Route } from 'react-router-dom';


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
            {/* <LockSVG
              fill="#fff"
              width={350}
              className="lock"
              style={{
                justifyContent: "center",
                justifySelf: "content",
                alignItems: "center", 
                marginTop: "80px", 
              }}
            /> */}
            <img src={Lock}
                style={{width: "300px", height: "300px", marginTop: "50px", marginBottom: "30px", marginLeft: "50px", alignItems: "center"}} alt="Lock" />
          </Form.Row>
          <Form.Row>
            <Form.Label>
              {"In order to view recommended, please"}
            </Form.Label>

            <Route render={({ history}) => (
              <span onClick ={() => {
                  console.log("to account entry")
                  history.push('/account-entry')
                }}
                style = {{color: "blue"}}
                >
                   {"create an account."}
              </span>
             )} />
          
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
