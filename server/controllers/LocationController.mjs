import sequelize from 'sequelize'
import db from '../models/index.mjs'

const { Province_municipality, District } = db.models

const LocationController = {
    /**
    * Get all districts of all provinces. This is used by sequelize to get all districts of all provinces.
    * 
    * @param req - The request object from express server. Cannot be null.
    * @param res - The response object from express server. Cannot be null.
    * 
    * @return { Promise } Resolves to an array of districts in JSON format. Each district has a field named ` province_municipality
    */
    getAllDistrictsOfAllProvinces: async (req, res) => {
        return res.status(200).json(await Province_municipality.findAll({
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
        }))
    },

    /**
    * Get all province municipalities from the database. This is used to populate the list of provinces and municipalities
    * 
    * @param req - The request object from express server
    * @param res - The response object from express server ( not used in this function )
    * 
    * @return { Promise } A promise that fulfills with an array of Province_municipality
    */
    getAllProvincesMunicipalities: async (req, res) => {
        return res.status(200).json(await Province_municipality.findAll({
            attributes: [
                [sequelize.col('province_municipality_id'), 'provinceMunicipalityId'],
                [sequelize.col('province_municipality'), 'provinceMunicipality'],
            ],
            order: [['provinceMunicipalityId', 'ASC']],
        }))
    },

    /**
    * Get all districts of a province. This is used by Sequelize to get all districts of a province.
    * 
    * @param req - The request object from express server. { String } provinceMunicipalityId The ID of the province.
    * @param res
    * 
    * @return { Promise } Resolves with an array of districts in JSON format ordered by id. Example request. { String }
    */
    getAllDistrictsOfAProvince: async (req, res) => {
        const provinceMunicipalityId = Number(req.params.provinceMunicipalityId)

        return res.status(200).json(await District.findAll({
            attributes: [
                [sequelize.col('district_id'), 'districtId'],
                [sequelize.col('district'), 'district'],
            ],
            where: {
                province_municipality_id: provinceMunicipalityId,
            },
            order: [['districtId', 'ASC']],
        }))
    },
}

export default LocationController