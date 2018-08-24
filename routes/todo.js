const express = require("express");
const router = express.Router();

const Todo = require("../db/todo");

router.post("/", (req, res) => {
    Todo.create(req.body)
        .then(() => {
            res.json("success");
        })
        .catch(err => {
            console.log("There is an error: ", err);
        })
});

router.get("/", (req, res) => {
    Todo.find()
        .then(task => {
            res.json(task);
        })
        .catch(err => {
            console.log("There is an error: ", err);
        })
});

module.exports = router;