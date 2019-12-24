import React, { Component } from "react";
import {logout} from "../../services/user"
import { Link } from "react-router-dom";

export default class Navbar extends Component {

  handleLogout = () => {
    logout()
  };

  render() {
    return (
      <div>
        <Link to="/" onClick={this.handleLogout}>
          Logout
        </Link>
        <Link to="/signup">Signup</Link>
        <Link to="/login">Login</Link>
      </div>
    );
  }
}
