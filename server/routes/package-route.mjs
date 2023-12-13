/**
 * @swagger
 * components:
 *  schemas:
 *      PackageType:
 *          type: object
 *          properties:
 *              typeId:
 *                  type: integer
 *                  description: The unique identifier for the package type.
 *              packageType:
 *                  type: string
 *                  description: The name of the package type.
 *          required:
 *              - packageType
 *          example:
 *              typeId: 1
 *              packageType: "Standard"
 *      Package:
 *          type: object
 *          properties:
 *              packageId:
 *                  type: integer
 *                  description: The unique identifier for the package.
 *              packageTypeId:
 *                  type: integer
 *                  description: The identifier for the package type.
 *              deliveryCenterSendId:
 *                  type: integer
 *                  description: The identifier for the sending delivery center.
 *              deliveryCenterReceiveId:
 *                  type: integer
 *                  description: The identifier for the receiving delivery center.
 *              weightGram:
 *                  type: integer
 *                  description: The weight of the package in grams.
 *              cost:
 *                  type: integer
 *                  description: The cost of the package.
 *              codAmount:
 *                  type: integer
 *                  description: The Cash on Delivery (COD) amount (optional).
 *              senderAddress:
 *                  type: string
 *                  description: The address of the package sender.
 *              receiverAddress:
 *                  type: string
 *                  description: The address of the package receiver.
 *              senderName:
 *                  type: string
 *                  description: The name of the package sender.
 *              receiverName:
 *                  type: string
 *                  description: The name of the package receiver.
 *              senderPhone:
 *                  type: string
 *                  description: The phone number of the package sender.
 *              receiverPhone:
 *                  type: string
 *                  description: The phone number of the package receiver.
 *          required:
 *              - packageTypeId
 *              - deliveryCenterSendId
 *              - deliveryCenterReceiveId
 *              - weightGram
 *              - cost
 *              - senderAddress
 *              - receiverAddress
 *              - senderName
 *              - receiverName
 *              - senderPhone
 *              - receiverPhone
 *          example:
 *              packageId: 1
 *              packageTypeId: 1
 *              deliveryCenterSendId: 101
 *              deliveryCenterReceiveId: 102
 *              weightGram: 2000
 *              cost: 50
 *              codAmount: 10
 *              senderAddress: "123 Main St, City"
 *              receiverAddress: "456 Second St, Town"
 *              senderName: "John Doe"
 *              receiverName: "Jane Smith"
 *              senderPhone: "0123456789"
 *              receiverPhone: "0987654321"
 *      PackagePkgCollection:
 *          type: object
 *          properties:
 *              packageId:
 *                  type: integer
 *                  description: The identifier for the package.
 *              packageCollectionId:
 *                  type: integer
 *                  description: The identifier for the package collection.
 *          required:
 *              - packageId
 *              - packageCollectionId
 *          example:
 *              packageId: 1
 *              packageCollectionId: 101
 */

/**
 * @swagger
 * tags:
 *  name: Package
 *  description: The package API
 */

import { Router } from 'express'
import PackageController from "../controllers/PackageController.mjs"

const router = Router()

/**
 * @swagger
 * /packages:
 *  post:
 *      summary: Confirm a new package
 *      tags: [Package]
 *      description: Confirm the details for a new package.
 *      requestBody:
 *          required: true
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          packageTypeId:
 *                              type: integer
 *                              description: The ID of the package type.
 *                          deliveryCenterSendId:
 *                              type: integer
 *                              description: The ID of the sending delivery center.
 *                          deliveryCenterReceiveId:
 *                              type: integer
 *                              description: The ID of the receiving delivery center.
 *                          weightGram:
 *                              type: integer
 *                              description: The weight of the package in grams.
 *                          cost:
 *                              type: integer
 *                              description: The cost of the package.
 *                          codAmount:
 *                              type: integer
 *                              description: The Cash on Delivery (COD) amount, default is 0.
 *                          senderAddress:
 *                              type: string
 *                              description: The address of the sender.
 *                          receiverAddress:
 *                              type: string
 *                              description: The address of the receiver.
 *                          senderName:
 *                              type: string
 *                              description: The name of the sender.
 *                          receiverName:
 *                              type: string
 *                              description: The name of the receiver.
 *                          senderPhone:
 *                              type: string
 *                              description: The phone number of the sender.
 *                          receiverPhone:
 *                              type: string
 *                              description: The phone number of the receiver.
 *                          location:
 *                              type: string
 *                              description: The location associated with the status detail.
 *                      required:
 *                          - packageTypeId
 *                          - deliveryCenterSendId
 *                          - deliveryCenterReceiveId
 *                          - weightGram
 *                          - cost
 *                          - senderAddress
 *                          - receiverAddress
 *                          - senderName
 *                          - receiverName
 *                          - senderPhone
 *                          - receiverPhone
 *                          - location
 *      responses:
 *          '200':
 *              description: Successful confirmation of the package
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              package:
 *                                  $ref: '#/components/schemas/Package'
 *                              statusDetail:
 *                                  $ref: '#/components/schemas/StatusDetail'
 *          '500':
 *              description: Internal Server Error
 *              content:
 *                  application/json:
 *                      example:
 *                          message: "Internal Server Error"
 *                          error: "Error details"
 */
router.post('/packages', PackageController.confirm)

/**
 * @swagger
 * /packages/{packageId}/statuses:
 *  put:
 *      summary: Update Delivery Status
 *      tags: [Package]
 *      description: Update the delivery status for a specific package.
 *      parameters:
 *        - in: path
 *          name: packageId
 *          required: true
 *          description: The ID of the package.
 *          schema:
 *              type: integer
 *      requestBody:
 *          required: true
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          statusId:
 *                              type: integer
 *                              description: The ID of the status to be updated.
 *                          location:
 *                              type: string
 *                              description: The location associated with the updated status.
 *                      required:
 *                          - statusId
 *                          - location
 *                      example:
 *                          statusId: 12
 *                          location: "123 Xuân Thủy"
 *      responses:
 *          '200':
 *              description: Successful update of the delivery status for the package
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/StatusDetail"
 *          '500':
 *              description: Internal Server Error
 *              content:
 *                  application/json:
 *                      example:
 *                          message: "Something went wrong"
 *                          error: "Error details"
 */
router.put('/packages/:packageId/statuses', PackageController.updateDeliveryStatus)

/**
 * @swagger
 * /packages/statuses:
 *  put:
 *      summary: Update Delivery Status of Many Packages
 *      tags: [Package]
 *      description: Update the delivery status for multiple packages.
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
 *                              description: An array of package IDs to update the delivery status.
 *                          statusText:
 *                              type: string
 *                              description: The status text to be applied.
 *                          location:
 *                              type: string
 *                              description: The location associated with the updated status.
 *                      required:
 *                          - packageIds
 *                          - statusText
 *                          - location
 *      responses:
 *          '200':
 *              description: Successful update of the delivery status for multiple packages
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: "#/components/schemas/StatusDetail"
 *          '500':
 *              description: Internal Server Error
 *              content:
 *                  application/json:
 *                      example:
 *                          message: "Something went wrong"
 *                          error: "Error details"
 */
router.put('/packages/statuses', PackageController.updateDeliveryStatusOfManyPackages)

export default router