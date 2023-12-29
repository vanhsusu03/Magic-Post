/**
 * @swagger
 * tags:
 *  name: Statistic
 *  description: The statistic API
 */

import { Router } from 'express'
import StatisticController from "../controllers/StatisticController.mjs"
import { isAuth, isTeller, isDeliveryCenterManager, isWarehouseManager } from "../middlewares/Auth.mjs"

const router = Router()

// /**
//  * @swagger
//  * /statistic/{deliveryCenterId}/{type}/{day}:
//  *  get:
//  *      summary: Get Packages by Delivery Center and Type
//  *      tags: [Statistic]
//  *      description: Get packages by delivery center ID and type (send or receive).
//  *      parameters:
//  *        - in: path
//  *          name: deliveryCenterId
//  *          required: true
//  *          description: The ID of the delivery center.
//  *          schema:
//  *              type: integer
//  *        - in: path
//  *          name: type
//  *          required: true
//  *          description: The type of packages to retrieve (send or receive).
//  *          schema:
//  *              type: string
//  *              enum: [send, receive]
//  *        - in: path
//  *          name: day
//  *          required: true
//  *          description: The day, example 2023-11-28
//  *          schema:
//  *              type: string
//  *              format: date
//  *      responses:
//  *          '200':
//  *              description: Successful retrieval of packages
//  *              content:
//  *                  application/json:
//  *                      schema:
//  *                          type: array
//  *                          items:
//  *                              type: object
//  *                              properties:
//  *                                  packageId:
//  *                                      type: integer
//  *                                      description: The ID of the package.
//  *                                  packageTypeId:
//  *                                      type: integer
//  *                                      description: The ID of the package type.
//  *                                  deliveryCenterSendId:
//  *                                      type: integer
//  *                                      description: The ID of the delivery center where the package was sent from.
//  *                                  deliveryCenterReceiveId:
//  *                                      type: integer
//  *                                      description: The ID of the delivery center where the package is received.
//  *                                  weightGram:
//  *                                      type: integer
//  *                                      description: The weight of the package in grams.
//  *                                  cost:
//  *                                      type: number
//  *                                      description: The cost of the package.
//  *                                  codAmount:
//  *                                      type: number
//  *                                      description: The Cash on Delivery (COD) amount for the package.
//  *                                  senderAddress:
//  *                                      type: string
//  *                                      description: The address of the package sender.
//  *                                  receiverAddress:
//  *                                      type: string
//  *                                      description: The address of the package receiver.
//  *                                  senderName:
//  *                                      type: string
//  *                                      description: The name of the package sender.
//  *                                  receiverName:
//  *                                      type: string
//  *                                      description: The name of the package receiver.
//  *                                  senderPhone:
//  *                                      type: string
//  *                                      description: The phone number of the package sender.
//  *                                  receiverPhone:
//  *                                      type: string
//  *                                      description: The phone number of the package receiver.
//  *                                  packageType:
//  *                                      type: string
//  *                                      description: The type of the package.
//  *                                  statusId:
//  *                                      type: integer
//  *                                      description: The ID of the status associated with the package.
//  *                                  time:
//  *                                      type: string
//  *                                      format: date-time
//  *                                      description: The timestamp when the status was updated.
//  *                                  location:
//  *                                      type: string
//  *                                      description: The location associated with the status.
//  *                                  packageStatus:
//  *                                      type: string
//  *                                      description: The textual description of the package status.
//  *          '500':
//  *              description: Internal Server Error
//  *              content:
//  *                  application/json:
//  *                      example:
//  *                          message: "Something went wrong"
//  *                          error: "Error details"
//  */
// router.get('/statistic/:deliveryCenterId/:type/:day', StatisticController.getByDeliveryCenterDay)

router.get('/statistic/:statusId/packages', isAuth, isTeller, StatisticController.getPackagesByStatusId)

router.get('/statistic/deliveryCenters/:deliveryCenterId/:statusId/packages', isAuth, StatisticController.getPackagesByDelveryCenter)

router.get('/statistic/warehouses/:warehouseId/:statusId/packages', isAuth, isWarehouseManager, StatisticController.getPackagesByWarehouse)

export default router