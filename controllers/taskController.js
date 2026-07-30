const taskService = require("../services/taskService");

// Controllers only handle req/res. All logic lives in the service.
const getTasks = async (req, res, next) => {
  try {
    res.json(await taskService.getAllTasks());
  } catch (err) {
    next(err);
  }
};

const createTask = async (req, res, next) => {
  try {
    const task = await taskService.createTask(req.body, req.file);
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};

const updateTask = async (req, res, next) => {
  try {
    res.json(await taskService.updateTask(req.params.id, req.body, req.file));
  } catch (err) {
    next(err);
  }
};

const markAsDone = async (req, res, next) => {
  try {
    res.json(await taskService.markAsDone(req.params.id));
  } catch (err) {
    next(err);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    await taskService.deleteTask(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (err) {
    next(err);
  }
};

const downloadFile = async (req, res, next) => {
  try {
    const file = await taskService.getFile(req.params.id);
    res.set("Content-Type", file.contentType);
    res.set("Content-Disposition", `attachment; filename="${file.fileName}"`);
    res.send(file.data);
  } catch (err) {
    next(err);
  }
};

module.exports = { getTasks, createTask, updateTask, markAsDone, deleteTask, downloadFile };