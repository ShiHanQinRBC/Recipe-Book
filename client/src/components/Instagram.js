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
    //console.log(response);
    this.setState({
      isLoggedIn: true,
      code: response,
    });
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
        // if (snapshot.exists) {
        //   console.log("exists!!");
        // } else {
        //   userRef.set({
        //     id: user.id,
        //     ingredients: [],
        //     equipment: [],
        //     instructions: [],
        //   });
        // }
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
    const data = new FormData();
    data.append("client_id", "291881972197269");
    data.append("client_secret", "4aec258d012851ac0d7bc1573fa529b2");
    data.append("grant_type", "authorization_code");
    data.append("redirect_uri", "https://841066b9b1d1.ngrok.io/");
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
          // console.log(response.data["user_id"]);
          const accessToken = response.data["access_token"];
          const userID = response.data["user_id"];
          this.addUser({ token: accessToken, id: userID });
          this.setState({
            //accessToken: response.data["access_token"],
            accessToken: accessToken,
            userID: userID,
          });
        },
        (error) => {
          console.log(error);
        }
      );
  };

  getUsername = async (token) => {
    //console.log(token);
    const usernameUrl =
      "https://cors-anywhere.herokuapp.com/https://graph.instagram.com/me?fields=username&access_token=" +
      token;
    const mediaUrl =
      "https://cors-anywhere.herokuapp.com/https://graph.instagram.com/me/media?fields=id&access_token=" +
      token;

    try {
      const userRes = await axios.get(usernameUrl);
      const mediaRes = await axios.get(mediaUrl);
      //console.log(mediaRes.data.data);
      this.setState({
        username: userRes.data["username"],
        media: mediaRes.data.data,
      });
    } catch (err) {
      console.log(err);
    }
    // await axios.get(usernameUrl).then(
    //   (response) => {
    //     this.setState({ username: response.data["username"] });
    //   },
    //   (error) => console.log(error)
    // );
    // await axios.get(mediaUrl).then(
    //   (response) => {
    //     console.log(response.data.data);
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );
    // await axios
    //   .get(usernameUrl)
    //   .then((response) => {
    //     this.setState({ username: response.data["username"] });
    //   })
    //   .catch((err) => console.log(err));
    // await axios
    //   .get(mediaUrl)
    //   .then((response) => {
    //     console.log(response.data.data);
    //   })
    //   .catch((err) => console.log(err));
    // axios.all([axios.get(usernameUrl), axios.get(mediaUrl)]).then(
    //   (resArr) => {
    //     this.setState({ username: resArr[0].data["id"] });
    //   },
    //   (errArr) => {
    //     console.log("cmon");
    //   }
    // );
  };

  getDashboard = () => {
    return <Dashboard mediaIDS={this.state.media} userID={this.state.userID} />;
  };

  render() {
    let instaContent;
    //console.log(this.state.code);

    if (this.state.isLoggedIn) {
      //Pass in code to retrieve access token
      this.getToken(this.state.code);
      //Pass in access token to retrieve username
      this.getUsername(this.state.accessToken);

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
          {/* {console.log(this.state.media)}
          {console.log(this.state.accessToken)} */}
          <Dashboard
            mediaIDS={this.state.media}
            accessToken={this.state.accessToken}
            userID={this.state.userID}
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
