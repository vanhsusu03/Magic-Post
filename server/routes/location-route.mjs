/**
 * @swagger
 * components:
 *  schemas:
 *      ProvinceMunicipality:
 *          type: object
 *          properties:
 *              provinceMunicipalityId:
 *                  type: integer
 *                  description: The unique identifier for the province or municipality.
 *              provinceMunicipality:
 *                  type: string
 *                  description: The name of the province or municipality.
 *          required:
 *              - provinceMunicipality
 *          example:
 *              provinceMunicipalityId: 1
 *              provinceMunicipality: "Province A"
 *      District:
 *          type: object
 *          properties:
 *              districtId:
 *                  type: integer
 *                  description: The unique identifier for the district.
 *              provinceMunicipalityId:
 *                  type: integer
 *                  description: The identifier for the province or municipality associated with the district.
 *              district:
 *                  type: string
 *                  description: The name of the district.
 *          required:
 *              - provinceMunicipalityId
 *              - district
 *          example:
 *              districtId: 1
 *              provinceMunicipalityId: 101
 *              district: "Cầu Giấy"
 */

/**
 * @swagger
 * tags:
 *  name: Location
 *  description: The location API
 */

import { Router } from 'express'
import locationController from "../controllers/LocationController.mjs"

const router = Router();

/**
 * @swagger
 * /districts:
 *  get:
 *      summary: Get all districts of all provinces/municipalities
 *      tags: [Location]
 *      description: Retrieve a list of all districts grouped by provinces/municipalities.
 *      responses:
 *          '200':
 *              description: A list of districts of all provinces/municipalities successfully retrieved.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/District'
 *          '500':
 *              description: Internal Server Error
 */
router.get('/districts', locationController.getAllDistrictsOfAllProvinces)

/**
 * @swagger
 * /provinces:
 *  get:
 *      summary: Get all provinces/municipalities
 *      tags: [Location]
 *      description: Retrieve a list of all provinces/municipalities.
 *      responses:
 *          '200':
 *              description: A list of provinces/municipalities successfully retrieved.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/ProvinceMunicipality'
 *          '500':
 *              description: Internal Server Error
 */
router.get('/provinces', locationController.getAllProvincesMunicipalities)

/**
 * @swagger
 * /provinces/{provinceMunicipalityId}/districts:
 *  get:
 *      summary: Get all districts of a specific province/municipality
 *      tags: [Location]
 *      description: Retrieve a list of all districts associated with a specific province/municipality.
 *      parameters:
 *        - in: path
 *          name: provinceMunicipalityId
 *          required: true
 *          description: The unique identifier for the province/municipality.
 *          schema:
 *              type: integer
 *      responses:
 *          '200':
 *              description: A list of districts associated with the specified province/municipality successfully retrieved.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/District'
 *          '500':
 *              description: Internal Server Error
 */
router.get('/provinces/:provinceMunicipalityId/districts', locationController.getAllDistrictsOfAProvince)

/**
 * @swagger
 * /provinces/{provinceMunicipalityId}/offices:
 *  get:
 *      summary: Get Offices by Province
 *      tags: [Location]
 *      description: Retrieve offices (warehouses and delivery centers) in a specific province or municipality.
 *      parameters:
 *        - in: path
 *          name: provinceMunicipalityId
 *          required: true
 *          description: The ID of the province or municipality.
 *          schema:
 *              type: integer
 *      responses:
 *          '200':
 *              description: Successful retrieval of offices
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/DeliveryCenter'
 *          '500':
 *              description: Internal Server Error
 *              content:
 *                  application/json:
 *                      example:
 *                          response: "Something went wrong while retrieving offices"
 */
router.get('/provinces/:provinceMunicipalityId/offices', locationController.getOfficeByProvince)

export default router