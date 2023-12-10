/**
 * @swagger
 * components:
 *  schemas:
 *      Warehouse:
 *          type: object
 *          properties:
 *              warehouseId:
 *                  type: integer
 *                  description: The unique identifier for the warehouse.
 *              provinceMunicipalityId:
 *                  type: integer
 *                  description: The identifier for the province or municipality which warehouse belongs to.
 *              address:
 *                  type: string
 *                  description: The address of the warehouse.
 *          required:
 *              - provinceMunicipalityId
 *              - address
 *          example:
 *              warehouseId: 1
 *              provinceMunicipalityId: 1
 *              address: "144 Hồ Tùng Mậu, Cầu Giấy, Hà Nội"
 */

/**
 * @swagger
 * tags:
 *  name: Warehouse
 *  description: The warehouse API
 */

import { Router } from 'express'
import WarehouseController from "../controllers/WarehouseController.mjs"

const router = Router()

/**
 * @swagger
 * /warehouses:
 *  get:
 *      summary: Get all warehouses
 *      tags: [Warehouse]
 *      description: Retrieve a list of all warehouses grouped by provinces/municipalities.
 *      responses:
 *          '200':
 *              description: Successful operation
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Warehouse'
 *          '500':
 *              description: Internal Server Error
 */
router.get('/warehouses', WarehouseController.getAllWarehouses)

/**
 * @swagger
 * /warehouses:
 *  post:
 *      summary: Create a new warehouse
 *      tags: [Warehouse]
 *      description: Create a new warehouse associated with a province/municipality.
 *      requestBody:
 *          required: true
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/Warehouse'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Warehouse'
 *      responses:
 *          '200':
 *              description: Warehouse successfully created
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Warehouse'
 *          '500':
 *              description: Internal Server Error
 *              content:
 *                  application/json:
 *                      example:
 *                          message: "Internal Server Error"
 *                          error: "Error details"
 */
router.post('/warehouses', WarehouseController.createWarehouse)

/**
 * @swagger
 * /warehouses/{warehouseId}:
 *  put:
 *      summary: Update an existing warehouse
 *      tags: [Warehouse]
 *      description: Update the address of an existing warehouse.
 *      parameters:
 *        - in: path
 *          name: warehouseId
 *          required: true
 *          description: The unique identifier for the warehouse.
 *          schema:
 *              type: integer
 *      requestBody:
 *          required: true
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          address:
 *                              type: string
 *                              description: The updated address of the warehouse.
 *                      required:
 *                          - address
 *                      example:
 *                          address: "123 Xuân Thủy"
 *      responses:
 *          '200':
 *              description: Warehouse successfully updated
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Warehouse'
 *          '500':
 *              description: Internal Server Error
 *              content:
 *                  application/json:
 *                      example:
 *                          message: "Internal Server Error"
 *                          error: "Error details"
 */
router.put('/warehouses/:warehouseId', WarehouseController.updateWarehouse)

export default router