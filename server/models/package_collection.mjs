export default function (sequelize, DataTypes) {
  return sequelize.define('package_collection', {
    package_collection_id: {
      autoIncrement: true,
      type: DataTypes.MEDIUMINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    package_collection_type_id: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'package_collection_type',
        key: 'type_id'
      }
    },
    delivery_center_receive_id: {
      type: DataTypes.SMALLINT.UNSIGNED,
      allowNull: true,
    },
    warehouse_receive_id: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: true,
    },
  }, {
    sequelize,
    tableName: 'package_collection',
    timestamps: false,
    indexes: [{
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [{
        name: "package_collection_id"
      }]
    }, {
      name: "fk_package_collection_type",
      using: "BTREE",
      fields: [{
        name: "package_collection_type_id"
      }]
    }]
  });
}