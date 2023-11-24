const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('province_municipality', {
    province_municipality_id: {
      autoIncrement: false,
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    province_municipality: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "province_municipality"
    }
  }, {
    sequelize,
    tableName: 'province_municipality',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "province_municipality_id" },
        ]
      },
      {
        name: "province_municipality",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "province_municipality" },
        ]
      },
    ]
  });
};
