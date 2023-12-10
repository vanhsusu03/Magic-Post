export default function (sequelize, DataTypes) {
  return sequelize.define('warehouse', {
    warehouse_id: {
      autoIncrement: true,
      type: DataTypes.TINYINT.UNSIGNED,
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
    address: {
      type: DataTypes.STRING(500),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'warehouse',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "warehouse_id" },
        ]
      },
      {
        name: "fk_warehouse_province_municipality",
        using: "BTREE",
        fields: [
          { name: "province_municipality_id" },
        ]
      },
    ]
  });
}