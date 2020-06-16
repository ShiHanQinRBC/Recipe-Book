import React, { Component } from "react";
import "./App.css";
import Instagram from "./components/Instagram";
import Dashboard from "./components/Dashboard";
import EditForm from "./components/EditForm";
import ViewPost from "./components/ViewPost";
import { BrowserRouter, Switch, Route } from "react-router-dom";

class App extends Component {
  state = {
    user: null,
    isSignedIn: false,
  };

  render() {
    return (
      <div>
        <header className="App-header">
          <h1 className="App-title">Recipe Book</h1>
        </header>
        <BrowserRouter>
          <Switch>
            <Route path="/dashboard" component={Dashboard}></Route>
            <Route path="/editform" component={EditForm}></Route>
            <Route path="/viewpost" component={ViewPost}></Route>
            <Route exact path="/" component={Instagram}></Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
