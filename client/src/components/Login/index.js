import React, { Component } from "react";
import InstagramLogin from "react-instagram-login";

export default class Login extends Component {
  constructor() {
    super();
  }
  responseInstagram = (response) => {
    console.log(response);
  };

  responseInstagramFail = (response) => {
    console.log(response);
    console.log("oops");
  };

  render() {
    return (
      <div>
        <p>To view your Recipe Book, please log into Instagram!</p>
        <InstagramLogin
          clientId="291881972197269"
          scope={["user_profile", "user_media"]}
          buttonText="Sign In"
          cssClass="Login-button"
          onSuccess={this.responseInstagram}
          onFailure={this.responseInstagramFail}
        />
      </div>
    );
  }
}
