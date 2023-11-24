var DataTypes = require("sequelize").DataTypes;
var _account = require("./account");
var _account_type = require("./account_type");
var _delivery_center = require("./delivery_center");
var _district = require("./district");
var _package = require("./package");
var _package_collection = require("./package_collection");
var _package_collection_type = require("./package_collection_type");
var _package_pkg_collection = require("./package_pkg_collection");
var _package_status = require("./package_status");
var _package_type = require("./package_type");
var _province_municipality = require("./province_municipality");
var _status_detail = require("./status_detail");
var _token = require("./token");
var _warehouse = require("./warehouse");

function initModels(sequelize) {
  var account = _account(sequelize, DataTypes);
  var account_type = _account_type(sequelize, DataTypes);
  var delivery_center = _delivery_center(sequelize, DataTypes);
  var district = _district(sequelize, DataTypes);
  var package = _package(sequelize, DataTypes);
  var package_collection = _package_collection(sequelize, DataTypes);
  var package_collection_type = _package_collection_type(sequelize, DataTypes);
  var package_pkg_collection = _package_pkg_collection(sequelize, DataTypes);
  var package_status = _package_status(sequelize, DataTypes);
  var package_type = _package_type(sequelize, DataTypes);
  var province_municipality = _province_municipality(sequelize, DataTypes);
  var status_detail = _status_detail(sequelize, DataTypes);
  var token = _token(sequelize, DataTypes);
  var warehouse = _warehouse(sequelize, DataTypes);

  package.belongsToMany(package_collection, { as: 'package_collection_id_package_collections', through: package_pkg_collection, foreignKey: "package_id", otherKey: "package_collection_id" });
  package.belongsToMany(package_status, { as: 'status_id_package_statuses', through: status_detail, foreignKey: "package_id", otherKey: "status_id" });
  package_collection.belongsToMany(package, { as: 'package_id_packages', through: package_pkg_collection, foreignKey: "package_collection_id", otherKey: "package_id" });
  package_status.belongsToMany(package, { as: 'package_id_package_status_details', through: status_detail, foreignKey: "status_id", otherKey: "package_id" });
  token.belongsTo(account, { as: "token", foreignKey: "token_id"});
  account.hasOne(token, { as: "token", foreignKey: "token_id"});
  account.belongsTo(account_type, { as: "account_type", foreignKey: "account_type_id"});
  account_type.hasMany(account, { as: "accounts", foreignKey: "account_type_id"});
  account.belongsTo(delivery_center, { as: "delivery_center", foreignKey: "delivery_center_id"});
  delivery_center.hasMany(account, { as: "accounts", foreignKey: "delivery_center_id"});
  package.belongsTo(delivery_center, { as: "delivery_center_receive", foreignKey: "delivery_center_receive_id"});
  delivery_center.hasMany(package, { as: "packages", foreignKey: "delivery_center_receive_id"});
  package.belongsTo(delivery_center, { as: "delivery_center_send", foreignKey: "delivery_center_send_id"});
  delivery_center.hasMany(package, { as: "delivery_center_send_packages", foreignKey: "delivery_center_send_id"});
  delivery_center.belongsTo(district, { as: "delivery_center", foreignKey: "delivery_center_id"});
  district.hasOne(delivery_center, { as: "delivery_center", foreignKey: "delivery_center_id"});
  package_pkg_collection.belongsTo(package, { as: "package", foreignKey: "package_id"});
  package.hasMany(package_pkg_collection, { as: "package_pkg_collections", foreignKey: "package_id"});
  status_detail.belongsTo(package, { as: "package", foreignKey: "package_id"});
  package.hasMany(status_detail, { as: "status_details", foreignKey: "package_id"});
  package_pkg_collection.belongsTo(package_collection, { as: "package_collection", foreignKey: "package_collection_id"});
  package_collection.hasMany(package_pkg_collection, { as: "package_pkg_collections", foreignKey: "package_collection_id"});
  package_collection.belongsTo(package_collection_type, { as: "package_collection_type", foreignKey: "package_collection_type_id"});
  package_collection_type.hasMany(package_collection, { as: "package_collections", foreignKey: "package_collection_type_id"});
  status_detail.belongsTo(package_status, { as: "status", foreignKey: "status_id"});
  package_status.hasMany(status_detail, { as: "status_details", foreignKey: "status_id"});
  package.belongsTo(package_type, { as: "package_type", foreignKey: "package_type_id"});
  package_type.hasMany(package, { as: "packages", foreignKey: "package_type_id"});
  district.belongsTo(province_municipality, { as: "province_municipality", foreignKey: "province_municipality_id"});
  province_municipality.hasMany(district, { as: "districts", foreignKey: "province_municipality_id"});
  warehouse.belongsTo(province_municipality, { as: "warehouse", foreignKey: "warehouse_id"});
  province_municipality.hasOne(warehouse, { as: "warehouse", foreignKey: "warehouse_id"});
  account.belongsTo(warehouse, { as: "warehouse", foreignKey: "warehouse_id"});
  warehouse.hasMany(account, { as: "accounts", foreignKey: "warehouse_id"});
  delivery_center.belongsTo(warehouse, { as: "warehouse", foreignKey: "warehouse_id"});
  warehouse.hasMany(delivery_center, { as: "delivery_centers", foreignKey: "warehouse_id"});

  return {
    account,
    account_type,
    delivery_center,
    district,
    package,
    package_collection,
    package_collection_type,
    package_pkg_collection,
    package_status,
    package_type,
    province_municipality,
    status_detail,
    token,
    warehouse,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
