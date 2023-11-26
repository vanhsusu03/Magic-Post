import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import randToken from 'rand-token'
import { format } from 'date-fns'
import db from '../models/index.mjs'

const { Token, Account } = db.models

const AccountController = {
	signUp: async (req, res) => {
        try {
            const { accountTypeId, username, password,
                deliveryCenterId, warehouseId, firstName, lastName,
                email, phone, citizenIdentityCardImage } = req.body

            if (await Account.findOne({ where: { username: username } })) {
                throw new Error('Username is already exists')
            }
            if (await Account.findOne({ where: { phone: phone } })) {
                throw new Error('Phone is already exists')
            }
            if (email && await Account.findOne({ where: { email: email } })) {
                throw new Error('Email is already exists')
            }

            const hashedPassword = await bcrypt.hash("" + password, parseInt(10))
            const now = new Date()
            const vietnamTime = format(now, 'yyyy-MM-dd HH:mm:ss', { timeZone: 'Asia/Ho_Chi_Minh' })
            const account = await Account.create({
                account_type_id: accountTypeId,
                username: username,
                password: hashedPassword,
                delivery_center_id: deliveryCenterId,
                warehouse_id: warehouseId,
                first_name: firstName,
                last_name: lastName,
                email: email,
                phone: phone,
                citizen_identity_card_image: citizenIdentityCardImage,
                registration_time: vietnamTime
            })
            if (!account) {
                throw new Error('There was an error creating the account')
            }
        
            res.status(201).json({
                accountId: account.account_id,
                accountTypeId: account.account_type_id,
                username: account.username,
                delivery_center_id: account.delivery_center_id,
                warehouse_id: account.warehouse_id,
                first_name: account.first_name,
                last_name: account.last_name,
                email: account.email,
                phone: account.phone,
                citizen_identity_card_image: account.citizen_identity_card_image,
                registration_time: account.registration_time,
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({
                message: 'Something went wrong',
                error: err.message
            })
        }
	},

	logIn: async (req, res) => {
        try {
            const { username, password } = req.body;

            if (!(username && password)) {
                throw new Error('Username and password are required')
            }

            const account = await Account.findOne({ where: { username } })
            if (!account) {
                throw new Error('Username does not exist')
            }

            const isPasswordCorrect = await bcrypt.compare("" + password, account.password)
            if (!isPasswordCorrect) {
                throw new Error('Wrong password')
            }

            const accessToken = jwt.sign({
                accountId: account.account_id,
                accountTypeId: account.account_type_id
            }, process.env.ACCESS_TOKEN_SECRET, {
                algorithm: 'HS256',
                expiresIn: process.env.ACCESS_TOKEN_LIFE,
            })
            if (!accessToken) {
                throw new Error('Login unsuccessful')
            }
        
            let refreshToken = randToken.generate(process.env.REFRESH_TOKEN_SIZE)
            if (!account.refreshToken) {
                await Account.update({ refresh_token: refreshToken }, {
                    where: {
                        account_id: account.account_id
                    }
                })
            } else {
                refreshToken = account.refresh_token
            }

            res.status(200).json({
                accessToken,
                refreshToken,
                account: {
                    accountId: account.account_id,
                    accountTypeId: account.account_type_id,
                    username: account.username,
                    deliveryCenterId: account.delivery_center_id,
                    warehouseId: account.warehouse_id,
                    firstName: account.first_name,
                    lastName: account.last_name,
                    email: account.email,
                    phone: account.phone,
                    citizenIdentityCardImage: account.citizen_identity_card_image,
                    registrationTime: account.registration_time,
                }
            })
        } catch (err) {
            console.log(err)
            res.status(400).json({
                message: 'Something went wrong',
                error: err.message
            })
        }
	},

	// logOut: async (req, res) => {
    //     try {
    //         const token = req.headers.authorization.split(' ')[1]
    //         await Token.destroy({ where: { token } })

    //         res.status(200).json({
    //             message: 'Logout successful',
    //         })
    //     } catch (err) {
    //         console.log(err)
    //         res.status(500).json({
    //             message: 'Something went wrong',
    //             error: err.message
    //         })
    //     }
	// },

    refreshToken: async (req, res) => {
        try {
            const accessTokenFromHeader = req.headers.x_authorization
	        if (!accessTokenFromHeader) {
		        throw new Error('Access token not found')
	        }

	        const refreshTokenFromBody = req.body.refreshToken
	        if (!refreshTokenFromBody) {
		        throw new Error('Refresh token not found')
	        }
            // Decode access token
            const decoded = jwt.verify(accessTokenFromHeader, process.env.ACCESS_TOKEN_SECRET, {
                ignoreExpiration: true,
            })
            if (!decoded) {
                throw new Error('Access token is invalid')
            }

	        const accountId = decoded.accountId

            const account = await Account.findOne({ where: { account_id: accountId } })
            if (!account) {
                throw new Error('Account does not exist')
            }

            if (refreshTokenFromBody !== account.refresh_token) {
                throw new Error('Refresh token is invalid')
            }

            // Create new access token
            const accessToken = jwt.sign({
                accountId: account.account_id,
                accountTypeId: account.account_type_id
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                algorithm: 'HS256',
                expiresIn:process.env.ACCESS_TOKEN_LIFE,
            })
            if (!accessToken) {
                throw new Error('Creating access token failed')
            }

            res.status(200).json(accessToken)
        } catch (err) {
            console.log(err)
            res.status(400).json({
                message: 'Something went wrong',
                error: err.message
            })
        }
	},
}

export default AccountController