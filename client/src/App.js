import React, { Component } from "react";
import "./App.css";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import { Route} from "react-router-dom";
import Navbar from "../src/components/navbar/Navbar"
import CreateTask from "../src/components/task/CreateTask"
import TasksList from "../src/components/task/TasksList"
import TaskDetails from "../src/components/task/TaskDetails"




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
        <Navbar user={this.state.user} clearUser={this.setUser}/>
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
        <Route
          exact
          path="/newtask"
          render={props => <CreateTask {...props} />}
        />
        <Route
          exact
          path="/tasks"
          render={props => <TasksList {...props} />}
        />
        <Route
          exact
          path="/tasks/:id"
          render={props => <TaskDetails {...props} />}
        />
      </div>
    );
  }
}

export default App;
