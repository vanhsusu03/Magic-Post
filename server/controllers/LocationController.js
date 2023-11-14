const sequelize = require('sequelize');
const {
    models: { Province_municipality, District }
} = require('../models');

class LocationController {
    /**
    * Get all province municipalities from the database. This is used to load all data from the database.
    * 
    * @param req - The request object from express server. Cannot be null.
    * @param res - The response object from express server. Cannot be null.
    * @param next - The next middleware function in the chain. Cannot be null.
    * 
    * @return { Promise } A promise that fulfills with an array of Province_municipality
    */
    async getAllProvincesMunicipalities(req, res, next) {
        return res.status(200).json(await Province_municipality.findAll({
            attributes: [
                [sequelize.col('province_municipality_id'), 'provinceMunicipalityId'],
                [sequelize.col('province_municipality'), 'provinceMunicipality'],
            ],
            order: [['provinceMunicipalityId', 'ASC']],
        }));
    }

    /**
    * Get all districts of a province. This is used by Sequelize#getProvince to get a list of all districts associated with a given province municipality
    * 
    * @param req - The request object from express server
    * @param res - The response object from express server ( not exposed to end user )
    * @param next - The next middleware function in the chain. Used for asynchronous requests
    * 
    * @return { Promise } Resolves with an array of all districts that belong to a given province
    */
    async getAllDistrictsOfAProvince(req, res, next) {
        const provinceMunicipalityId = Number(req.params.provinceMunicipalityId);

        return res.status(200).json(await District.findAll({
            attributes: [
                [sequelize.col('district_id'), 'districtId'],
                [sequelize.col('district'), 'district'],
            ],
            where: {
                province_municipality_id: provinceMunicipalityId,
            },
            order: [['districtId', 'ASC']],
        }));
    }
}

module.exports = new LocationController();