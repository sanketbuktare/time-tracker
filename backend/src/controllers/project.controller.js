const { Project, Task } = require("../models");

exports.createProject = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    if (!name)
      return res.status(400).json({ error: "Project name is required" });
    const project = await Project.create({ name, description });
    res.status(201).json(project);
  } catch (err) {
    next(err);
  }
};

exports.listProjects = async (req, res, next) => {
  try {
    const projects = await Project.findAll({
      include: [{ model: Task }],
      order: [["createdAt", "DESC"]],
    });
    res.json(projects);
  } catch (err) {
    next(err);
  }
};

exports.getProject = async (req, res, next) => {
  try {
    const project = await Project.findByPk(req.params.id, {
      include: [{ model: Task }],
    });
    if (!project) return res.status(404).json({ error: "Project not found" });
    res.json(project);
  } catch (err) {
    next(err);
  }
};

exports.updateProject = async (req, res, next) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) return res.status(404).json({ error: "Project not found" });
    await project.update(req.body);
    res.json(project);
  } catch (err) {
    next(err);
  }
};

exports.deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) return res.status(404).json({ error: "Project not found" });
    await project.destroy();
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
};
