import React, { Component } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

export default class TaskDetails extends Component {
  state = {
    project: "",
    editForm: false,
    title: "",
    description: ""
  };

  getData = () => {
      Axios.get(`/api/tasks/${this.props.match.params.id}`)
          .then(res => {
              this.setState({
                  project: res.data,
                  title: res.data.title,
                  description: res.data.description
              });
          })
          .catch(err => {
              console.log(err);
          });
  }

  componentDidMount = () => {
    this.getData()
  };

  handleEdit = () => {
    this.setState({
      editForm: !this.state.editForm
    });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    Axios.post(
      `/api/tasks/edit/${this.props.match.params.id}`,
        {title: this.state.title,
        description: this.state.description}
    )
      .then(res => {
          this.setState({
              project: res.data,
              title: res.data.title,
              description: res.data.description,
              editForm: false
          })
          this.getData()
        console.log("resfront", res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  deleteProject = () => {
      Axios.delete(`/api/tasks/delete/${this.props.match.params.id}`).then(res =>{
          console.log("delete response", res);
          this.props.history.push("/tasks");
      }).catch(err =>{
          console.log(err)
      })
  }

  render() {
    console.log(this.state.project);
    return (
      <div>
        {this.state.project && (
          <div>
            <h2>{this.state.project.title}</h2>
            <p>{this.state.project.description}</p>
            <button onClick={this.handleEdit}>Edit Task</button>
            {/* <Link to={`/tasks/edit/${this.props.match.params.id}`}>Edit project</Link> */}
            <Link to="/tasks">See all tasks</Link>
            {this.state.editForm && (
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
                  <button type="submit">Save</button>
                  <button onClick={this.deleteProject}>Delete</button>
                </form>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}
