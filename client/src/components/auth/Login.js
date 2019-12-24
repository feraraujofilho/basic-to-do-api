import React, { Component } from "react";
import { login } from "../../services/user";
import { Alert } from "./styles";

class Login extends Component {
  state = {
    username: "",
    password: "",
    error: ""
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    login(this.state.username, this.state.password).then(data => {
      if (data.message) {
        this.setState({
          error: data.message
        });
      } else {
        this.props.setUser(data);
        this.props.history.push("/");
      }
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h2>LOGIN</h2>
          <div>
            <label htmlFor="username" >
              <input
                type="text"
                name="username"
                id="username"
                value={this.state.username}
                onChange={this.handleChange}
                placeholder="&nbsp;"
              />
              <span >USERNAME</span>
              <span ></span>
            </label>
          </div>
          <div>
            <label htmlFor="password" className="inp">
              <input
                type="password"
                name="password"
                id="password"
                value={this.state.password}
                onChange={this.handleChange}
                placeholder="&nbsp;"
              />
              <span className="label">PASSWORD</span>
              <span className="border"></span>
            </label>
          </div>
          {this.state.error && <Alert>{this.state.error}</Alert>}
          <button type="submit">LOG IN</button>
        </form>
      </div>
    );
  }
}

export default Login;
