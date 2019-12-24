import React, { Component } from "react";
import { Alert } from "./styles";
import { signup } from "../../services/user";

export default class Signup extends Component {
  state = {
    username: "",
    password: "",
    error: ""
  };

  handleSubmit = event => {
    event.preventDefault();
    signup(this.state.username, this.state.password).then(data => {
      if (data.message) {
        // handle errors
        this.setState({
          error: data.message
        });
      } else {
        // no error
        // lift the data up to the App state
        this.props.setUser(data);
        // redirect to "/projects"
        this.props.history.push("/blablabla");
      }
    });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              value={this.state.username}
              id="username"
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
          {this.state.error && <Alert>{this.state.error}</Alert>}
          <button type="submit">SignUp</button>
        </form>
      </div>
    );
  }
}
