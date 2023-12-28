import jwt from 'jsonwebtoken'
import db from '../models/index.mjs'

const { Account } = db.models

export const isAuth = async (req, res, next) => {
	try {
		const accessTokenFromHeader = req.headers.authorization.split(' ')[1]
		if (!accessTokenFromHeader) {
			res.status(401).json('Access token not found')
		} else {
			const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET
			const verified = jwt.verify(accessTokenFromHeader, accessTokenSecret)
			if (!verified) {
				res.status(401).json('No access')
			} else {
				const account = await Account.findOne({
					where: { account_id: verified.accountId },
					raw: true 
				})
				req.account = account
				next()
			}
		}
	} catch (err) {
		console.log(err)
		res.status(500).json({
			response: 'Some error occurred while authenticating the user',
			error: err.message
		})
	}
}

export const isLeadership = async (req, res, next) => {
	try {
		if (parseInt(req.account.account_type_id) !== 2) {
			res.status(403).json({
				response: {
					message: 'Leadership access required'
				}
			})
		} else {
			next()
		}
	} catch (err) {
		res.status(401).json({
			response: 'Some error occurred while authenticating the user'
		})
	}
}

export const isDeliveryCenterManager = async (req, res, next) => {
	try {
		if (parseInt(req.account.account_type_id) !== 3) {
			res.status(403).json({
				response: {
					message: 'Delivery center Manager access required'
				}
			})
		} else {
			next()
		}
	} catch (err) {
		res.status(401).json({
			response: 'Some error occurred while authenticating the user'
		})
	}
}

export const isTeller = async (req, res, next) => {
	try {
		if (parseInt(req.account.account_type_id) !== 4) {
			res.status(403).json({
				response: {
					message: 'Teller access required'
				}
			})
		} else {
			next()
		}
	} catch (err) {
		res.status(401).json({
			response: 'Some error occurred while authenticating the user'
		})
	}
}

export const isWarehouseManager = async (req, res, next) => {
	try {
		if (parseInt(req.account.account_type_id) !== 5) {
			res.status(403).json({
				response: {
					message: 'Warehouse Manager access required'
				}
			})
		} else {
			next()
		}
	} catch (err) {
		res.status(401).json({
			response: 'Some error occurred while authenticating the user'
		})
	}
}

export const isStaffAtWarehouse = async (req, res, next) => {
	try {
		if (parseInt(req.account.account_type_id) !== 6) {
			res.status(403).json({
				response: {
					message: 'Staff at Warehouse access required'
				}
			})
		} else {
			next()
		}
	} catch (err) {
		res.status(401).json({
			response: 'Some error occurred while authenticating the user'
		})
	}
}

export const isLogin = async (req, res, next) => {
	try {
		if (!req.isLogin) {
			res.status(403).json({
				response: {
					message: 'You need to login to logout'
				}
			})
		} else {
			next()
		}
	} catch (err) {
		console.log(err)
		res.status(500).json({
			response: 'Some error occurred while authenticating the user',
			error: err.message
		})
	}
}