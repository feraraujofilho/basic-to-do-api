import React, { Component } from "react";
import Axios from "axios";
import {Link} from "react-router-dom"


export default class TasksList extends Component {
  state = {
    projects: ""
  };

  componentDidMount = () => {
    Axios.get("/api/tasks")
      .then(res => {
        this.setState({
          projects: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <ul>
          {this.state.projects &&
            this.state.projects.map(proj => {
              return (
                <li>
                  <h3>{proj.title}</h3>
                  <p>{proj.description}</p>
                  <Link to={`/tasks/${proj._id}`}>See Project</Link>
                </li>
              );
            })}
        </ul>
      </div>
    );
  }
}
