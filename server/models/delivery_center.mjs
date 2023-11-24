export default function (sequelize, DataTypes) {
  return sequelize.define('delivery_center', {
    delivery_center_id: {
      type: DataTypes.SMALLINT.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'district',
        key: 'district_id'
      }
    },
    warehouse_id: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'warehouse',
        key: 'warehouse_id'
      }
    },
    address: {
      type: DataTypes.STRING(500),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'delivery_center',
    timestamps: false,
    indexes: [{
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [{
        name: "delivery_center_id"
      }]
    }, {
      name: "fk_delivery_center_warehouse",
      using: "BTREE",
      fields: [{
        name: "warehouse_id"
      }]
    }]
  });
}