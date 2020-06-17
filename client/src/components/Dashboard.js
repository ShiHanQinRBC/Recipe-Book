import React, { Component } from "react";
import Card from "./Card";

class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    // this.fakeIDS = [
    //   { id: 17875383178704482 },
    //   { id: 17845770359152224 },
    //   { id: 17847414839129299 },
    //   { id: 17868739402771567 },
    //   { id: 17842864076184710 },
    //   { id: 17856741808932721 },
    //   { id: 17919702697405913 },
    //   { id: 17859801478881923 },
    //   { id: 17865305950774682 },
    //   { id: 18085468735172804 },
    //   { id: 17903575093443886 },
    //   { id: 17844801437081768 },
    //   { id: 17853111556908962 },
    //   { id: 17860294555791529 },
    //   { id: 18109425730118069 },
    //   { id: 18093346045178456 },
    //   { id: 17869324438631997 },
    //   { id: 17869433827654780 },
    // ];
    // this.fakeUserID = 17841432007470124;
    // this.state = {
    //   mediaIDS: this.props.mediaIDS,
    // };
    this.testArr = [
      { id: 1, val: 1 },
      { id: 2, val: 2 },
      { id: 3, val: 3 },
    ];
  }

  makeCards = () => {
    let cards = [];
    //console.log(this.props.media.length);
    for (let i = 0; i < this.props.media.length; i++) {
      cards.push(
        <Card
          key={this.props.media[i]["id"]}
          //id={this.props.media[i].id}
          media={this.props.media[i]}
          userID={this.props.userID}
          //accessToken={this.props.accessToken}
        />
      );
    }
    return cards;
  };

  render() {
    console.log(this.props);
    console.log(this.props.media);
    //console.log(this.testArr);
    //console.log(this.props.media[1]);
    return <div>{this.makeCards()}</div>;
  }
}

export default DashBoard;
