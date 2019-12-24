const express = require("express");
const authRoutes = express.Router();

const passport = require("passport");
const bcrypt = require("bcryptjs");

// the user model
const User = require("../models/user");

authRoutes.post("/signup", (req, res, next) => {
  console.log("backend", req.body);
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    res.json({ message: "Provide username and password" });
    return;
  }

  if (password.length < 7) {
    res.json({
      message:
        "Please make your password at least 7 characters long for security purposes."
    });
    return;
  }

  User.findOne({ username: username }, "_id", (err, foundUser) => {
    if (foundUser) {
      res.json({ message: "The username already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);

    const theUser = new User({
      username: username,
      password: hashPass
    });

    theUser.save(err => {
      if (err) {
        res.json({ message: "Something went wrong saving user to Database" });
        return;
      }

      req.login(theUser, err => {
        if (err) {
          res.json({
            message: "Something went wrong with automatic login after signup"
          });
          return;
        }

        res.status(200).json(req.user);
      });
    });
  });
});

authRoutes.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, theUser, failureDetails) => {
    if (err) {
      res.json({ message: "Something went wrong authenticating user" });
      return;
    }

    if (!theUser) {
      res.json({ message: "sorry, we coun't find that account" });
      return;
    }

    req.login(theUser, err => {
      if (err) {
        res.json({ message: "Something went wrong logging in" });
        return;
      }

      res.status(200).json(req.user);
    });
  })(req, res, next);
});

authRoutes.delete("/logout", (req, res, next) => {
  req.logout();
  res.json({ message: "Success" });
});

authRoutes.get("/loggedin", (req, res) => {
 res.json(req.user);
});

module.exports = authRoutes;
