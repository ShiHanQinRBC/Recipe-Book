import React, { Component } from "react";
import { db } from "../services/Firebase";
// import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

class EditForm extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      recipeExists: false,
      equipment: [],
      ingredients: [],
      instructions: [],
    };
    this.handleChangeEquipment = this.handleChangeEquipment.bind(this);
    this.handleChangeIngredients = this.handleChangeIngredients.bind(this);
    this.handleChangeInstructions = this.handleChangeInstructions.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeEquipment(event) {
    this.setState({
      equipment: [...this.state.equipment, event.target.value],
    });
  }

  handleChangeIngredients(event) {
    this.setState({
      ingredients: [...this.state.ingredients, event.target.value],
    });
  }
  handleChangeInstructions(event) {
    this.setState({
      instructions: [...this.state.instructions, event.target.value],
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.equipment);
    console.log(this.state.ingredients);
    console.log(this.state.instructions);
    this.setState({ recipeExists: true });

    const userRef = db
      .collection("users")
      .doc(this.props.location.state.id.toString());
    userRef
      .get()
      .then((snapshot) => {
        userRef.set(
          {
            ingredients: this.state.ingredients,
            equipment: this.state.equipment,
            instructions: this.state.instructions,
            recipeExists: this.state.recipeExists,
          },
          { merge: true }
        );
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div
        style={{
          width: "100%",
          background: "#f4f4f4",
          padding: "20px",
        }}
      >
        <h1>Edit Form</h1>
        {/* <p>{this.props.location.state.id}</p>
        <p>{this.props.location.state.url}</p> */}
        <img
          src={this.props.location.state.url}
          alt="oh no"
          width="500"
          height="500"
        />
        <form onSubmit={this.handleSubmit}>
          <label>
            Equipment:
            <input type="text" onChange={this.handleChangeEquipment} />
          </label>
          <label>
            Ingredients:
            <input type="text" onChange={this.handleChangeIngredients} />
          </label>
          <label>
            Instructions:
            <input type="text" onChange={this.handleChangeInstructions} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        {/* {console.log(this.state.recipeExists)} */}
      </div>
    );
  }
}

export default EditForm;
