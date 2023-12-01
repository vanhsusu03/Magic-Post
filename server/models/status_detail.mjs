export default function (sequelize, DataTypes) {
  return sequelize.define('status_detail', {
    status_id: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'package_status',
        key: 'status_id'
      }
    },
    time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    package_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'package',
        key: 'package_id'
      }
    }
  }, {
    sequelize,
    tableName: 'status_detail',
    timestamps: false,
    indexes: [{
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [{
        name: "status_id"
      }, {
        name: "package_id"
      }]
    }, {
      name: "fk_status_detail_package",
      using: "BTREE",
      fields: [{
        name: "package_id"
      }]
    }]
  });
}