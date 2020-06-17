import React, { Component } from "react";
import Card from "./Card";

class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  makeCards = () => {};

  render() {
    return <div>{this.makeCards()}</div>;
  }
}

export default DashBoard;
