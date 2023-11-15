const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('package_type', {
    type_id: {
      autoIncrement: true,
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    package_type: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: "package_type"
    }
  }, {
    sequelize,
    tableName: 'package_type',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "type_id" },
        ]
      },
      {
        name: "package_type",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "package_type" },
        ]
      },
    ]
  });
};
