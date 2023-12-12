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
}

export default PackageController