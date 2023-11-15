const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('account_type', {
    type_id: {
      autoIncrement: true,
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    account_type: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique: "account_type"
    }
  }, {
    sequelize,
    tableName: 'account_type',
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
        name: "account_type",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "account_type" },
        ]
      },
    ]
  });
};
