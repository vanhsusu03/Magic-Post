/**
 * @swagger
 * components:
 *  schemas:
 *      PackageStatus:
 *          type: object
 *          properties:
 *              statusId:
 *                  type: integer
 *                  description: The unique identifier for the package status.
 *              packageStatus:
 *                  type: string
 *                  description: The name of the package status.
 *          required:
 *              - packageStatus
 *          example:
 *              statusId: 1
 *              packageStatus: "In Transit"
 *      StatusDetail:
 *          type: object
 *          properties:
 *              statusId:
 *                  type: integer
 *                  description: The identifier for the package status.
 *              time:
 *                  type: string
 *                  format: date-time
 *                  description: The date and time of the status update.
 *              location:
 *                  type: string
 *                  description: The location associated with the status update.
 *              packageId:
 *                  type: integer
 *                  description: The identifier for the package.
 *          required:
 *              - statusId
 *              - time
 *              - location
 *              - packageId
 *          example:
 *              statusId: 1
 *              time: "2023-01-01T12:00:00"
 *              location: "144 Xuân Thủy"
 *              packageId: 123
 */

/**
 * @swagger
 * tags:
 *  name: Tracking
 *  description: The tracking API
 */

import { Router } from 'express'
import SearchingController from "../controllers/SearchingController.mjs"

const router = Router()

/**
 * @swagger
 * /search/{code}:
 *  get:
 *      summary: Get Package Status
 *      tags: [Tracking]
 *      description: Get the status of a package based on its code.
 *      parameters:
 *        - in: path
 *          name: code
 *          required: true
 *          description: The code of the package to search for.
 *          schema:
 *              type: string
 *      responses:
 *          '200':
 *              description: Successful retrieval of the package status
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              PackageType:
 *                                  $ref: '#/components/schemas/PackageType'
 *                              Package:
 *                                  $ref: '#/components/schemas/Package'
 *                              PackageStatus:
 *                                  $ref: '#/components/schemas/PackageStatus'
 *                              StatusDetail:
 *                                  $ref: '#/components/schemas/StatusDetail'
 *          '500':
 *              description: Internal Server Error
 *              content:
 *                  application/json:
 *                      example:
 *                          message: "Something went wrong"
 *                          error: "Error details"
 */
router.get('/search/:code', SearchingController.getPackageStatus)

export default router