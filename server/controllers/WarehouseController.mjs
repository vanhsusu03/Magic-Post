import sequelize from 'sequelize'
import db from '../models/index.mjs'

const { Province_municipality, Warehouse, Delivery_center } = db.models

const WarehouseController = {
    /**
    * Get all warehouses in the database. This is a query to get all province municipities and warehouses
    * 
    * @param req - The request object from express server
    * @param res - The response object from express server ( not used in this function )
    * 
    * @return { Promise } Resolves with list of all warehouses in the database or 500 if something goes
    */
    getAllWarehouses: async (req, res) => {
        try {
            const ans = await Province_municipality.findAll({
                attributes: [
                    [sequelize.col('province_municipality.province_municipality_id'), 'provinceMunicipalityId'],
                    [sequelize.col('province_municipality'), 'provinceMunicipality'],
                ],
                include: {
                    model: Warehouse,
                    attributes: [
                        [sequelize.col('warehouse_id'), 'warehouseId'],
                        [sequelize.col('address'), 'address'],
                    ],
                    required: true,
                },
                order: [
                    ['provinceMunicipalityId', 'ASC'],
                    [sequelize.col('warehouse_id'), 'ASC'],
                ],
            })
            res.status(200).json(ans)
        } catch (err) {
            console.log(err)
            res.status(500).json({
                message: 'Something went wrong',
                error: err.message
            })
        }
    },

    /**
    * Creates a warehouse from req body: provinceMunicipalityId and address.
    * 
    * @param req - Request object from express server
    * @param res - Response object from express server (error response will be JSON)
    * 
    * @return { Promise } Resolves to warehouseId, provinceMunicipalityId and address on success or 500 on error
    */
    createWarehouse: async (req, res) => {
        try {
            const { provinceMunicipalityId, address } = req.body
            console.log("Its is bug: " + provinceMunicipalityId)
            const warehouse = await Warehouse.create({
                province_municipality_id: provinceMunicipalityId,
                address: address
            })
            res.status(200).json({
                warehouseId: warehouse.warehouse_id,
                provinceMunicipalityId: warehouse.province_municipality_id,
                address: warehouse.address
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({
                message: 'Something went wrong',
                error: err.message
            })
        }
    },

    /**
    * Update a Warehouse. The address is passed as a JSON object to update in the database
    * 
    * @param req - Request object from express server
    * @param res - Response object from express server ( error response will be JSON with error message )
    * 
    * @return { Object } Warehouse with province_municipality_id and address updated in the
    */
    updateWarehouse: async (req, res) => {
        try {
            const warehouseId = Number(req.params.warehouseId)
            const { address } = req.body

            await Warehouse.update({
                address
            }, {
                where: {
                    warehouse_id: warehouseId
                }
            })
            res.status(200).json({
                warehouseId,
                address
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({
                message: 'Something went wrong',
                error: err.message
            })
        }
    },

    /**
    * Removes warehouse from the database by id. This is used to remove a warehouse that no longer exists
    * 
    * @param req - Request object from express server
    * @param res - Response object from express server ( error response will be JSON )
    * 
    * @return { Object } response with status and error message if something goes wrong with the request or if everything went
    */
    removeAWarehouse: async (req, res) => {
        try {
            const warehouseId = Number(req.params.warehouseId)

            await Warehouse.destroy({
                where: {
                    warehouse_id: warehouseId
                }
            })

            res.status(200).json({
                message: 'success',
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({
                message: 'Something went wrong',
                error: err.message
            })
        }
    },

    getWarehousesByProvinces: async (req, res) => {
        try {
            const provinceId = Number(req.params.provinceId);

            const ans = await Warehouse.findAll({
                attributes: [
                    [sequelize.col('warehouse_id'), 'warehouseId'],
                    [sequelize.col('address'), 'address'],
                ],
                where: {
                    province_municipality_id: provinceId,
                },
                order: [
                    [sequelize.col('warehouse_id'), 'ASC'],
                ],
            })
            res.status(200).json(ans)
        } catch (err) {
            console.log(err)
            res.status(500).json({
                message: 'Something went wrong',
                error: err.message
            })
        }
    },

    getWarehouseofADeliveryCenter: async (req, res) => {
        try {
            const deliveryCenterId = Number(req.params.deliveryCenterId);

            const ans = await Delivery_center.findAll({
                include: {
                    model: Warehouse,
                    attributes: [
                        [sequelize.col('warehouse_id'), 'warehouseId'],
                        [sequelize.col('address'), 'address'],
                    ],
                },
                where: {
                    delivery_center_id: deliveryCenterId
                },
                raw: true
            })
            res.status(200).json(ans)
        } catch (err) {
            console.log(err)
            res.status(500).json({
                message: 'Something went wrong',
                error: err.message
            })
        }
    }
}

export default WarehouseController