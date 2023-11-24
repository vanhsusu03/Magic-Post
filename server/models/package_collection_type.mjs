export default function (sequelize, DataTypes) {
  return sequelize.define('package_collection_type', {
    type_id: {
      autoIncrement: true,
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    package_collection_type: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "package_collection_type"
    }
  }, {
    sequelize,
    tableName: 'package_collection_type',
    timestamps: false,
    indexes: [{
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [{
        name: "type_id"
      }]
    }, {
      name: "package_collection_type",
      unique: true,
      using: "BTREE",
      fields: [{
        name: "package_collection_type"
      }]
    }]
  });
}