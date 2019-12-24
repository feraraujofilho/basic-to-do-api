import axios from "axios";

const login = (username, password) => {
  return axios
    .post("/api/auth/login", {
      username: username,
      password: password
    })
    .then(response => {
      return response.data;
    })
    .catch(err => {
      return err.response.data;
    });
};

const signup = (username, password) => {
  return axios
    .post("/api/signup", {
      username: username,
      password: password,
    })
    .then(response => {
      return response.data;
    })
    .catch(err => {
      return err.response.data;
    });
};

export {signup, login}