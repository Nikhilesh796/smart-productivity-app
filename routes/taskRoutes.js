const express = require("express");
const { getTasks, createTask, updateTask, deleteTask } = require("../controllers/taskController");

const router = express.Router();

router.get("/", getTasks);        // Get all tasks
router.post("/", createTask);      // Create a task
router.put("/:id", updateTask);    // Update a task
router.delete("/:id", deleteTask); // Delete a task

module.exports = router;
