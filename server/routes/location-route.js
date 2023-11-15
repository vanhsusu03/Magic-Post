const express = require('express');
const locationController = require('../controllers/LocationController');
const router = express.Router();

/**
 * @swagger
 * /districts
 *  get:
 *      summary: Get all districts of all provinces
 *      description: Retrieve a list of districts basic information from the database.
 *      responses:
 *          200:
 *              description: The list of districts.
 */
router.get('/districts', locationController.getAllDistrictsOfAllProvinces);

/**
 * @swagger
 * /provinces
 *  get:
 *      summary: Get all provinces and municipalities
 *      description: Retrieve a list of provinces and municipalities basic information from the database.
 *      responses:
 *          200:
 *              description: A list of provinces and municipalities.
 */
router.get('/provinces', locationController.getAllProvincesMunicipalities);

/**
 * @swagger
 * /provinces/:provinceMunicipalityId/districts
 *  get:
 *      summary: Get all districts by province or municipality id
 *      description: Retrieve a list of districts basic information from the database.
 *      responses:
 *          200:
 *              description: A list of districts.
 */
router.get('/provinces/:provinceMunicipalityId/districts', locationController.getAllDistrictsOfAProvince);

module.exports = router;