import sequelize from 'sequelize'
import db from '../models/index.mjs'

const { Package } = db.models

const PackageController = {
    /**
    * POST / Confirm a package. This will create a new package in the database based on the information sent in the request
    * 
    * @param req - Request object from express server
    * @param res - Response object from express server ( not exposed to us )
    * 
    * @return { Promise } Promise with the package that was created in the form of { packageId : string packageTypeId : string deliveryCenterSendId : string deliveryCenterReceiveId : string weightGram : number codAmount
    */
    confirm: async (req, res) => {
        try {
            const { packageTypeId, deliveryCenterSendId, deliveryCenterReceiveId,
                weightGram, cost, codAmount, senderAddress, receiverAddress,
                senderName, receiverName, senderPhone, receiverPhone } = req.body

            const pkg = await Package.create({
                package_type_id: packageTypeId,
                delivery_center_send_id: deliveryCenterSendId,
                delivery_center_receive_id: deliveryCenterReceiveId,
                weight_gram: weightGram,
                cost: cost,
                COD_amount: codAmount,
                sender_address: senderAddress,
                receiver_address: receiverAddress,
                sender_name: senderName,
                receiver_name: receiverName,
                sender_phone: senderPhone,
                receiver_phone: receiverPhone
            })
            res.status(200).json({
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