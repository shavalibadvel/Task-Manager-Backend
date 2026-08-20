const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const taskRoutes = require("./routes/taskRoutes");

const app = express();
const PORT = 8082;
const MONGO_URI = "mongodb+srv://badvelshavali_db_user:Shavali123@shavali-cluster0.3jzuct9.mongodb.net/task-manager?appName=Shavali-Cluster0";
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("DB Connected!"))
  .catch((err) => console.log("DB connection error:", err));

app.use(cors());
app.use(express.json());

app.use("/api/tasks", taskRoutes);

// Any error thrown in a controller lands here. itujkkhgtuofbjvknfouh
app.use((err, req, res, next) => {
  const status = err.name === "ValidationError" ? 400 : err.statusCode || 500;
  console.error(err.message);
  res.status(status).json({ message: err.message });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));