import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import randToken from 'rand-token'
import { format } from 'date-fns'
import db from '../models/index.mjs'
import sequelize from 'sequelize'

const { Account,Warehouse, Province_municipality } = db.models

const AccountController = {
    /**
    * Sign up a account. Checks to make sure username and / or email are not already in use
    * 
    * @param req - The request object from express server
    * @param res - The response object from express server ( unused )
    * 
    * @return { Object } The signed up account in response to Express HTTP request ( used for validation and database operations
    */
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
                delivery_center_id: deliveryCenterId == '' ? null : deliveryCenterId,
                warehouse_id: warehouseId == '' ? null : warehouseId,
                first_name: firstName,
                last_name: lastName,
                email: email == '' ? null : email,
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

    /**
    * Logs in a user to HipChat and returns a token to the request body. This is the endpoint that will be used to send requests to HipChat
    * 
    * @param req - The request object from express server
    * @param res - The response object from express server ( response will be written to it )
    * 
    * @return { Promise } - resolves when the user has been logged in or rejects with an error if there was
    */
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

    /**
    * Handles the request to refresh the access token. Verifies the access token and refresh token are valid and returns the new access token
    * 
    * @param req - request object from express server
    * @param res - response object from express server ( promise ) throws on
    * 
    * @return { Object } The JSON representation of the access token
    */
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
                    expiresIn: process.env.ACCESS_TOKEN_LIFE,
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

    getAllAccountFromDeliveryCenter: async (req, res) => {
        try {
            const ans = await Account.findAll({
                attributes: [
                    [sequelize.col('account.account_id'), 'accountId'],
                    [sequelize.col('account.account_type_id'), 'accountTypeId'],
                    [sequelize.col('account.username'), 'username'],
                    [sequelize.col('account.delivery_center_id'), 'delivery_center_id'],
                    [sequelize.col('account.warehouse_id'), 'warehouse_id'],
                    [sequelize.col('account.first_name'), 'first_name'],
                    [sequelize.col('account.last_name'), 'last_name'],
                    [sequelize.col('account.email'), 'email'],
                    [sequelize.col('account.phone'), 'phone'],
                    [sequelize.col('account.citizen_identity_card_image'), 'citizen_identity_card_image'],
                    [sequelize.col('account.registration_time'), 'registration_time']
                ],
                where: {
                    account_type_id: 3
                },
                oder: [['accountId', 'ASC']]
            });
            res.status(200).json(ans);
        } catch (err) {
            console.log(err);
            res.status(400).json({
                message: 'Something went wrong',
                error: err.message
            })
        }
    },

    getAllAccountFromWarehouse: async (req, res) => {
        try {
            const ans = await Account.findAll({
                attributes: [
                    [sequelize.col('account.account_id'), 'accountId'],
                    [sequelize.col('account.account_type_id'), 'accountTypeId'],
                    [sequelize.col('account.username'), 'username'],
                    [sequelize.col('account.delivery_center_id'), 'deliveryCenterId'],
                    [sequelize.col('account.warehouse_id'), 'warehouseId'],
                    [sequelize.col('account.first_name'), 'firstName'],
                    [sequelize.col('account.last_name'), 'lastName'],
                    [sequelize.col('account.email'), 'email'],
                    [sequelize.col('account.phone'), 'phone'],
                    [sequelize.col('account.citizen_identity_card_image'), 'identityCardlink'],
                    [sequelize.col('account.registration_time'), 'registrationTime']
                ],
                include:{
                    model: Warehouse,
                    attributes: [
                        [sequelize.col('province_municipality_id'),'provinceMunicipalityId']
                    ],
                    required: true,
                    include: {
                        model: Province_municipality,
                        attributes: [
                            [sequelize.col('province_municipality'),'provinceMunicipality']
                        ],
                        required: true,
                    }
                },
                where: {
                    account_type_id: 5
                },
                oder: [['accountId', 'ASC']]
            });
            res.status(200).json(ans);
        } catch (err) {
            console.log(err);
            res.status(400).json({
                message: 'Something went wrong',
                error: err.message
            })
        }
    }
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
}

export default AccountController