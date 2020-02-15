import React, { Component } from "react";
import { Form, Button, ButtonToolbar, Row, Col } from "react-bootstrap";
import * as Constants from "../Utils/Constants";

export class Explore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slideTitle: "",
      slideDescription: "",
      checkboxDescriptions: []
    };
  }

  componentDidMount() {
    fetch("http://jsonplaceholder.typicode.com/todos")
      .then(res => res.json())
      .then(data => {
        data.forEach(element => {
          element.selected = false;
        });
        this.setState({ checkboxDescriptions: data.slice(0, 20) });
      })
      .catch(console.log);
  }

  onPreviousClick = () => {
    console.log("onPreviousClick");
  };

  onNextClick = () => {
    const selections = this.state.checkboxDescriptions.filter(data => data.selected);
    console.log(selections);
  };

  _onCheckboxClick = id => {
    this.setState({
      data: this.state.checkboxDescriptions.map(option => {
        if (option.id === id) {
          option.selected = !option.selected;
        }
        return option;
      })
    });
  };

  _renderTopBlurb() {
    return (
      <React.Fragment>
        <h1>Explore</h1>
        <h5>
          Use our unique beer exploration tool to find new and interesting beers
          for you!
        </h5>
      </React.Fragment>
    );
  }

  _renderSelectionBox() {
    return (
      <div style={selectionBoxStyle}>
        {this._renderSelBoxTopText()}
        {this._renderSelections()}
      </div>
    );
  }

  _renderSelBoxTopText() {
    return (
      <div style={selectionBoxTopTextStyle}>
        <h2>Preferred Notes</h2>
        <h6 style={{ color: "#696969" }}>
          This is where the explanation of what a note is in beer lives.
        </h6>
      </div>
    );
  }

  _renderSelections() {
    if (!this.state.checkboxDescriptions) {
      return null;
    }

    let firstHalf = this.state.checkboxDescriptions;
    let secondHalf = null;
    if (this.state.checkboxDescriptions.length > 10) {
      firstHalf = this.state.checkboxDescriptions.slice(0, 10);
      secondHalf = this.state.checkboxDescriptions.slice(10, this.state.checkboxDescriptions.length);
    }

    return (
      <div
        style={{
          flexDirection: "row",
          paddingLeft: "10px",
          paddingTop: "25px"
        }}
      >
        <Row>
          <Col>{this._renderChecks(firstHalf)}</Col>
          <Col>{secondHalf ? this._renderChecks(secondHalf) : null}</Col>
        </Row>
      </div>
    );
  }

  _renderChecks(arr) {
    return arr.map(data => this._renderChecboxOption(data));
  }

  _renderChecboxOption(data) {
    return (
      <Form key={data.id}>
        <div className="mb-3">
          <Form.Check
            custom
            id={data.id}
            label={`${data.title.charAt(0).toUpperCase() +
              data.title.slice(1)}`}
            onClick={this._onCheckboxClick.bind(this, data.id)}
          />
        </div>
      </Form>
    );
  }

  _renderProgressionButtons() {
    return (
      <ButtonToolbar style={btnsStyle}>
        <Button variant="secondary" onClick={this.onPreviousClick}>Previous</Button>
        <Button variant="secondary" style={{backgroundColor: Constants.ORANGE_COLOR, outline: "none"}} onClick={this.onNextClick}>Next</Button>
      </ButtonToolbar>
    );
  }

  render() {
    return (
      <div
        style={{
          marginLeft: "200px",
          marginRight: "200px",
          paddingBottom: "150px"
        }}
      >
        {this._renderTopBlurb()}
        {this._renderSelectionBox()}
        {this._renderProgressionButtons()}
      </div>
    );
  }
}

const selectionBoxStyle = {
  background: "#F4F4F4",
  flexDirection: "row",
  marginTop: "15px"
};

const selectionBoxTopTextStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  paddingTop: "15px"
};

const btnsStyle = {
  display: "flex",
  justifyContent: "space-between",
  paddingTop: "10px"
};

export default Explore;
