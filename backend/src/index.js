require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");
const projectRoutes = require("./routes/project.routes");
const taskRoutes = require("./routes/task.routes");
const workRoutes = require("./routes/worksession.routes");

const app = express();
app.use(cors());
app.use(express.json());

// Health
app.get("/api/health", (req, res) => res.json({ ok: true }));

// API routes
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/work", workRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Time Tracker API");
});

// global error handler (simple)
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({ error: err.message || "Server error" });
});

const PORT = process.env.PORT || 5000;

sequelize
  .sync({ alter: true }) // change to { force: true } only for development reset
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to sync DB:", err);
  });
