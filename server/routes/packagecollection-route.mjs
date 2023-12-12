/**
 * @swagger
 * components:
 *  schemas:
 *      PackageCollectionType:
 *          type: object
 *          properties:
 *              typeId:
 *                  type: integer
 *                  description: The unique identifier for the package collection type.
 *              packageCollectionType:
 *                  type: string
 *                  description: The name of the package collection type.
 *          required:
 *              - packageCollectionType
 *          example:
 *              typeId: 1
 *              packageCollectionType: "Regular"
 *      PackageCollection:
 *          type: object
 *          properties:
 *              packageCollectionId:
 *                  type: integer
 *                  description: The unique identifier for the package collection.
 *              packageCollectionTypeId:
 *                  type: integer
 *                  description: The identifier for the package collection type.
 *          required:
 *              - packageCollectionTypeId
 *          example:
 *              packageCollectionId: 101
 *              packageCollectionTypeId: 1
 */

/**
 * @swagger
 * tags:
 *  name: Package collection
 *  description: The package collection API
 */

import { Router } from 'express'
import PackageCollectionController from "../controllers/PackCollectionController.mjs"

const router = Router()

/**
 * @swagger
 * /collections:
 *  post:
 *      summary: Create Package Collection
 *      tags: [Package collection]
 *      description: Create a new package collection with associated packages and status details.
 *      requestBody:
 *          required: true
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          packageIds:
 *                              type: array
 *                              items:
 *                                  type: integer
 *                              description: The list of package ids to be included in the collection.
 *                          packageCollectionTypeId:
 *                              type: integer
 *                              description: The ID of the package collection type.
 *                          statusId:
 *                              type: integer
 *                              description: The ID of the status associated with the collection.
 *                          location:
 *                              type: string
 *                              description: The location associated with the status details.
 *                      required:
 *                          - packageIds
 *                          - packageCollectionTypeId
 *                          - statusId
 *                          - location
 *      responses:
 *          '200':
 *              description: Successful package collection creation
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              packageCollectionId:
 *                                  type: integer
 *                                  description: The ID of the created package collection.
 *                              time:
 *                                  type: string
 *                                  description: The timestamp of the package collection creation.
 *                      example:
 *                          packageCollectionId: 28
 *                          time: 2023-12-12 18:19:10
 *          '500':
 *              description: Internal Server Error
 *              content:
 *                  application/json:
 *                      example:
 *                          message: "Something went wrong"
 *                          error: "Error details"
 */
router.post('/collections', PackageCollectionController.create)

export default router