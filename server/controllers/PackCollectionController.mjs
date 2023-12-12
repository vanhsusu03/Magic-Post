import sequelize from 'sequelize'
import { format } from 'date-fns'
import db from '../models/index.mjs'

const { Package_collection, Package_pkg_collection, Status_detail } = db.models

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
            const { packageCollectionTypeId, statusId, location } = req.body

            if (typeof packageIds === "string") {
                packageIds = packageIds.split(',').map(Number)
            }

            const packageCollection = await Package_collection.create({
                package_collection_type_id: packageCollectionTypeId
            })
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
}

export default PackageCollectionController