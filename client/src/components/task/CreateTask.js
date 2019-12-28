import React, { Component } from "react";
import Axios from "axios";

export default class CreateTask extends Component {
  state = {
    title: "",
    description: ""
  };

  handleSubmit = event => {
    event.preventDefault();
    const { title, description } = this.state;

    Axios.post("/api/tasks/create", { title, description })
      .then(res => {
        this.props.history.push("/tasks");
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    console.log();
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="title">Task name</label>
            <input
              type="text"
              id="title"
              name="title"
              onChange={this.handleChange}
              value={this.state.title}
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <input
              type="text"
              name="description"
              onChange={this.handleChange}
              id="description"
              value={this.state.description}
            />
          </div>
          <button type="submit">Create</button>
        </form>
      </div>
    );
  }
}
