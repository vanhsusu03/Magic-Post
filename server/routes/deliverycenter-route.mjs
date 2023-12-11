/**
 * @swagger
 * components:
 *  schemas:
 *      DeliveryCenter:
 *          type: object
 *          properties:
 *              deliveryCenterId:
 *                  type: integer
 *                  description: The unique identifier for the delivery center.
 *              districtId:
 *                  type: integer
 *                  description: The identifier for the district which delivery center belongs to.
 *              warehouseId:
 *                  type: integer
 *                  description: The identifier for the warehouse associated with the delivery center.
 *              address:
 *                  type: string
 *                  description: The address of the delivery center.
 *          required:
 *              - districtId
 *              - warehouseId
 *              - address
 *          example:
 *              deliveryCenterId: 34
 *              districtId: 5
 *              warehouseId: 7
 *              address: "144 Xuân Thủy, Cầu Giấy"
 */

/**
 * @swagger
 * tags:
 *  name: Delivery center
 *  description: The delivery center API
 */

import { Router } from 'express'
import DeliveryCenterController from "../controllers/DeliveryCenterController.mjs"

const router = Router()

/**
 * @swagger
 * /deliveryCenters:
 *  get:
 *      summary: Get all delivery centers
 *      tags: [Delivery center]
 *      description: Retrieve a list of all delivery centers grouped by districts.
 *      responses:
 *          '200':
 *              description: Successful operation
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
 *                          message: "Internal Server Error"
 *                          error: "Error details"
 */
router.get('/deliveryCenters', DeliveryCenterController.getAllDeliveryCenters)

/**
 * @swagger
 * /deliveryCenters:
 *  post:
 *      summary: Create a new delivery center
 *      tags: [Delivery center]
 *      description: Create a new delivery center associated with a district.
 *      requestBody:
 *          required: true
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/DeliveryCenter'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/DeliveryCenter'
 *      responses:
 *          '200':
 *              description: Delivery center successfully created
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/DeliveryCenter'
 *          '500':
 *              description: Internal Server Error
 *              content:
 *                  application/json:
 *                      example:
 *                          message: "Internal Server Error"
 *                          error: "Error details"
 */
router.post('/deliveryCenters', DeliveryCenterController.createDeliveryCenter)

/**
 * @swagger
 * /deliveryCenters/{deliveryCenterId}:
 *  put:
 *      summary: Update an existing delivery center
 *      tags: [Delivery center]
 *      description: Update the warehouse and address of an existing delivery center.
 *      parameters:
 *        - in: path
 *          name: deliveryCenterId
 *          required: true
 *          description: The unique identifier for the delivery center.
 *          schema:
 *              type: integer
 *      requestBody:
 *          required: true
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          warehouseId:
 *                              type: integer
 *                              description: The unique identifier for the updated warehouse.
 *                          address:
 *                              type: string
 *                              description: The updated address of the warehouse.
 *                      example:
 *                          warehouseId: 3
 *                          address: "123 Xuân Thủy"
 *      responses:
 *          '200':
 *              description: Delivery center successfully updated
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/DeliveryCenter'
 *          '500':
 *              description: Internal Server Error
 *              content:
 *                  application/json:
 *                      example:
 *                          message: "Internal Server Error"
 *                          error: "Error details"
 */
router.put('/deliveryCenters/:deliveryCenterId', DeliveryCenterController.updateDeliveryCenter)

export default router