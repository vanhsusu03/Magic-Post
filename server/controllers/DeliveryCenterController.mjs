import sequelize from 'sequelize'
import db from '../models/index.mjs'

const { Delivery_center, District, Package, Status_detail, Package_status } = db.models

const DeliveryCenterController = {
    /**
    * Get all delivery centers for a district. This is used to determine which provinces are associated with a particular district.
    * 
    * @param req - The request object from express server. [ req ]
    * @param res - The response object from express server. [ res ]
    * 
    * @return { Promise } Resolves with an array of delivery centers or rejects with an error message. The array is ordered by districtId
    */
    getAllDeliveryCenters: async (req, res) => {
        try {
            const ans = await District.findAll({
                attributes: [
                    [sequelize.col('district.district_id'), 'districtId'],
                    [sequelize.col('district.province_municipality_id'), 'provinceMunicipalityId'],
                    [sequelize.col('district'), 'district'],
                ],
                include: {
                    model: Delivery_center,
                    attributes: [
                        [sequelize.col('delivery_center_id'), 'deliveryCenterId'],
                        [sequelize.col('warehouse_id'), 'warehouseId'],
                        [sequelize.col('address'), 'address'],
                    ],
                    required: true,
                },
                order: [
                    ['districtId', 'ASC'],
                    [sequelize.col('delivery_center_id'), 'ASC'],
                ],
            })
            res.status(200).json(ans)
        } catch (err) {
            console.log(err)
            res.status(500).json({
                message: 'Something went wrong',
                error: err.message
            })
        }
    },

    /**
    * Creates a delivery center in the DB. Expects a POST request with a JSON object in the body
    * 
    * @param req - Request object from express server
    * @param res - Response object from express server ( error response will contain error message )
    * 
    * @return { Promise } Resolves with the delivery center id on success and a 500 if there was an error
    */
    createDeliveryCenter: async (req, res) => {
        try {
            const { districtId, warehouseId, address } = req.body

            const deliveryCenter = await Delivery_center.create({
                district_id: districtId,
                warehouse_id: warehouseId,
                address: address
            })
            res.status(200).json({
                deliveryCenterId: deliveryCenter.delivery_center_id,
                districtId: deliveryCenter.district_id,
                warehouseId: deliveryCenter.warehouse_id,
                address: deliveryCenter.address
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({
                message: 'Something went wrong',
                error: err.message
            })
        }
    },

    /**
    * Update a delivery center in the database. This is a PUT method and should be used for updating an existing warehouse's address
    * 
    * @param req - Request object from express server
    * @param res - Response object from express server ( error response will be JSON )
    * 
    * @return { Object } response object from express server ( success response will be JSON ) or error object ( error response will be a JSON object
    */
    updateDeliveryCenter: async (req, res) => {
        try {
            const deliveryCenterId = Number(req.params.deliveryCenterId)
            const { warehouseId, address } = req.body
            
            if (address && warehouseId) {
                await Delivery_center.update({
                    warehouse_id: warehouseId,
                    address: address
                }, {
                    where: {
                        delivery_center_id: deliveryCenterId
                    }
                })
                res.status(200).json({
                    deliveryCenterId,
                    warehouseId,
                    address
                })
            }
            else if (address) {
                await Delivery_center.update({
                    address: address
                }, {
                    where: {
                        delivery_center_id: deliveryCenterId
                    }
                })
                res.status(200).json({
                    deliveryCenterId,
                    address
                })
            } else if (warehouseId) {
                await Delivery_center.update({
                    warehouse_id: warehouseId,
                }, {
                    where: {
                        delivery_center_id: deliveryCenterId
                    }
                })
                res.status(200).json({
                    deliveryCenterId,
                    warehouseId
                })
            } else {
                res.status(200).json({
                    message: 'Nothing to update',
                })
            }
        } catch (err) {
            console.log(err)
            res.status(500).json({
                message: 'Something went wrong',
                error: err.message
            })
        }
    },

    /**
    * Remove a delivery center from the database by its id This is used to remove a delivery center from the database
    * 
    * @param req - Request object from express server with all data required for deletion
    * @param res - Response object from express server with error code and message
    * 
    * @return { Object } Data from AWS with status code and error message if there was an error in the deletion
    */
    removeADeliveryCenter: async (req, res) => {
        try {
            const deliveryCenterId = Number(req.params.deliveryCenterId)

            await Delivery_center.destroy({
                where: {
                    delivery_center_id: deliveryCenterId
                }
            })

            res.status(200).json({
                message: 'success',
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({
                message: 'Something went wrong',
                error: err.message
            })
        }
    },

    getPackages: async (req, res) => {
        try {
            const deliveryCenterId = Number(req.params.deliveryCenterId)
            const statusId = req.body.statusId
            const delveryCenterType = req.body.delveryCenterType

            let condition = {}
            let conditionDeliveryCenter
            if (statusId) {
                condition = {
                    where: {
                        status_id: statusId
                    }
                }
            }
            if (delveryCenterType == "send") {
                conditionDeliveryCenter = {
                    delivery_center_send_id: deliveryCenterId
                }
            } else if (delveryCenterType == "receive") {
                conditionDeliveryCenter = {
                    delivery_center_receive_id: deliveryCenterId
                }
            }

            const ans = await Package.findAll({
                attributes: [
                    [sequelize.col('package.package_id'), 'packageId'],
                    [sequelize.col('package.package_type_id'), 'packageTypeId'],
                    [sequelize.col('delivery_center_send_id'), 'deliveryCenterSendId'],
                    [sequelize.col('delivery_center_receive_id'), 'deliveryCenterReceiveId'],
                    [sequelize.col('weight_gram'), 'weightGram'],
                    [sequelize.col('cost'), 'cost'],
                    [sequelize.col('COD_amount'), 'codAmount'],
                    [sequelize.col('sender_address'), 'senderAddress'],
                    [sequelize.col('receiver_address'), 'receiverAddress'],
                    [sequelize.col('sender_name'), 'senderName'],
                    [sequelize.col('receiver_name'), 'receiverName'],
                    [sequelize.col('sender_phone'), 'senderPhone'],
                    [sequelize.col('receiver_phone'), 'receiverPhone']
                ],
                include: {
                    model: Status_detail,
                    attributes: [
                        [sequelize.col('status_id'), 'statusId'],
                        [sequelize.col('time'), 'time'],
                        [sequelize.col('location'), 'location']
                    ],
                    condition,
                    include: {
                        model: Package_status,
                        attributes: [
                            [sequelize.col('package_status'), 'packageStatus']
                        ]
                    },
                    order: [[sequelize.col('time'), 'ASC']]
                },
                where: conditionDeliveryCenter,
                order: [
                    [{ model: Status_detail }, 'time', 'ASC']
                ]
            })

            res.status(200).json(ans)
        } catch (err) {
            console.log(err)
            res.status(500).json({
                message: 'Something went wrong',
                error: err.message
            })
        }
    },

}

export default DeliveryCenterController