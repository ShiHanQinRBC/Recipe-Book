import React, { Component } from "react";
import { db } from "../services/Firebase";
import { Link } from "react-router-dom";

class ViewPost extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      uid: "",
      equipment: [],
      ingredients: [],
      instructions: [],
      recipeExists: false,
    };
  }

  componentDidMount() {
    const recipeRef = db
      .collection("recipes")
      .doc(this.props.location.state.media.id.toString());
    recipeRef.get().then((snapshot) => {
      if (snapshot.exists) {
        //Add another condition to check if the data exists AND it's not empty
        console.log("exists!!");
        this.setState({
          recipeExists: true,
          uid: snapshot.data().uid,
          equipment: snapshot.data().equipment,
          ingredients: snapshot.data().ingredients,
          instructions: snapshot.data().instructions,
        });
      } else {
        console.log("not exists!!");
        // recipeRef.set({
        //   uid: this.props.location.state.userID,
        //   ingredients: [],
        //   equipment: [],
        //   instructions: [],
        // });
      }
    });
  }

  render() {
    let content;
    if (this.state.recipeExists) {
      content = (
        <div>
          <h1>Your Recipe:</h1>
          <img
            src={this.props.location.state.media.url}
            alt="oh no"
            width="500"
            height="500"
          />
          <h2> Equipment:</h2>
          <p>{this.state.equipment}</p>
          <h2> Ingredients:</h2>
          <p>{this.state.ingredients}</p>
          <h2> Instructions:</h2>
          <p>{this.state.instructions}</p>
          <Link
            to={{
              pathname: "/dashboard",
            }}
          >
            <button className="Login-button">Back to Dashboard</button>
          </Link>
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
                // id: this.props.location.state.id,
                // url: this.props.location.state.url,
                media: this.props.location.state.media,
                userID: this.props.location.state.userID,
              },
              //state: { id: id, url: this.fakeURLS[id] },
            }}
          >
            <button className="Login-button">Add Recipe</button>
          </Link>
          <Link
            to={{
              pathname: "/dashboard",
            }}
          >
            <button className="Login-button">Back to Dashboard</button>
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
