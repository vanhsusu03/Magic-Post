import jwt from 'jsonwebtoken'
import db from '../models/index.mjs'

const { Account } = db.models

export const isAuth = async (req, res, next) => {
	try {
		const accessTokenFromHeader = req.headers.x_authorization
		if (!accessTokenFromHeader) {
			res.status(401).json('Access token not found')
		}

		const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET

		const verified = jwt.verify(accessTokenFromHeader, accessTokenSecret)
		if (!verified) {
			res.status(401).json('No access')
		}

		const account = await Account.findOne({ where: { account_id: verified.accountId } })
		req.account = account

		next()
	} catch (err) {
		console.log(err)
		res.status(500).json({
			response: 'Some error occurred while authenticating the user',
			error: err.message
		})
	}
}