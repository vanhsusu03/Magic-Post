export default function (sequelize, DataTypes) {
  return sequelize.define('account', {
    account_id: {
      autoIncrement: true,
      type: DataTypes.MEDIUMINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    account_type_id: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'account_type',
        key: 'type_id'
      }
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: "username"
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    delivery_center_id: {
      type: DataTypes.SMALLINT.UNSIGNED,
      allowNull: true,
      references: {
        model: 'delivery_center',
        key: 'delivery_center_id'
      }
    },
    warehouse_id: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: true,
      references: {
        model: 'warehouse',
        key: 'warehouse_id'
      }
    },
    first_name: {
      type: DataTypes.STRING(75),
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING(75),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: "phone"
    },
    citizen_identity_card_image: {
      type: DataTypes.STRING(300),
      allowNull: false,
      unique: "citizen_identity_card_image"
    },
    registration_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    refresh_token: {
      type: DataTypes.STRING(300),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'account',
    timestamps: false,
    indexes: [{
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [{
        name: "account_id"
      }]
    }, {
      name: "username",
      unique: true,
      using: "BTREE",
      fields: [{
        name: "username"
      }]
    }, {
      name: "phone",
      unique: true,
      using: "BTREE",
      fields: [{
        name: "phone"
      }]
    }, {
      name: "citizen_identity_card_image",
      unique: true,
      using: "BTREE",
      fields: [{
        name: "citizen_identity_card_image"
      }]
    }, {
      name: "fk_account_delivery_center",
      using: "BTREE",
      fields: [{
        name: "delivery_center_id"
      }]
    }, {
      name: "fk_account_warehouse",
      using: "BTREE",
      fields: [{
        name: "warehouse_id"
      }]
    }, {
      name: "fk_account_account_type",
      using: "BTREE",
      fields: [{
        name: "account_type_id"
      }]
    }]
  });
}