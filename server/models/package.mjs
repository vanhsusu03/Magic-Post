export default function (sequelize, DataTypes) {
  return sequelize.define('package', {
    package_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    package_type_id: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'package_type',
        key: 'type_id'
      }
    },
    delivery_center_send_id: {
      type: DataTypes.SMALLINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'delivery_center',
        key: 'delivery_center_id'
      }
    },
    delivery_center_receive_id: {
      type: DataTypes.SMALLINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'delivery_center',
        key: 'delivery_center_id'
      }
    },
    weight_gram: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false
    },
    cost: {
      type: DataTypes.SMALLINT.UNSIGNED,
      allowNull: false
    },
    COD_amount: {
      type: DataTypes.SMALLINT.UNSIGNED,
      allowNull: true,
      defaultValue: 0
    },
    sender_address: {
      type: DataTypes.STRING(600),
      allowNull: false
    },
    receiver_address: {
      type: DataTypes.STRING(600),
      allowNull: false
    },
    sender_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    receiver_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    sender_phone: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    receiver_phone: {
      type: DataTypes.STRING(20),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'package',
    timestamps: false,
    indexes: [{
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [{
        name: "package_id"
      }]
    }, {
      name: "fk_package_type",
      using: "BTREE",
      fields: [{
        name: "package_type_id"
      }]
    }, {
      name: "fk_package_delivery_center_send",
      using: "BTREE",
      fields: [{
        name: "delivery_center_send_id"
      }]
    }, {
      name: "fk_package_delivery_center_receive",
      using: "BTREE",
      fields: [{
        name: "delivery_center_receive_id"
      }]
    }]
  });
}