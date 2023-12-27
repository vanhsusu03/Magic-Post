import sequelize from 'sequelize'
import { format } from 'date-fns'
import db from '../models/index.mjs'

const { Package, Package_status, Status_detail } = db.models

const PackageController = {
    /**
    * POST / Confirm a Vietnam package and add it to the database. This is used by the confirm_mail function to confirm a package
    * 
    * @param req - The request object from express server
    * @param res - The response object from express server ( unused )
    * 
    * @return { Promise } Resolves with the result of the confirm request or rejects with the reason for rejection
    */
    confirm: async (req, res) => {
        try {
            const { packageTypeId, deliveryCenterSendId, deliveryCenterReceiveId,
                weightGram, cost, codAmount, senderAddress, receiverAddress,
                senderName, receiverName, senderPhone, receiverPhone, location } = req.body

            const pkg = await Package.create({
                package_type_id: packageTypeId,
                delivery_center_send_id: deliveryCenterSendId,
                delivery_center_receive_id: deliveryCenterReceiveId,
                weight_gram: weightGram,
                cost: cost,
                COD_amount: codAmount == '' ? 0 : codAmount,
                sender_address: senderAddress,
                receiver_address: receiverAddress,
                sender_name: senderName,
                receiver_name: receiverName,
                sender_phone: senderPhone,
                receiver_phone: receiverPhone
            })

            const now = new Date()
            const vietnamTime = format(now, 'yyyy-MM-dd HH:mm:ss', { timeZone: 'Asia/Ho_Chi_Minh' })
            const statusDetail = await Status_detail.create({
                status_id: 1,
                time: vietnamTime,
                location: location,
                package_id: pkg.package_id
            })

            res.status(200).json({
                package: {
                    packageId: pkg.package_id,
                    packageTypeId: pkg.package_type_id,
                    deliveryCenterSendId: pkg.delivery_center_send_id,
                    deliveryCenterReceiveId: pkg.delivery_center_receive_id,
                    weightGram: pkg.weight_gram,
                    cost: pkg.cost,
                    codAmount: pkg.COD_amount,
                    senderAddress: pkg.sender_address,
                    receiverAddress: pkg.receiver_address,
                    senderName: pkg.sender_name,
                    receiverName: pkg.receiver_name,
                    senderPhone: pkg.sender_phone,
                    receiverPhone: pkg.receiver_phone
                },
                statusDetail: {
                    statusId: statusDetail.status_id,
                    time: statusDetail.time,
                    location: statusDetail.location,
                    packageId: statusDetail.package_id
                }
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
    * Updates delivery status for a package. Update database.
    * 
    * @param req - request object from express server
    * @param res - response object from express server ( error or success )
    * 
    * @return { object } response object from express server ( success or failure ) note : statusId is the primary key of the
    */
    updateDeliveryStatus: async (req, res) => {
        try {
            const packageId = Number(req.params.packageId)
            const { statusId, location } = req.body

            const now = new Date()
            const vietnamTime = format(now, 'yyyy-MM-dd HH:mm:ss', { timeZone: 'Asia/Ho_Chi_Minh' })
            const statusDetail = await Status_detail.create({
                status_id: statusId,
                time: vietnamTime,
                location: location,
                package_id: packageId
            })

            res.status(200).json({
                statusId: statusDetail.status_id,
                time: statusDetail.time,
                location: statusDetail.location,
                packageId: statusDetail.package_id
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({
                message: 'Something went wrong',
                error: err.message
            })
        }
    },

    deletePackageById: async (req, res) => {
        try {
            const packageId = Number(req.params.packageId)
            
            await Package.destroy({
                where: {
                    package_id: packageId,
                }
            })
            res.status(200).json({
                message: 'Delete successfully!'
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
    * Update delivery status of many packages in the database based on request body. This is used to update the delivery status of many packages
    * 
    * @param req - request object from express server
    * @param res - response object from express server ( write to database )
    * 
    * @return { Promise } - resolves with response body after updating delivery status of many packages in the database is written
    */
    updateDeliveryStatusOfManyPackages: async (req, res) => {
        try {
            let packageIds = req.body.packageIds
            const { statusText, location } = req.body

            if (typeof packageIds === "string") {
                packageIds = packageIds.split(',').map(Number)
            }
            const now = new Date()
            const vietnamTime = format(now, 'yyyy-MM-dd HH:mm:ss', { timeZone: 'Asia/Ho_Chi_Minh' })
            let ans = []
            for (const id of packageIds) {
                const statusDetail = await Status_detail.findAll({
                    attributes: [
                        [sequelize.col('status_id'), 'statusId']
                    ],
                    where: {
                        package_id: id
                    },
                    order: [['time', 'DESC']],
                    raw: true,
                    nest: true
                })

                const t = Number(statusDetail[1].statusId)
                let statusId = 8
                if (statusText == "Delivered") {
                    statusId = 9
                } else if (statusText == "Fail") {
                    statusId = t + 1
                    if (t != 10 && t != 11) {
                        statusId = 10
                    }
                } else {
                    if (t == 8) {
                        statusId = 19
                    } else if (t == 19) {
                        statusId = 20
                    }
                }

                const status = await Status_detail.create({
                    status_id: statusId,
                    time: vietnamTime,
                    location: location,
                    package_id: id
                })

                ans.push({
                    statusId: status.status_id,
                    time: status.time,
                    location: status.location,
                    packageId: status.package_id
                })
            }
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

export default PackageController