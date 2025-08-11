const { Task } = require("../models");

exports.getTasksByProject = async (req, res, next) => {
  try {
    const tasks = await Task.findAll({
      where: { projectId: req.params.projectId },
      order: [["createdAt", "ASC"]],
    });
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

exports.createTask = async (req, res, next) => {
  try {
    const { title, projectId } = req.body;
    if (!title || !projectId)
      return res
        .status(400)
        .json({ error: "title and projectId are required" });
    const task = await Task.create({ title, projectId });
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const [updated] = await Task.update(req.body, {
      where: { id: req.params.id },
    });
    if (!updated) return res.status(404).json({ error: "Task not found" });
    const updatedTask = await Task.findByPk(req.params.id);
    res.json(updatedTask);
  } catch (error) {
    next(error);
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const deleted = await Task.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: "Task not found" });
    res.json({ ok: true });
  } catch (error) {
    next(error);
  }
};
