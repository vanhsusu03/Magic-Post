import sequelize from 'sequelize'
import { format } from 'date-fns'
import db from '../models/index.mjs'

const { Package_collection, Package_pkg_collection, Status_detail, Package,
    Delivery_center, Warehouse } = db.models

const PackageCollectionController = {
    /**
    * Creates a package collection in the database. This is a POST request
    * 
    * @param req - Request object from express server
    * @param res - Response object from express server ( error response will be JSON )
    * 
    * @return { Promise } Promise that resolves with the ID of the package collection created and the time it was created
    */
    create: async (req, res) => {
        try {
            let packageIds = req.body.packageIds
            const { packageCollectionTypeId, statusId, location,
                deliveryCenterReceiveId, warehouseReceiveId } = req.body

            if (typeof packageIds === "string") {
                packageIds = packageIds.split(',').map(Number)
            }
            let packageCollection
            if (deliveryCenterReceiveId) {
                packageCollection = await Package_collection.create({
                    package_collection_type_id: packageCollectionTypeId,
                    delivery_center_receive_id: deliveryCenterReceiveId,
                })
            } else {
                packageCollection = await Package_collection.create({
                    package_collection_type_id: packageCollectionTypeId,
                    warehouse_receive_id: warehouseReceiveId,
                })
            }
            const now = new Date()
            const vietnamTime = format(now, 'yyyy-MM-dd HH:mm:ss', { timeZone: 'Asia/Ho_Chi_Minh' })
            for (const id of packageIds) {
                await Package_pkg_collection.create({
                    package_id: id,
                    package_collection_id: packageCollection.package_collection_id
                })

                await Status_detail.create({
                    status_id: statusId,
                    time: vietnamTime,
                    location: location,
                    package_id: id
                })
            }
            res.status(200).json({
                packageCollectionId: packageCollection.package_collection_id,
                time: vietnamTime
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
    * Handles the confirm request. This is called when we receive a request to confirm a package collection.
    * 
    * @param req - The request object from sequelize.
    * @param res - The response object from sequelize. TODO : Add error handling here
    * 
    * @return { Promise } Resolves to the package status
    */
    confirmGotCollection: async (req, res) => {
        try {
            const packageCollectionId = Number(req.params.packageCollectionId)
            const { statusId, location } = req.body

            const packages = await Package.findAll({
                attributes: [
                    [sequelize.col('package.package_id'), 'packageId'],
                    [sequelize.col('package_type_id'), 'packageTypeId'],
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
                    model: Package_pkg_collection,
                    where: { package_collection_id: packageCollectionId },
                    attributes: []
                },
                raw: true
            })
            const now = new Date()
            const vietnamTime = format(now, 'yyyy-MM-dd HH:mm:ss', { timeZone: 'Asia/Ho_Chi_Minh' })
            for (const p of packages) {
                await Status_detail.create({
                    status_id: statusId,
                    time: vietnamTime,
                    location: location,
                    package_id: p.packageId
                })
            }

            res.status(200).json({
                vietnamTime,
                packages
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({
                message: 'Something went wrong',
                error: err.message
            })
        }
    },

    getSendingCollections: async (req, res) => {
        try {
            const officeId = Number(req.params.officeId)
            const { typeOffice, statusId } = req.query
            let condition
            if (typeOffice == "warehouse") {
                condition = {
                    where: {
                        warehouse_receive_id: officeId
                    }
                }
            } else {
                condition = {
                    where: {
                        delivery_center_receive_id: officeId
                    }
                }
            }

            const collections = await Package_collection.findAll({
                condition,
                raw: true,
            })

            let ans = []
            const ps = await Package.findAll({
                attributes: ['package_id'],
                include: {
                    model: Status_detail,
                    attributes: [
                        [sequelize.col('time'), 'time'],
                        [sequelize.col('status_id'), 'statusId']
                    ],
                },
                raw: true,
                nest: true,
                order: [[sequelize.col('time'), 'DESC']]
            })

            let closedSet = []
            for (let i = 0; i < ps.length; i++) {
                let t = ps[i]
                if (closedSet.includes(t.package_id)) {
                    ps.splice(i--, 1)
                    continue
                }
                closedSet.push(t.package_id)
            }
            
            for (const t of collections) {
                for (const pkg of ps) {
                    if (pkg.status_details.statusId != statusId) {
                        continue
                    }

                    const len = await Package_pkg_collection.findAll({
                        where: {
                            package_id: pkg.package_id,
                            package_collection_id: t.package_collection_id,
                        },
                        raw: true,
                        nest: true
                    })
                    if (len.length > 0) {
                        ans.push(pkg)
                    }
                }
            }

            let arr = []
            for (const pkg of ans) {
                let set = await Package_pkg_collection.findAll({
                    where: {
                        package_id: pkg.package_id
                    },
                    raw: true,
                    nest: true,
                    order: [[sequelize.col('package_collection_id'), 'DESC']],
                })
                set = set[0]
                arr.push(set)
            }
            let t = []
            for (let i = 0; i < arr.length; i++) {
                let temp = arr[i]
                if (t.includes(temp.package_id)) {
                    arr.splice(i--, 1)
                    continue
                }
                t.push(temp.package_id)
            }
            console.log(arr)

            ans = []
            t = []
            for (const item of arr) {
                if (t.includes(item.package_collection_id)) {
                    continue
                }
                t.push(item.package_collection_id)
                ans.push(await Package_collection.findAll({
                    include: {
                        model: Package_pkg_collection,
                        include: {
                            model: Package,
                        },
                    },
                    where: { package_collection_id: item.package_collection_id },
                }))
            }

            res.status(200).json({
                ans
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

export default PackageCollectionController