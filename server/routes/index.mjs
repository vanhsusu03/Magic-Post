import { Router } from 'express'

import locationRoute from "./location-route.mjs"
import accountRoute from "./account-route.mjs"
import warehouseRoute from "./warehouse-route.mjs"
import deliveryCenterRoute from "./deliverycenter-route.mjs"
import packageRoute from "./package-route.mjs"
import packageCollectionRoute from "./packagecollection-route.mjs"
import searchingRoute from "./searching-route.mjs"
// import statisticRoute from "./statistic-route.mjs"

const routes = Router()

routes.use(locationRoute)
routes.use(accountRoute)
routes.use(warehouseRoute)
routes.use(deliveryCenterRoute)
routes.use(packageRoute)
routes.use(packageCollectionRoute)
routes.use(searchingRoute)
// routes.use(statisticRoute)

export default routes