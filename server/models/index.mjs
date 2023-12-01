import { DataTypes, Sequelize } from 'sequelize'
import dotenv from "dotenv"

import _account from "./account.mjs"
import _account_type from "./account_type.mjs"
import _delivery_center from "./delivery_center.mjs"
import _district from "./district.mjs"
import _package from "./package.mjs"
import _package_collection from "./package_collection.mjs"
import _package_collection_type from "./package_collection_type.mjs"
import _package_pkg_collection from "./package_pkg_collection.mjs"
import _package_status from "./package_status.mjs"
import _package_type from "./package_type.mjs"
import _province_municipality from "./province_municipality.mjs"
import _status_detail from "./status_detail.mjs"
import _warehouse from "./warehouse.mjs"

dotenv.config()

const db = {}
const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
	host: process.env.MYSQL_HOST,
	port: process.env.MYSQL_PORT,
	dialect: 'mysql',
	define: {
		freezeTableName: true,
		noPrimaryKey: true
	},
	logging: false
})
db.sequelize = sequelize
db.models = {}

db.models.Account = _account(sequelize, DataTypes)
db.models.Account_type = _account_type(sequelize, DataTypes)
db.models.Delivery_center = _delivery_center(sequelize, DataTypes)
db.models.District = _district(sequelize, DataTypes)
db.models.Package = _package(sequelize, DataTypes)
db.models.Package_collection = _package_collection(sequelize, DataTypes)
db.models.Package_collection_type = _package_collection_type(sequelize, DataTypes)
db.models.Package_pkg_collection = _package_pkg_collection(sequelize, DataTypes)
db.models.Package_status = _package_status(sequelize, DataTypes)
db.models.Package_type = _package_type(sequelize, DataTypes)
db.models.Province_municipality = _province_municipality(sequelize, DataTypes)
db.models.Status_detail = _status_detail(sequelize, DataTypes)
db.models.Warehouse = _warehouse(sequelize, DataTypes)

db.models.Package.belongsToMany(db.models.Package_collection, {
	through: db.models.Package_pkg_collection,
	foreignKey: "package_id",
	otherKey: "package_collection_id"
})
db.models.Package.belongsToMany(db.models.Package_status, {
	through: db.models.Status_detail,
	foreignKey: "package_id",
	otherKey: "status_id"
})
db.models.Package_collection.belongsToMany(db.models.Package, {
	through: db.models.Package_pkg_collection,
	foreignKey: "package_collection_id",
	otherKey: "package_id"
})
db.models.Package_status.belongsToMany(db.models.Package, {
	through: db.models.Status_detail,
	foreignKey: "status_id",
	otherKey: "package_id"
})
db.models.Account.belongsTo(db.models.Account_type, {
	foreignKey: "account_type_id"
})
db.models.Account_type.hasMany(db.models.Account, {
	foreignKey: "account_type_id"
})
db.models.Account.belongsTo(db.models.Delivery_center, {
	foreignKey: "delivery_center_id"
})
db.models.Delivery_center.hasMany(db.models.Account, {
	foreignKey: "delivery_center_id"
})
db.models.Package.belongsTo(db.models.Delivery_center, {
	foreignKey: "delivery_center_receive_id"
})
db.models.Delivery_center.hasMany(db.models.Package, {
	foreignKey: "delivery_center_receive_id"
})
db.models.Package.belongsTo(db.models.Delivery_center, {
	foreignKey: "delivery_center_send_id"
})
db.models.Delivery_center.hasMany(db.models.Package, {
	foreignKey: "delivery_center_send_id"
})
db.models.Delivery_center.belongsTo(db.models.District, {
	foreignKey: "delivery_center_id"
})
db.models.District.hasOne(db.models.Delivery_center, {
	foreignKey: "delivery_center_id"
})
db.models.Package_pkg_collection.belongsTo(db.models.Package, {
	foreignKey: "package_id"
})
db.models.Package.hasMany(db.models.Package_pkg_collection, {
	foreignKey: "package_id"
})
db.models.Status_detail.belongsTo(db.models.Package, {
	foreignKey: "package_id"
})
db.models.Package.hasMany(db.models.Status_detail, {
	foreignKey: "package_id"
})
db.models.Package_pkg_collection.belongsTo(db.models.Package_collection, {
	foreignKey: "package_collection_id"
})
db.models.Package_collection.hasMany(db.models.Package_pkg_collection, {
	foreignKey: "package_collection_id"
})
db.models.Package_collection.belongsTo(db.models.Package_collection_type, {
	foreignKey: "package_collection_type_id"
})
db.models.Package_collection_type.hasMany(db.models.Package_collection, {
	foreignKey: "package_collection_type_id"
})
db.models.Status_detail.belongsTo(db.models.Package_status, {
	foreignKey: "status_id"
})
db.models.Package_status.hasMany(db.models.Status_detail, {
	foreignKey: "status_id"
})
db.models.Package.belongsTo(db.models.Package_type, {
	foreignKey: "package_type_id"
})
db.models.Package_type.hasMany(db.models.Package, {
	foreignKey: "package_type_id"
})
db.models.District.belongsTo(db.models.Province_municipality, {
	foreignKey: "province_municipality_id"
})
db.models.Province_municipality.hasMany(db.models.District, {
	foreignKey: "province_municipality_id"
})
db.models.Warehouse.belongsTo(db.models.Province_municipality, {
	foreignKey: "warehouse_id"
})
db.models.Province_municipality.hasOne(db.models.Warehouse, {
	foreignKey: "warehouse_id"
})
db.models.Account.belongsTo(db.models.Warehouse, {
	foreignKey: "warehouse_id"
})
db.models.Warehouse.hasMany(db.models.Account, {
	foreignKey: "warehouse_id"
})
db.models.Delivery_center.belongsTo(db.models.Warehouse, {
	foreignKey: "warehouse_id"
})
db.models.Warehouse.hasMany(db.models.Delivery_center, {
	foreignKey: "warehouse_id"
})

Object.keys(db.models).forEach(modelName => {
	if (db.models[modelName].associate) {
		db.models[modelName].associate(db.models);
	}
})

export default db