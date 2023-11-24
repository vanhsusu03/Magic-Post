import { Router } from 'express'

import locationRoute from "./location-route.mjs"

const routes = Router()

routes.use(locationRoute)

export default routes