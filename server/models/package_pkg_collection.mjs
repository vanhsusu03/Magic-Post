export default function (sequelize, DataTypes) {
  return sequelize.define('package_pkg_collection', {
    package_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'package',
        key: 'package_id'
      }
    },
    package_collection_id: {
      type: DataTypes.MEDIUMINT.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'package_collection',
        key: 'package_collection_id'
      }
    }
  }, {
    sequelize,
    tableName: 'package_pkg_collection',
    timestamps: false,
    indexes: [{
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [{
        name: "package_id"
      }, {
        name: "package_collection_id"
      }]
    }, {
      name: "fk_package_pkg_collection_package_collection",
      using: "BTREE",
      fields: [{
        name: "package_collection_id"
      }]
    }]
  });
}