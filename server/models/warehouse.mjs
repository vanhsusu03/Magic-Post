export default function (sequelize, DataTypes) {
  return sequelize.define('warehouse', {
    warehouse_id: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'province_municipality',
        key: 'province_municipality_id'
      }
    },
    address: {
      type: DataTypes.STRING(500),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'warehouse',
    timestamps: false,
    indexes: [{
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [{
        name: "warehouse_id"
      }]
    }]
  });
}