const { WorkSession, Task } = require("../models");

exports.startWork = async (req, res, next) => {
  try {
    const { taskId } = req.body;
    if (!taskId) return res.status(400).json({ error: "taskId required" });

    // Optional: ensure task exists
    const task = await Task.findByPk(taskId);
    if (!task) return res.status(404).json({ error: "Task not found" });

    // Create work session
    const ws = await WorkSession.create({ taskId, startedAt: new Date() });
    res.status(201).json(ws);
  } catch (err) {
    next(err);
  }
};

exports.stopWork = async (req, res, next) => {
  try {
    const { workSessionId } = req.body;
    if (!workSessionId)
      return res.status(400).json({ error: "workSessionId required" });

    const ws = await WorkSession.findByPk(workSessionId);
    if (!ws) return res.status(404).json({ error: "Work session not found" });

    if (ws.stoppedAt)
      return res.status(400).json({ error: "Work session already stopped" });

    ws.stoppedAt = new Date();
    ws.durationSeconds = Math.max(
      0,
      Math.floor((ws.stoppedAt - ws.startedAt) / 1000)
    );
    await ws.save();

    res.json(ws);
  } catch (err) {
    next(err);
  }
};

exports.listWorkByTask = async (req, res, next) => {
  try {
    const sessions = await WorkSession.findAll({
      where: { taskId: req.params.taskId },
      order: [["startedAt", "ASC"]],
    });
    res.json(sessions);
  } catch (err) {
    next(err);
  }
};
