const Sequelize = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const db = {};

const sequelize = new Sequelize(
    process.env.MYSQL_DATABASE,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASSWORD,
    {
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
        dialect: 'mysql',
        define: {
            freezeTableName: true,
            noPrimaryKey: true
        },
        logging: false
    }
);

db.sequelize = sequelize;
db.models = {};

db.models.Account = require("./account")(sequelize, Sequelize.DataTypes);
db.models.Account_type = require("./account_type")(sequelize, Sequelize.DataTypes);
db.models.Delivery_center = require("./delivery_center")(sequelize, Sequelize.DataTypes);
db.models.District = require("./district")(sequelize, Sequelize.DataTypes);
db.models.Package = require("./package")(sequelize, Sequelize.DataTypes);
db.models.Package_collection = require("./package_collection")(sequelize, Sequelize.DataTypes);
db.models.Package_collection_type = require("./package_collection_type")(sequelize, Sequelize.DataTypes);
db.models.Package_pkg_collection = require("./package_pkg_collection")(sequelize, Sequelize.DataTypes);
db.models.Package_status = require("./package_status")(sequelize, Sequelize.DataTypes);
db.models.Package_type = require("./package_type")(sequelize, Sequelize.DataTypes);
db.models.Province_municipality = require('./province_municipality')(sequelize, Sequelize.DataTypes);
db.models.Status_detail = require("./status_detail")(sequelize, Sequelize.DataTypes);
db.models.Warehouse = require("./warehouse")(sequelize, Sequelize.DataTypes);
db.models.Token = require("./token")(sequelize, Sequelize.DataTypes);

db.models.Package.belongsToMany(db.models.Package_collection, { through: db.models.Package_pkg_collection, foreignKey: "package_id", otherKey: "package_collection_id" });
db.models.Package.belongsToMany(db.models.Package_status, { through: db.models.Status_detail, foreignKey: "package_id", otherKey: "status_id" });
db.models.Package_collection.belongsToMany(db.models.Package, { through: db.models.Package_pkg_collection, foreignKey: "package_collection_id", otherKey: "package_id" });
db.models.Package_status.belongsToMany(db.models.Package, { through: db.models.Status_detail, foreignKey: "status_id", otherKey: "package_id" });
db.models.Account.belongsTo(db.models.Account_type, { foreignKey: "account_type_id"});
db.models.Account_type.hasMany(db.models.Account, { foreignKey: "account_type_id"});
db.models.Account.belongsTo(db.models.Delivery_center, { foreignKey: "delivery_center_id"});
db.models.Delivery_center.hasMany(db.models.Account, { foreignKey: "delivery_center_id"});
db.models.Package.belongsTo(db.models.Delivery_center, { foreignKey: "delivery_center_receive_id"});
db.models.Delivery_center.hasMany(db.models.Package, { foreignKey: "delivery_center_receive_id"});
db.models.Package.belongsTo(db.models.Delivery_center, { foreignKey: "delivery_center_send_id"});
db.models.Delivery_center.hasMany(db.models.Package, { foreignKey: "delivery_center_send_id"});
db.models.Delivery_center.belongsTo(db.models.District, { foreignKey: "delivery_center_id"});
db.models.District.hasOne(db.models.Delivery_center, { foreignKey: "delivery_center_id"});
db.models.Package_pkg_collection.belongsTo(db.models.Package, { foreignKey: "package_id"});
db.models.Package.hasMany(db.models.Package_pkg_collection, { foreignKey: "package_id"});
db.models.Status_detail.belongsTo(db.models.Package, { foreignKey: "package_id"});
db.models.Package.hasMany(db.models.Status_detail, { foreignKey: "package_id"});
db.models.Package_pkg_collection.belongsTo(db.models.Package_collection, { foreignKey: "package_collection_id"});
db.models.Package_collection.hasMany(db.models.Package_pkg_collection, { foreignKey: "package_collection_id"});
db.models.Package_collection.belongsTo(db.models.Package_collection_type, { foreignKey: "package_collection_type_id"});
db.models.Package_collection_type.hasMany(db.models.Package_collection, { foreignKey: "package_collection_type_id"});
db.models.Status_detail.belongsTo(db.models.Package_status, { foreignKey: "status_id"});
db.models.Package_status.hasMany(db.models.Status_detail, { foreignKey: "status_id"});
db.models.Package.belongsTo(db.models.Package_type, { foreignKey: "package_type_id"});
db.models.Package_type.hasMany(db.models.Package, { foreignKey: "package_type_id"});
db.models.District.belongsTo(db.models.Province_municipality, { foreignKey: "province_municipality_id"});
db.models.Province_municipality.hasMany(db.models.District, { foreignKey: "province_municipality_id"});
db.models.Warehouse.belongsTo(db.models.Province_municipality, { foreignKey: "warehouse_id"});
db.models.Province_municipality.hasOne(db.models.Warehouse, {foreignKey: "warehouse_id"});
db.models.Account.belongsTo(db.models.Warehouse, { foreignKey: "warehouse_id"});
db.models.Warehouse.hasMany(db.models.Account, { foreignKey: "warehouse_id"});
db.models.Delivery_center.belongsTo(db.models.Warehouse, { foreignKey: "warehouse_id"});
db.models.Warehouse.hasMany(db.models.Delivery_center, { foreignKey: "warehouse_id"});
db.models.Token.belongsTo(db.models.Account, { foreignKey: "token_id"});
db.models.Account.hasOne(db.models.Token, { foreignKey: "token_id"});

Object.keys(db.models).forEach((modelName) => {
    if (db.models[modelName].associate) {
        db.models[modelName].associate(db.models);
    }
});

module.exports = db;