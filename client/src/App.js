import React, { Component } from "react";
import "./App.css";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import { Route, Redirect, Switch } from "react-router-dom";
import Navbar from "../src/components/navbar/Navbar"




class App extends Component {
  
  state = {
    user: this.props.user
  }

  setUser = (user) => {
    this.setState({
      user: user
    })
  }


  render() {
    return (
      <div className="App">
        <h1>Hello</h1>
        <Navbar></Navbar>
        <Route
          exact
          path="/signup"
          render={props => <Signup {...props} setUser={this.setUser} />}
        />
        <Route
          exact
          path="/login"
          render={props => <Login {...props} setUser={this.setUser} />}
        />
      </div>
    );
  }
}

export default App;
