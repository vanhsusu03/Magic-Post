const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('district', {
    district_id: {
      autoIncrement: false,
      type: DataTypes.SMALLINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    province_municipality_id: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'province_municipality',
        key: 'province_municipality_id'
      }
    },
    district: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'district',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "district_id" },
        ]
      },
      {
        name: "fk_district_province_municipality",
        using: "BTREE",
        fields: [
          { name: "province_municipality_id" },
        ]
      },
    ]
  });
};
