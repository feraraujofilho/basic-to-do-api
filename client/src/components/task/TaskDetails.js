import React, { Component } from "react";
import Axios from "axios";
import {Link} from "react-router-dom"

export default class TaskDetails extends Component {
  state = {
    project: ""
  };

  componentDidMount = () => {
    Axios.get(`/api/tasks/${this.props.match.params.id}`)
      .then(res => {
        this.setState({
          project: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    console.log(this.state.project);
    return (
      <div>
        {this.state.project && (
          <div>
            <h2>{this.state.project.title}</h2>
            <p>{this.state.project.description}</p>
            <Link to={`/tasks/edit/${this.props.match.params.id}`}>Edit project</Link>
            <Link to="/tasks">See all tasks</Link>
          </div>
        )}
      </div>
    );
  }
}
