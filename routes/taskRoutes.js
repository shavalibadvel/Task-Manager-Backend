const express = require("express");

const controller = require("../controllers/taskController");
const upload = require("../services/uploadService");

const router = express.Router();

router.get("/", controller.getTasks);
router.post("/", upload, controller.createTask);

// These must come before "/:id" so Express doesn't read "file" as an id.
router.get("/:id/file", controller.downloadFile);
router.patch("/:id/done", controller.markAsDone);

router.put("/:id", upload, controller.updateTask);
router.delete("/:id", controller.deleteTask);

module.exports = router;