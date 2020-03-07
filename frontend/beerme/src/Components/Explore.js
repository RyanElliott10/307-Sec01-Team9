import React, { Component } from "react";
import { Form, Button, ButtonToolbar, Row, Col } from "react-bootstrap";
import Dots from "react-carousel-dots";

import * as Constants from "../Utils/Constants";
import ExploreSelections from "../Models/ExploreSelections";
import NetClient from "../Utils/NetClient";
import Recommended from "./Recommended";

// comment for travis CI
const ExploreSpoofData = [
  {
    title: "Notes",
    description: "This is where the preferred notes description lives.",
    checkboxes: [
      { id: 1, type: "notes", option: "notes_test1", isChecked: false },
      { id: 2, type: "notes", option: "notes_test2", isChecked: false }
    ]
  },
  {
    title: "Colors",
    description: "This is where the preferred colors description lives.",
    checkboxes: [
      { id: 1, type: "colors", option: "color_test1", isChecked: false },
      { id: 2, type: "colors", option: "color_test2", isChecked: false }
    ]
  },
  {
    title: "Hints",
    description: "This is where the preferred hints description lives.",
    checkboxes: [
      { id: 1, type: "hints", option: "hints_test1", isChecked: false },
      { id: 2, type: "hints", option: "hints_test2", isChecked: false }
    ]
  }
];

export class Explore extends Component {
  constructor(props) {
    super(props);
    this.pages = [];
    this.state = {
      currentPageIndex: null
    };
  }

  componentDidMount() {
    NetClient.get("http://jsonplaceholder.typicode.com/todos").then(data => {
      data.forEach(element => {
        element.selected = false;
      });
      this._spoofData(ExploreSpoofData);
      this.setState({ currentPageIndex: 0 });
    });
  }

  // Temporary function to spoof the data handling process
  _spoofData(data) {
    this.pages = data;
  }

  _getAllSelections() {
    return this.pages
      .map(page => page.checkboxes.filter(data => data.isChecked))
      .flat();
  }

  _submitSelections() {
    const selections = this._getAllSelections().map(data => {
      const tmp = data;
      delete tmp["isChecked"];
      return tmp;
    });

    NetClient.post("http://httpbin.org/post", selections).then(data =>
      console.log(data)
    );
  }

  // MARK: OnClicks

  _onPreviousClick = () => {
    const prevPage =
      this.state.currentPageIndex === 0 ? 0 : this.state.currentPageIndex - 1;
    this.setState({
      currentPageIndex: prevPage
    });
  };

  _onNextClick = () => {
    // const selections = this.pages[
    //   this.state.currentPageIndex
    // ].checkboxes.filter(data => data.isChecked);

    if (this.state.currentPageIndex === this.pages.length - 1) {
      this._submitSelections();
    } else {
      this.setState({
        currentPageIndex: this.state.currentPageIndex + 1
      });
    }
  };

  _onFinalSubmit = () => {
    new ExploreSelections();
  };

  _onCheckboxClick = id => {
    this.pages[this.state.currentPageIndex].checkboxes.map(data => {
      if (data.id === id) {
        data.isChecked = !data.isChecked;
      }
    });
    this.forceUpdate();
  };

  // MARK: Render

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
    if (this.state.currentPageIndex === null) {
      return null;
    }

    return (
      <div style={styles.selectionBoxStyle}>
        {this._renderSelBoxTopText()}
        {this._renderSelections()}
      </div>
    );
  }

  _renderSelBoxTopText() {
    return (
      <div style={styles.selectionBoxTopTextStyle}>
        <h2>{this.pages[this.state.currentPageIndex].title}</h2>
        <h6 style={{ color: "#696969" }}>
          {this.pages[this.state.currentPageIndex].description}
        </h6>
      </div>
    );
  }

  _renderSelections() {
    let firstHalf = this.pages[this.state.currentPageIndex].checkboxes;
    let secondHalf = null;
    if (firstHalf.length > 10) {
      secondHalf = firstHalf.slice(10, firstHalf.length);
      firstHalf = firstHalf.slice(0, 10);
    }

    return (
      <div style={styles.selectionStyle}>
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
    let value = this.pages[this.state.currentPageIndex].checkboxes.filter(
      d => d.id === data.id
    )[0].isChecked;

    return (
      <Form key={data.id}>
        <div className="mb-3">
          <Form.Check
            custom
            id={data.id}
            label={data.option}
            checked={value}
            onChange={this._onCheckboxClick.bind(this, data.id)}
          />
        </div>
      </Form>
    );
  }

  _renderProgressionButtons() {
    return (
      <ButtonToolbar style={styles.btnsStyle}>
        <Button variant="secondary" onClick={this._onPreviousClick}>
          Previous
        </Button>
        <Dots
          length={this.pages.length}
          active={
            this.state.currentPageIndex === null
              ? 0
              : this.state.currentPageIndex
          }
          size={10}
        />
        <Button
          variant="secondary"
          style={{ backgroundColor: Constants.ORANGE_COLOR, outline: "none" }}
          onClick={this._onNextClick}
        >
          {this.state.currentPageIndex === this.pages.length - 1
            ? "Submit"
            : "Next"}
        </Button>
      </ButtonToolbar>
    );
  }

  render() {
    return (
      <div style={styles.mainStyle}>
        {this._renderTopBlurb()}
        {this._renderSelectionBox()}
        {this._renderProgressionButtons()}
        <Recommended />
      </div>
    );
  }
}

const styles = {
  mainStyle: {
    marginLeft: "200px",
    marginRight: "200px",
    paddingBottom: "150px"
  },
  selectionStyle: {
    flexDirection: "row",
    paddingLeft: "10px",
    paddingTop: "25px"
  },
  selectionBoxStyle: {
    background: "#F4F4F4",
    flexDirection: "row",
    marginTop: "15px"
  },
  selectionBoxTopTextStyle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "15px"
  },
  btnsStyle: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: "10px"
  }
};

export default Explore;
