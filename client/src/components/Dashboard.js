import React, { Component } from "react";
import Card from "./Card";

class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.fakeIDS = [
      { id: 17875383178704482 },
      { id: 17845770359152224 },
      { id: 17847414839129299 },
      { id: 17868739402771567 },
      { id: 17842864076184710 },
      { id: 17856741808932721 },
      { id: 17919702697405913 },
      { id: 17859801478881923 },
      { id: 17865305950774682 },
      { id: 18085468735172804 },
      { id: 17903575093443886 },
      { id: 17844801437081768 },
      { id: 17853111556908962 },
      { id: 17860294555791529 },
      { id: 18109425730118069 },
      { id: 18093346045178456 },
      { id: 17869324438631997 },
      { id: 17869433827654780 },
    ];
    this.fakeUserID = 17841432007470124;
  }

  render() {
    console.log(this.props.mediaIDS);
    // console.log(this.props.accessToken);
    let cards = [];
    for (let i = 0; i < this.fakeIDS.length; i++) {
      cards.push(
        <Card
          key={this.fakeIDS[i].id}
          id={this.fakeIDS[i].id}
          accessToken={this.props.accessToken}
          //userID={this.props.userID}
          userID={this.fakeUserID}
        />
      );
    }
    // for (let i = 0; i < this.props.mediaIDS.length; i++) {
    //   cards.push(
    //     <Card
    //       key={this.props.mediaIDS[i].id}
    //       id={this.props.mediaIDS[i].id}
    //       accessToken={this.props.accessToken}
    //     />
    //   );
    // }
    return <div>{cards}</div>;
  }
}

export default DashBoard;
