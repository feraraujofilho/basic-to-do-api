const express = require("express");
const router = express.Router();
const Task = require("../models/task");

router.get("/tasks", async (req, res, next) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });

    res.json(tasks);
  } catch (err) {
    res.json(err);
  }
});

router.post("/tasks/create", async (req, res, next) => {

  if (!req.user) {
    return res.json({
      message: "sorry, you must be logged in to create a task"
    });
  }
  try {
    const task = await Task.create({
      title: req.body.title,
      description: req.body.description,
      owner: req.user._id
    });

    res.json(task);
  } catch (err) {
    res.json(err);
  }
});

router.get("/tasks/:id", (req,res) => {
  const id = req.params.id

  Task.findById(id).then(task =>{
    res.json(task)
  }).catch(err => {
    res.status(500).json(err);
  })

})

router.post("/tasks/edit/:id", async (req, res, next) => {
  try {
    console.log("REQQQQ!!", req.body)
    const task = await Task.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      description: req.body.description});

    res.json(task);
  } catch (err) {
    res.json(err);
  }
});

router.delete("/tasks/delete/:id", async (req, res, next) => {
  try {
    const task = await Task.findByIdAndRemove(req.params.id);

    res.json(task);
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
