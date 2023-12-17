import sequelize from 'sequelize'
import db from '../models/index.mjs'

const { Package_type, Package, Package_status, Status_detail } = db.models

const SearchingController = {
    /**
    * Retrieve package status from database based on package code. This is used to determine if a package is ready to be transferred or not
    * 
    * @param req - The request object from sequelize.
    * @param res - The response object from sequelize. ( undefined )
    * 
    * @return { Promise } The status of the package as an object with keys : senderAddress receiverAddress codAmount cost costC
    */
    getPackageStatus: async (req, res) => {
        try {
            const packageId = Number(req.params.code.replace(/\D/g, ''))

            const status = await Package.findByPk(packageId, {
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
                        ],
                        include: {
                            model: Package_status,
                            attributes: [
                                [sequelize.col('package_status'), 'packageStatus']
                            ]
                        },
                        order: [[sequelize.col('time'), 'ASC']]
                    }
                ],
                order: [
                    [{ model: Status_detail }, 'time', 'ASC'] // Order by 'time' column in ascending order
                ]
            })

            res.status(200).json(status)
        } catch (err) {
            console.log(err)
            res.status(500).json({
                message: 'Something went wrong',
                error: err.message
            })
        }
    },
}

export default SearchingController