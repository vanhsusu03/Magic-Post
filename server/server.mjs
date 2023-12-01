import express, { json } from "express"
import { Server } from "http"
import cors from "cors"
import moment from "moment"
import routes from "./routes/index.mjs"
import db from "./models/index.mjs"
import specs from "./swagger.mjs"
import swaggerUi from "swagger-ui-express"

const app = express()
const server = Server(app)

function log(msg) {
	console.log(`[${moment().format('HH:mm:ss')}] ${msg}`)
}

// START DATABASE SERVICE
// database.connect()

(async () => {
	await db.sequelize.sync(/* { force: true } */)
})()

app.use((req, _res, next) => {
	log(`${req.method} ${req.path}`)
	next()
})

// ADDS CORS HEADER
app.use(cors({
	origin: process.env.FRONTEND_HOST,
	credentials: true
}))

// HANDLES JSON REQUEST BODY
app.use(json())

// USES DEFINED ROUTES
app.use('/', routes)
app.use('/api-docs', swaggerUi.serve)
app.use('/api-docs', swaggerUi.setup(specs))

const PORT = process.env.PORT
server.listen(PORT, () => {
	console.log(`[ SERVER INFO ] RUNNING ON PORT ${PORT}`)
})

export default app