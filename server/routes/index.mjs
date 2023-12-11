import { Router } from 'express'

import locationRoute from "./location-route.mjs"
import accountRoute from "./account-route.mjs"
import warehouseRoute from "./warehouse-route.mjs"
import deliveryCenterRoute from "./deliverycenter-route.mjs"
import packageRoute from "./package-route.mjs"

const routes = Router()

routes.use(locationRoute)
routes.use(accountRoute)
routes.use(warehouseRoute)
routes.use(deliveryCenterRoute)
routes.use(packageRoute)

export default routes