module.exports = (sequelize, DataTypes) => {
  const WorkSession = sequelize.define(
    "WorkSession",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      startedAt: { type: DataTypes.DATE, allowNull: false },
      stoppedAt: { type: DataTypes.DATE, allowNull: true },
      durationSeconds: { type: DataTypes.INTEGER, defaultValue: 0 },
    },
    {
      tableName: "work_sessions",
    }
  );

  return WorkSession;
};
