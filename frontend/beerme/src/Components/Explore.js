import React, { Component } from "react";
import ExploreButton from "./ExploreButton";
import Header from "./Layout/Header";

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

  _renderHeader() {
    return <Header />;
  }

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
      <div style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <h2>Preferred Notes</h2>
        <h5>This is where the explanation of what a note is in beer lives.</h5>
      </div>
    );
  }

  _renderSelections() {
    if (this.state.contacts) {
      return (
        <React.Fragment>
          {this.state.contacts.map(data => this._renderChecboxOption(data))}
        </React.Fragment>
      );
    }
    return null;
  }

  _renderChecboxOption(data) {
    return (
      <div key={data.id}>
        <input
          type="checkbox"
          onClick={this._onCheckboxClick.bind(this, data.id)}
        />
        {data.title}
      </div>
    );
  }

  _renderProgressionButtons() {
    return (
      <div style={btnsStyle}>
        <ExploreButton
          style={{ paddingTop: "10px" }}
          onClick={this.onPreviousClick}
          title={"<-- Previous"}
        />
        <ExploreButton
          style={{ paddingTop: "10px" }}
          onClick={this.onNextClick}
          title={"Next -->"}
        />
      </div>
    );
  }

  render() {
    return (
      <div>
        {this._renderHeader()}
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
  justifyContent: "center",
  alignItems: "center",
  background: "#F4F4F4"
};

const btnsStyle = {
  display: "flex",
  justifyContent: "space-between"
};

export default Explore;
