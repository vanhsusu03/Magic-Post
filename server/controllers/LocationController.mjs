import sequelize from 'sequelize'
import db from '../models/index.mjs'

const { Province_municipality, District, Warehouse, Delivery_center } = db.models

const LocationController = {
    /**
    * Get all districts of all provinces. This is used by SEQIOUS_PERSONAL_DIAGNOSTICS to get all districts of all provinces.
    * 
    * @param req - The request object from express server. { object }
    * @param res - The response object from express server. { object }
    * 
    * @return { Promise } Resolves with list of all districts of all provinces in this seq
    */
    getAllDistrictsOfAllProvinces: async (req, res) => {
        try {
            const ans = await Province_municipality.findAll({
                attributes: [
                    [sequelize.col('province_municipality.province_municipality_id'), 'provinceMunicipalityId'],
                    [sequelize.col('province_municipality'), 'provinceMunicipality'],
                ],
                include: {
                    model: District,
                    attributes: [
                        [sequelize.col('district_id'), 'districtId'],
                        [sequelize.col('district'), 'district'],
                    ],
                    required: true,
                },
                order: [
                    ['provinceMunicipalityId', 'ASC'],
                    [sequelize.col('district_id'), 'ASC'],
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
    * Get all province municipalities from the databse. This is used to get all the data in the database
    * 
    * @param req - express request object from express server
    * @param res - express response object from express server ( not used in this function )
    * 
    * @return { Promise } Resolves with array of all the data in the databse or 500 if something goes
    */
    getAllProvincesMunicipalities: async (req, res) => {
        try {
            const ans = await Province_municipality.findAll({
                attributes: [
                    [sequelize.col('province_municipality_id'), 'provinceMunicipalityId'],
                    [sequelize.col('province_municipality'), 'provinceMunicipality'],
                ],
                order: [['provinceMunicipalityId', 'ASC']],
            })
            res.status(201).json(ans)
        } catch (err) {
            console.log(err)
            res.status(500).json({
                message: 'Something went wrong',
                error: err.message
            })
        }
    },

    /**
    * Get all districts of a province. This is used by getProvince and getPurchInventors
    * 
    * @param req - Request object from express server.
    * @param res - Response object from express server. { status : 200 message :'Something went wrong'}
    * 
    * @return { Promise } Resolves with list of districts in JSON format. If an error occurs returns 500
    */
    getAllDistrictsOfAProvince: async (req, res) => {
        try {
            const provinceMunicipalityId = Number(req.params.provinceMunicipalityId)
            const ans = await District.findAll({
                attributes: [
                    [sequelize.col('district_id'), 'districtId'],
                    [sequelize.col('district'), 'district'],
                ],
                where: {
                    province_municipality_id: provinceMunicipalityId,
                },
                order: [['districtId', 'ASC']],
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
    * Retrieve Warehouses and Province_municipality records by province_municipality.
    * 
    * @param req - The request object from express server. { nome :'Sequelize'provinceMunicipalityId : number }
    * @param res - The response object from express server. { nome :'Sequelize'}
    * 
    * @return { Promise } Resolves with an array of Warehouse and / or Delivery_center records corresponding to the province
    */
    getOfficeByProvince: async (req, res) => {
        try {
            const provinceMunicipalityId = Number(req.params.provinceMunicipalityId)

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
                    include: {
                        model: Delivery_center,
                        attributes: [
                            [sequelize.col('delivery_center_id'), 'deliveryCenterId'],
                            [sequelize.col('district_id'), 'districtId'],
                            [sequelize.col('address'), 'address']
                        ],
                        include: {
                            model: District,
                            attributes: [
                                [sequelize.col('district'), 'district']
                            ]
                        }
                    },
                },
                where: {
                    province_municipality_id: provinceMunicipalityId
                },
                order: [
                    [sequelize.col('warehouses.warehouse_id'), 'ASC'],
                    [sequelize.col('delivery_center_id'), 'ASC']
                ]
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
}

export default LocationController