import React, { Component } from "react";
import "./App.css";
import Signup from "./components/auth/Signup";
import { Route, Redirect, Switch } from "react-router-dom";

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
        <Route
          exact
          path="/signup"
          render={props => <Signup {...props} setUser={this.setUser} />}
        />
      </div>
    );
  }
}

export default App;
