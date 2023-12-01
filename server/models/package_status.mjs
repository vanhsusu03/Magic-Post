export default function (sequelize, DataTypes) {
  return sequelize.define('package_status', {
    status_id: {
      autoIncrement: true,
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    package_status: {
      type: DataTypes.STRING(700),
      allowNull: false,
      unique: "package_status"
    }
  }, {
    sequelize,
    tableName: 'package_status',
    timestamps: false,
    indexes: [{
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [{
        name: "status_id"
      }]
    }, {
      name: "package_status",
      unique: true,
      using: "BTREE",
      fields: [{
        name: "package_status"
      }]
    }]
  });
}