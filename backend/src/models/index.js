const Sequelize = require("sequelize");
const sequelize = require("../config/database");
const ProjectModel = require("./project.model");
const TaskModel = require("./task.model");
const WorkSessionModel = require("./worksession.model");
const UserModel = require("./user.model"); // optional - basic user model

const Project = ProjectModel(sequelize, Sequelize.DataTypes);
const Task = TaskModel(sequelize, Sequelize.DataTypes);
const WorkSession = WorkSessionModel(sequelize, Sequelize.DataTypes);
const User = UserModel(sequelize, Sequelize.DataTypes);

// Associations
User.hasMany(Project, { foreignKey: "ownerId", onDelete: "SET NULL" });
Project.belongsTo(User, { foreignKey: "ownerId" });

Project.hasMany(Task, { foreignKey: "projectId", onDelete: "CASCADE" });
Task.belongsTo(Project, { foreignKey: "projectId" });

Task.hasMany(WorkSession, { foreignKey: "taskId", onDelete: "CASCADE" });
WorkSession.belongsTo(Task, { foreignKey: "taskId" });

module.exports = {
  sequelize,
  Sequelize,
  User,
  Project,
  Task,
  WorkSession,
};
