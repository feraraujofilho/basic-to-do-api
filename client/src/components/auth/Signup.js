import React, { Component } from "react";

export default class Signup extends Component {
  state = {
    username: "",
    password: "",
    error: ""
  };

  handleSubmit = event => {
    event.preventDefault();
    axios
      .post("/api/signup")
      .then(res => {
        if (res.message) {
          this.setState({
            error: res.message
          });
        }
        return res.data;
      })
      .catch(err => {
        return err.response.data;
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
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            value={this.state.username}
            id="username"
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={this.state.password}
          />
          <button type="submit">SignUp</button>
        </form>
      </div>
    );
  }
}
