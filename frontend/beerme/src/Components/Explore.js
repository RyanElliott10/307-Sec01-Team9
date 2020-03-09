import React, { Component } from "react";
import { Form, Button, ButtonToolbar, Row, Col } from "react-bootstrap";
import Dots from "react-carousel-dots";

import * as Constants from "../Utils/Constants";
import ExploreSelections from "../Models/ExploreSelections";
import NetClient from "../Utils/NetClient";
import Recommended from "./Recommended";
import BeerColors from "../img/beer_colors.png";

const ExploreSpoofData = [
  {
    title: "Colors",
    description: "Select your preferred color of beer.",
    checkboxes: [
      {
        id: 1,
        type: "color",
        option: "Light Yellow",
        value: [1, 1.5],
        isChecked: false
      },
      {
        id: 2,
        type: "color",
        option: "Straw",
        value: [2, 3],
        isChecked: false
      },
      {
        id: 3,
        type: "color",
        option: "Pale",
        value: [4],
        isChecked: false
      },
      {
        id: 4,
        type: "color",
        option: "Gold",
        value: [5, 6],
        isChecked: false
      },
      {
        id: 5,
        type: "color",
        option: "Light Amber",
        value: [7],
        isChecked: false
      },
      {
        id: 6,
        type: "color",
        option: "Amber",
        value: [8],
        isChecked: false
      },
      {
        id: 7,
        type: "color",
        option: "Medium Amber",
        value: [9],
        isChecked: false
      },
      {
        id: 8,
        type: "color",
        option: "Copper",
        value: [10, 12],
        isChecked: false
      },
      {
        id: 9,
        type: "color",
        option: "Light Brown",
        value: [13, 15],
        isChecked: false
      },
      {
        id: 10,
        type: "color",
        option: "Saddle Brown",
        value: [16, 17],
        isChecked: false
      },
      {
        id: 11,
        type: "color",
        option: "Brown",
        value: [18, 24],
        isChecked: false
      },
      {
        id: 12,
        type: "color",
        option: "Dark Brown",
        value: [25, 39],
        isChecked: false
      },
      {
        id: 13,
        type: "color",
        option: "Black",
        value: [40],
        isChecked: false
      }
    ]
  },
  {
    title: "Bitterness (IBU)",
    description: "A gauge of your preferred beer bitterness.",
    checkboxes: [
      {
        id: 1,
        type: "ibu",
        option: "Restrained (0-20)",
        value: [0, 20],
        isChecked: false
      },
      {
        id: 2,
        type: "ibu",
        option: "Moderate (21-40)",
        value: [21, 40],
        isChecked: false
      },
      {
        id: 3,
        type: "ibu",
        option: "Aggressive (41-60)",
        value: [41, 60],
        isChecked: false
      },
      {
        id: 4,
        type: "ibu",
        option: "Harsh (60-100)",
        value: [61, 100],
        isChecked: false
      }
    ]
  },
  {
    title: "Alcohol by Volume (ABV)",
    description:
      "Alcohol by volume is used to measure the alcohol content of beer, wine, distilled spirits, and other alcoholic beverages.",
    checkboxes: [
      {
        id: 1,
        type: "abv",
        option: "Restrained (1-3%)",
        value: [1, 3],
        isChecked: false
      },
      {
        id: 2,
        type: "abv",
        option: "Mild (4-6%)",
        value: [4, 6],
        isChecked: false
      },
      {
        id: 3,
        type: "abv",
        option: "Moderate (7-9%)",
        value: [7, 9],
        isChecked: false
      },
      {
        id: 4,
        type: "abv",
        option: "Strong (10-12%)",
        value: [10, 12],
        isChecked: false
      },
      {
        id: 5,
        type: "abv",
        option: "Harsh (13-15%)",
        value: [13, 15],
        isChecked: false
      }
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
    // GET selections
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

    // POST to send selections to the backend
    NetClient.post("https://localhost:44300/api/ExploreBeerStyles", selections).then(data => {
      console.log(data);
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

  _onFinalSubmit = () => {
    new ExploreSelections();
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

  _renderColorImg() {
    return (
      <img
        style={{
          width: "1000px",
          height: "150px"
        }}
        src={BeerColors}
        alt="BeerColors"
      />
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

  _getBtnStyle() {
    if (ExploreSpoofData[this.state.currentPageIndex].title === "Colors") {
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
            custom
            id={data.id}
            label={data.option}
            checked={value}
            onChange={this._onCheckboxClick.bind(this, data.id)}
            style={this._getBtnStyle()}
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
  selectionStyle: {
    flexDirection: "row",
    paddingLeft: "10px",
    paddingTop: "25px",
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center"
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
