module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define(
    "Task",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      title: { type: DataTypes.STRING, allowNull: false },
      status: {
        type: DataTypes.ENUM("todo", "inprogress", "done"),
        defaultValue: "todo",
      },
      estimateMinutes: { type: DataTypes.INTEGER, defaultValue: 0 },
    },
    {
      tableName: "tasks",
    }
  );

  return Task;
};
