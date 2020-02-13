import React, { Component } from "react";
import ExploreButton from "./ExploreButton";

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
        <h4 style={descStyle}>
          Use our unique beer exploration tool to find new and interesting beers
          for you!
        </h4>
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
        <h2 style={{ backgroundColor: "#ff0" }}>Preferred Notes</h2>
        <h4 style={{ backgroundColor: "#ff0" }}>
          This is where the explanation of what a note is in beer lives.
        </h4>
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
      <div style={{ flex: 1, flexDirection: "column", width: "50%" }}>
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
      <div key={data.id} style={{ margin: "10px", backgroundColor: "clear" }}>
        <input
          type="checkbox"
          onClick={this._onCheckboxClick.bind(this, data.id)}
        />
        {data.title.charAt(0).toUpperCase() + data.title.slice(1)}
      </div>
    );
  }

  _renderProgressionButtons() {
    return (
      <div style={btnsStyle}>
        <ExploreButton
          style={{ paddingTop: "10px" }}
          onClick={this.onPreviousClick}
          title={"< Previous"}
        />
        <ExploreButton
          style={{ paddingTop: "10px" }}
          onClick={this.onNextClick}
          title={"Next >"}
        />
      </div>
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
