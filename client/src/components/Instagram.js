import React, { Component } from "react";
import InstagramLogin from "react-instagram-login";
import axios from "axios";
import { db } from "../services/Firebase";
import "../App.css";
import Dashboard from "./Dashboard";
//https://jsonplaceholder.typicode.com/users

export default class Instagram extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      code: "",
      accessToken: "",
      username: "default",
      userID: "",
      media: [],
    };
  }

  // logOut = () => {
  //   console.log("Logged out");
  //   this.setState = {
  //     isLoggedIn: false,
  //     code: "",
  //     accessToken: "",
  //   };
  // };

  responseInstagram = (response) => {
    console.log(response);

    //Pass in code to retrieve access token
    this.getToken(response);
  };

  responseInstagramFail = (response) => {
    console.log(response);
    console.log("oops");
  };

  addUser = (user) => {
    const userRef = db.collection("users").doc(user.id.toString());
    userRef
      .get()
      .then((snapshot) => {
        if (!snapshot.exists) {
          //Only add user if they don't already exist
          userRef.set({
            id: user.id,
            ingredients: [],
            equipment: [],
            instructions: [],
            recipeExists: false,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  getToken = async (code) => {
    console.log("got to getToken");
    const data = new FormData();
    data.append("client_id", "291881972197269");
    data.append("client_secret", "4aec258d012851ac0d7bc1573fa529b2");
    data.append("grant_type", "authorization_code");
    data.append("redirect_uri", "https://723be80f237e.ngrok.io/");
    data.append("code", code);

    const headers = {
      "Content-Type": "multipart/form-data",
    };

    await axios
      .post(
        "https://cors-anywhere.herokuapp.com/https://api.instagram.com/oauth/access_token",
        data,
        headers
      )
      .then(
        (response) => {
          //console.log(response);
          const accessToken = response.data["access_token"];
          const userID = response.data["user_id"];
          this.addUser({ token: accessToken, id: userID });
          this.getUsername(accessToken, userID);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  getUsername = async (token, userID) => {
    console.log("got to get username");
    console.log(token);
    const usernameUrl =
      "https://cors-anywhere.herokuapp.com/https://graph.instagram.com/me?fields=username&access_token=" +
      token;
    const mediaUrl =
      "https://cors-anywhere.herokuapp.com/https://graph.instagram.com/me/media?fields=id&access_token=" +
      token;

    try {
      const userRes = await axios.get(usernameUrl);
      const mediaRes = await axios.get(mediaUrl);
      console.log(userRes);
      console.log(mediaRes);
      // this.setState({
      //   userID: userID,
      //   username: userRes.data["username"],
      //   media: mediaRes.data.data,
      //   isLoggedIn: true,
      // });
      //Array of objects containing the picture id and url of each post
      const picInfo = [];
      for (let i = 0; i < mediaRes.data.data.length; i++) {
        let tempUrl = this.getPictureURL(mediaRes.data.data[i].id, token);

        tempUrl.then((res) => {
          picInfo.push({
            id: mediaRes.data.data[i].id,
            url: res, //this.getPictureURL(mediaRes.data.data[i].id, token),
          });
          //temp = res;
        });
      }
      this.setState({
        userID: userID,
        username: userRes.data["username"],
        media: picInfo,
        //media: mediaRes.data.data,
        isLoggedIn: true,
      });
    } catch (err) {
      console.log(err);
    }
  };

  getPictureURL = async (id, token) => {
    console.log("got to getpicurl");
    const picURL =
      "https://graph.instagram.com/" +
      id +
      "?fields=media_type,media_url,username,timestamp&access_token=" +
      token;

    try {
      const res = await axios.get(picURL);
      return res.data.media_url;
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    let instaContent;

    if (this.state.isLoggedIn) {
      instaContent = (
        <div
          style={{
            width: "100%",
            //margin: "auto",
            background: "#f4f4f4",
            padding: "20px",
          }}
        >
          <h2>Welcome {this.state.username} !</h2>
          <Dashboard
            media={this.state.media}
            //accessToken={this.state.accessToken}
            userID={this.state.userID}
            username={this.state.username}
          />
        </div>
      );
    } else {
      instaContent = (
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
    return <div className="Insta-button">{instaContent}</div>;
  }
}
