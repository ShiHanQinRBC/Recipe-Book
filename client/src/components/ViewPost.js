import React, { Component } from "react";
import { db } from "../services/Firebase";
import { Link } from "react-router-dom";

class ViewPost extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      recipeExists: false,
      equipment: [],
      ingredients: [],
      instructions: [],
    };
  }
  render() {
    db.collection("users")
      .doc(this.props.location.state.userID.toString())
      .get()
      .then((snapshot) => {
        //console.log(snapshot.data())
        if (snapshot.data().recipeExists) {
          console.log(snapshot.data());
          console.log("RECIPE EXISTS");
          this.setState({
            recipeExists: true,
            equipment: snapshot.data().equipment,
            ingredients: snapshot.data().ingredients,
            instructions: snapshot.data().instructions,
          });
        } else {
          console.log("NEED TO ADD RECIPE");
        }
      })
      .catch((err) => console.log(err));

    let content;
    if (this.state.recipeExists) {
      content = (
        <div>
          <h1>Your Recipe:</h1>
          <img
            src={this.props.location.state.url}
            alt="oh no"
            width="500"
            height="500"
          />
          <p>{this.state.equipment}</p>
          <p>{this.state.ingredients}</p>
          <p>{this.state.instructions}</p>
        </div>
      );
    } else {
      content = (
        <div>
          <p>Oops, looks like you need to add a recipe</p>
          <Link
            to={{
              pathname: "/editform",
              state: {
                id: this.props.location.state.id,
                url: this.props.location.state.url,
                userID: this.props.location.state.userID,
              },
              //state: { id: id, url: this.fakeURLS[id] },
            }}
          >
            <button className="Login-button">Add Recipe</button>
          </Link>
        </div>
      );
    }

    return (
      <div>
        <h1>View Post</h1>
        <div>{content}</div>
      </div>
    );
  }
}

export default ViewPost;
