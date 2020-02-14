import React, { Component } from "react";
import ExploreButton from "./ExploreButton";
import { Form, Button, ButtonToolbar } from "react-bootstrap";

export class Explore extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    fetch("http://jsonplaceholder.typicode.com/todos")
      .then(res => res.json())
      .then(data => {
        data.forEach(element => {
          element.selected = false;
        });
        this.setState({ contacts: data.slice(0, 20) });
      })
      .catch(console.log);
  }

  onPreviousClick = () => {
    console.log("onPreviousClick");
  };

  onNextClick = () => {
    const selections = this.state.contacts.filter(data => data.selected);
    console.log(selections);
  };

  _onCheckboxClick = id => {
    this.setState({
      data: this.state.contacts.map(option => {
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
        <h1 style={titleStyle}>Explore</h1>
        <h5 style={descStyle}>
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
    if (!this.state.contacts) {
      return null;
    }

    let firstHalf = this.state.contacts;
    let secondHalf = null;
    if (this.state.contacts.length > 10) {
      firstHalf = this.state.contacts.slice(0, 10);
      secondHalf = this.state.contacts.slice(10, this.state.contacts.length);
    }

    return (
      <div style={{ flex: 1, flexDirection: "column", width: "50%", paddingLeft: "10px" }}>
        {this._renderChecks(firstHalf)}
        {secondHalf ? this._renderChecks(secondHalf) : null}
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
        <Button variant="primary">Previous</Button>
        <Button variant="primary">Next</Button>
      </ButtonToolbar>
      // <div style={btnsStyle}>
      //   <ExploreButton
      //     style={{ paddingTop: "10px" }}
      //     onClick={this.onPreviousClick}
      //     title={"< Previous"}
      //   />
      //   <ExploreButton
      //     style={{ paddingTop: "10px" }}
      //     onClick={this.onNextClick}
      //     title={"Next >"}
      //   />
      // </div>
    );
  }

  render() {
    return (
      <div>
        <div style={{ marginLeft: "200px", marginRight: "200px" }}>
          {this._renderTopBlurb()}
          {this._renderSelectionBox()}
          {this._renderProgressionButtons()}
        </div>
      </div>
    );
  }
}

const titleStyle = {};

const descStyle = {};

const selectionBoxStyle = {
  background: "#F4F4F4",
  flexDirection: "row"
};

const selectionBoxTopTextStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center"
};

const btnsStyle = {
  display: "flex",
  justifyContent: "space-between"
};

export default Explore;
