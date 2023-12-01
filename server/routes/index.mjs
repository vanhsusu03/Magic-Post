import { Router } from 'express'

import locationRoute from "./location-route.mjs"
import accountRoute from "./account-route.mjs"

const routes = Router()

routes.use(locationRoute)
routes.use(accountRoute)

export default routes