import React, { Component } from "react";
import { Form, Button, ButtonToolbar, Row, Col } from "react-bootstrap";
import Dots from "react-carousel-dots";

import * as Constants from "../Utils/Constants";
import NetClient from "../Utils/NetClient";
import Recommended from "./Recommended";
import BeerColors from "../img/beer_colors.png";
import ExploreSpoofData from "../data/ExploreSpoofData";

export class Explore extends Component {
  constructor(props) {
    super(props);
    this.pages = [];
    this.state = {
      currentPageIndex: null,
      recommendedStyle: null
    };

    if (this.props.currentPageIndex && this.props.recommendedStyle) {
      this.setState({
        currentPageIndex: this.props.currentPageIndex,
        recommendedStyle: this.props.recommendedStyle
      });
    }
  }

  componentDidMount() {
    this.pages = ExploreSpoofData.getSpoofData();
    this.setState({ currentPageIndex: 0 });
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

    const interObjArr = selections.map(sel => {
      if (sel.type === "color") {
        return {
          ColorStart: sel.value[0],
          ColorEnd: sel.value[1]
        };
      } else if (sel.type === "ibu") {
        return {
          IBUStart: sel.value[0],
          IBUEnd: sel.value[1]
        };
      } else if (sel.type === "abv") {
        return {
          ABVStart: sel.value[0],
          ABVEnd: sel.value[1]
        };
      }
      return {};
    });

    const postObj = {};
    for (let i = 0; i < interObjArr.length; i++) {
      const keys = Object.keys(interObjArr[i]);
      for (let j = 0; j < keys.length; j++) {
        postObj[keys[j]] = interObjArr[i][keys[j]];
      }
    }

    NetClient.post(
      "https://localhost:44300/api/ExploreBeerStyles",
      postObj
    ).then(data => {
      this.setState({
        recommendedStyle: data
      });
    });
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
    if (this.state.currentPageIndex === this.pages.length - 1) {
      this._submitSelections();
    } else {
      this.setState({
        currentPageIndex: this.state.currentPageIndex + 1
      });
    }
  };

  _onCheckboxClick = id => {
    this.pages[this.state.currentPageIndex].checkboxes.map(data => {
      if (data.id === id) {
        data.isChecked = !data.isChecked;
      } else {
        data.isChecked = false;
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
      secondHalf = firstHalf.slice(
        Math.ceil(firstHalf.length / 2),
        firstHalf.length
      );
      firstHalf = firstHalf.slice(0, Math.floor(firstHalf.length / 2) + 1);
    }

    return (
      <Row className="justify-content-md-center">
        <Col>{this._renderChecks(firstHalf)}</Col>
        <Col>{secondHalf ? this._renderChecks(secondHalf) : null}</Col>
      </Row>
    );
  }

  _renderChecks(arr) {
    return arr.map(data => this._renderChecboxOption(data));
  }

  _getBtnStyle() {
    if (
      ExploreSpoofData.getSpoofData()[this.state.currentPageIndex].title ===
      "Colors"
    ) {
      return { paddingLeft: "200px" };
    }
    return { paddingLeft: "50px" };
  }

  _renderChecboxOption(data) {
    let value = this.pages[this.state.currentPageIndex].checkboxes.filter(
      d => d.id === data.id
    )[0].isChecked;

    return (
      <Form key={data.id}>
        <div className="mb-3">
          <Form.Check
            md="auto"
            custom
            id={data.id}
            label={data.option}
            checked={value}
            onChange={this._onCheckboxClick.bind(this, data.id)}
            style={this._getBtnStyle()}
            id={"checkbox-option"}
          />
        </div>
      </Form>
    );
  }

  _renderPreviousButton() {
    return (
      <Button variant="secondary" onClick={this._onPreviousClick}>
        Previous
      </Button>
    );
  }

  _isSubmitDisabled() {
    return (
      this.state.currentPageIndex === this.pages.length - 1 &&
      this._getAllSelections().length < 3
    );
  }

  _renderProgressionButtons() {
    return (
      <ButtonToolbar style={styles.btnsStyle}>
        {this.state.currentPageIndex ? this._renderPreviousButton() : <div />}
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
          disabled={this._isSubmitDisabled()}
          id={"submit-button"}
          className={"submit-button"}
        >
          {this.state.currentPageIndex === this.pages.length - 1
            ? "Submit"
            : "Next"}
        </Button>
      </ButtonToolbar>
    );
  }

  _renderRecommendations() {
    return (
      <Recommended
        mainDesc={"Wassup my dude"}
        photos={[""]}
        recDesc={[{ id: 1, title: "Ryan's Beer" }]}
        recBeers={[{ id: 1, title: "Ryan's Beer" }]}
      />
    );
  }

  render() {
    if (!this.state.recommendedStyle) {
      return (
        <div style={styles.mainStyle}>
          {this._renderTopBlurb()}
          {this._renderSelectionBox()}
          {this._renderProgressionButtons()}
        </div>
      );
    }
    return this._renderRecommendations();
  }
}

const styles = {
  mainStyle: {
    marginLeft: "200px",
    marginRight: "200px",
    paddingBottom: "150px"
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
