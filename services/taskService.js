const Task = require("../models/Task");

// Never send the file buffer with a list or update response.
const NO_BLOB = "-linkedFile.data";

const notFound = () => {
  const err = new Error("Task not found");
  err.statusCode = 404;
  return err;
};

const fileFrom = (file) => ({
  data: file.buffer,
  contentType: file.mimetype,
  fileName: file.originalname,
});

const getAllTasks = () => Task.find().select(NO_BLOB).sort({ deadline: 1 });

const createTask = async (body, file) => {
  const task = await Task.create({
    title: body.title,
    description: body.description,
    deadline: body.deadline,
    createdOn: new Date(),
    ...(file ? { linkedFile: fileFrom(file) } : {}),
  });
  return Task.findById(task._id).select(NO_BLOB);
};

const updateTask = async (id, body, file) => {
  const task = await Task.findById(id);
  if (!task) throw notFound();

  task.title = body.title;
  task.description = body.description;
  task.deadline = body.deadline;
  if (file) task.linkedFile = fileFrom(file);

  await task.save();
  return Task.findById(id).select(NO_BLOB);
};

const markAsDone = async (id) => {
  const task = await Task.findByIdAndUpdate(id, { status: "DONE" }, { new: true }).select(NO_BLOB);
  if (!task) throw notFound();
  return task;
};

const deleteTask = async (id) => {
  const task = await Task.findByIdAndDelete(id);
  if (!task) throw notFound();
  return task;
};

const getFile = async (id) => {
  const task = await Task.findById(id).select("linkedFile");
  if (!task || !task.linkedFile || !task.linkedFile.data) throw notFound();
  return task.linkedFile;
};

module.exports = { getAllTasks, createTask, updateTask, markAsDone, deleteTask, getFile };