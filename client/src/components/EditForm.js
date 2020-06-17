import React, { Component } from "react";
import { db } from "../services/Firebase";
import { Link } from "react-router-dom";

class EditForm extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      recipeExists: false,
      equipment: [],
      ingredients: [],
      instructions: [],
      eTemp: "",
    };
    this.handleChangeEquipment = this.handleChangeEquipment.bind(this);
    this.handleChangeIngredients = this.handleChangeIngredients.bind(this);
    this.handleChangeInstructions = this.handleChangeInstructions.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeEquipment(event) {
    let newEquipment = this.state.equipment;
    newEquipment.push(event.target.value);
    this.setState({
      //equipment: [...this.state.equipment, event.target.value],
      equipment: newEquipment,
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
    console.log("from handlesubmit");
    console.log(event.target);
    console.log(this.state.equipment);
    console.log(this.state.ingredients);
    console.log(this.state.instructions);

    const recipeRef = db
      .collection("recipes")
      .doc(this.props.location.state.media.id.toString());
    recipeRef.get().then((snapshot) => {
      if (snapshot.exists) {
        //Add another condition to check if the data exists AND it's not empty
        console.log("exists!!");
        this.setState({ recipeExists: true });
        // this.setState({
        //   recipeExists: true,
        //   uid: snapshot.data().uid,
        //   equipment: snapshot.data().equipment,
        //   ingredients: snapshot.data().ingredients,
        //   instructions: snapshot.data().instructions,
        // });
        // return <h1>HI I EXIST</h1>;
      } else {
        console.log("not exists!!");
        recipeRef.set({
          uid: this.props.location.state.userID,
          ingredients: this.state.ingredients,
          equipment: this.state.equipment,
          instructions: this.state.instructions,
        });
      }
    });
  }

  render() {
    let editContent;
    if (this.state.recipeExists) {
      editContent = (
        <div>
          <h2>Looks like this recipe already exists!</h2>
          <Link
            to={{
              pathname: "/viewpost",
              state: {
                // id: this.props.location.state.id,
                // url: this.props.location.state.url,
                media: this.props.location.state.media,
                userID: this.props.location.state.userID,
              },
            }}
          >
            <button className="Login-button">View Recipe</button>
          </Link>
        </div>
      );
    } else {
      editContent = (
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
            //src={this.props.location.state.url}
            src={this.props.location.state.media.url}
            alt="oh no"
            style={{ alignItems: "center" }}
            // width="500"
            // height="500"
          />
          <form
            style={{
              display: "flex",
              alignContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
            onSubmit={this.handleSubmit}
          >
            <label>
              Equipment:
              <textarea
                style={{ width: "300", height: "200" }}
                type="text"
                placeholder="Add Equipmnt"
                onChange={this.handleChangeEquipment}
              />
            </label>
            <label>
              Ingredients:
              <textarea
                type="text"
                placeholder="Add Ingredient"
                onChange={this.handleChangeIngredients}
              />
            </label>
            <label>
              Instructions:
              <textarea
                type="text"
                placeholder="Add Instruction"
                onChange={this.handleChangeInstructions}
              />
            </label>
            <input type="submit" value="Submit" />
          </form>
          <Link
            to={{
              pathname: "/dashboard",
            }}
          >
            <button className="Login-button">Back to Dashboard</button>
          </Link>
          {/* {console.log(this.state.recipeExists)} */}
        </div>
      );
    }
    return <div>{editContent}</div>;
  }
}

export default EditForm;
