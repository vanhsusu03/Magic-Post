import sequelize from 'sequelize'
import db from '../models/index.mjs'

const { Province_municipality, Warehouse } = db.models

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

            const warehouse = await Warehouse.update({
                address
            }, {
                where: {
                    warehouse_id: warehouseId
                }
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
}

export default WarehouseController