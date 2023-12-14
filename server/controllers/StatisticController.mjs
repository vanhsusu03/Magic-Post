import sequelize from 'sequelize'
import db from '../models/index.mjs'

const { Delivery_center, Warehouse, Package_type,
    Package, Status_detail } = db.models

const StatisticController = {
    /**
    * Get packages from delivery center based on type ( send / receive ). This is used to determine package weight and COD_amount
    * 
    * @param req - The request object from express server
    * @param res - The response object from express server ( promise )
    * 
    * @return { Promise } Package list in format { package_id : number delivery_center_send_id : number delivery_center_receive_id : number
    */
    getByDeliveryCenter: async (req, res) => {
        try {
            const deliveryCenterId = Number(req.params.deliveryCenterId)
            const type = req.params.type

            let statusId
            if (type == "send") {
                statusId = 2
            } else if (type == "receive") {
                statusId = 7
            }
            const p = await Package.findAll({
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
                    [sequelize.col('receiver_phone'), 'receiverPhone'],
                    [sequelize.col('package_type'), 'packageType']
                ],
                include: [
                    { 
                        model: Package_type,
                        attributes: []
                    },
                    {
                        model: Status_detail,
                        attributes: [
                            [sequelize.col('status_id'), 'statusId'],
                            [sequelize.col('time'), 'time'],
                            [sequelize.col('location'), 'location']
                        ]
                    }
                ],
                where: { 
                    delivery_center_receive_id: deliveryCenterId,
                    '$status_details.status_id$': statusId
                },
                order: [
                    [{ model: Status_detail }, 'time', 'ASC'] // Order by 'time' column in ascending order
                ]
            })
            res.status(200).json(p)
        } catch (err) {
            console.log(err)
            res.status(500).json({
                message: 'Something went wrong',
                error: err.message
            })
        }
    },

    // getByWarehouse: async (req, res) => {
    //     try {
    //         const warehouseId = Number(req.params.warehouseId)
    //         const type = req.params.type

    //         let statusId
    //         if (type == "send") {
    //             statusId = 2
    //         } else if (type == "receive") {
    //             statusId = 7
    //         }
    //         const p = await Package.findAll({
    //             attributes: [
    //                 [sequelize.col('package.package_id'), 'packageId'],
    //                 [sequelize.col('package.package_type_id'), 'packageTypeId'],
    //                 [sequelize.col('delivery_center_send_id'), 'deliveryCenterSendId'],
    //                 [sequelize.col('delivery_center_receive_id'), 'deliveryCenterReceiveId'],
    //                 [sequelize.col('weight_gram'), 'weightGram'],
    //                 [sequelize.col('cost'), 'cost'],
    //                 [sequelize.col('COD_amount'), 'codAmount'],
    //                 [sequelize.col('sender_address'), 'senderAddress'],
    //                 [sequelize.col('receiver_address'), 'receiverAddress'],
    //                 [sequelize.col('sender_name'), 'senderName'],
    //                 [sequelize.col('receiver_name'), 'receiverName'],
    //                 [sequelize.col('sender_phone'), 'senderPhone'],
    //                 [sequelize.col('receiver_phone'), 'receiverPhone'],
    //                 [sequelize.col('package_type'), 'packageType']
    //             ],
    //             include: [
    //                 { 
    //                     model: Package_type,
    //                     attributes: []
    //                 },
    //                 {
    //                     model: Status_detail,
    //                     attributes: [
    //                         [sequelize.col('status_id'), 'statusId'],
    //                         [sequelize.col('time'), 'time'],
    //                         [sequelize.col('location'), 'location']
    //                     ]
    //                 }
    //             ],
    //             where: { 
    //                 delivery_center_receive_id: deliveryCenterId,
    //                 '$status_details.status_id$': statusId
    //             },
    //             order: [
    //                 [{ model: Status_detail }, 'time', 'ASC'] // Order by 'time' column in ascending order
    //             ]
    //         })
    //         res.status(200).json(p)
    //     } catch (err) {
    //         console.log(err)
    //         res.status(500).json({
    //             message: 'Something went wrong',
    //             error: err.message
    //         })
    //     }
    // },
}

export default StatisticController