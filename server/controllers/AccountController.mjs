import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import randToken from 'rand-token'
import sequelize from 'sequelize'
import { format } from 'date-fns'
import db from '../models/index.mjs'

const { Account, Account_type, Warehouse, Province_municipality, Delivery_center, District } = db.models

const AccountController = {
    isProhibited: (accountTypeId, acc) => {
        if (((accountTypeId == 3 || accountTypeId == 5) && acc.account_type_id != 2)
            || (accountTypeId == 4 && acc.account_type_id != 3)
            || (accountTypeId == 6 && acc.account_type_id != 5)) {
            return true
        }
        return false
    },

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
                email, phone, citizenIdentityCardNumber } = req.body

            if (AccountController.isProhibited(accountTypeId, req.account)) {
                throw new Error('No permission')
            }

            if (await Account.findOne({ where: { username: username } })) {
                throw new Error('Username is already exists')
            }
            if (await Account.findOne({ where: { phone: phone } })) {
                throw new Error('Phone is already exists')
            }
            if (email && await Account.findOne({ where: { email: email } })) {
                throw new Error('Email is already exists')
            }
            // if (phone && await Account.findOne({ where: { phone: phone } })) {
            //     throw new Error('Phone number is already exists')
            // }
            if (citizenIdentityCardNumber && await Account.findOne({ where: { citizenIdentityCardNumber: citizenIdentityCardNumber }})) {
                throw new Error('Identity number is already exists')
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
                citizen_identity_card_number: citizenIdentityCardNumber,
                registration_time: vietnamTime
            })
            if (!account) {
                throw new Error('There was an error creating the account')
            }

            res.status(201).json({
                accountId: account.account_id,
                accountTypeId: account.account_type_id,
                username: account.username,
                deliveryCenterId: account.delivery_center_id,
                warehouseId: account.warehouse_id,
                firstName: account.first_name,
                lastName: account.last_name,
                email: account.email,
                phone: account.phone,
                citizenIdentityCardNumber: account.citizen_identity_card_number,
                registrationTime: account.registration_time,
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
                    citizenIdentityCardNumber: account.citizen_identity_card_number,
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
            // console.log(req.body);
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

    /**
    * Gets information account by office id.
    * 
    * @param req - Object with the request parameters.
    * @param res - Object with the response parameters. { Object }
    * 
    * @return { Promise } Resolves with an array of Account objects with info about the account identified by req. params
    */
    getInfoByOffice: async (req, res) => {
        try {
            const officeId = Number(req.params.officeId)
            const accountTypeId = Number(req.params.accountTypeId)

            if (AccountController.isProhibited(accountTypeId, req.account)) {
                throw new Error('No permission')
            }

            let condition = {
                warehouse_id: officeId,
                account_type_id: accountTypeId
            }
            if (accountTypeId == 3 || accountTypeId == 4) {
                condition = {
                    delivery_center_id: officeId,
                    account_type_id: accountTypeId
                }
            }

            const ans = await Account.findAll({
                attributes: [
                    [sequelize.col('account_id'), 'accountId'],
                    [sequelize.col('account_type_id'), 'accountTypeId'],
                    [sequelize.col('username'), 'username'],
                    [sequelize.col('delivery_center_id'), 'deliveryCenterId'],
                    [sequelize.col('warehouse_id'), 'warehouseId'],
                    [sequelize.col('first_name'), 'firstName'],
                    [sequelize.col('last_name'), 'lastName'],
                    [sequelize.col('email'), 'email'],
                    [sequelize.col('phone'), 'phone'],
                    [sequelize.col('citizen_identity_card_number'), 'citizenIdentityCardNumber'],
                    [sequelize.col('registration_time'), 'registrationTime'],
                ],
                where: condition,
            })
            res.status(200).json(ans)
        } catch (err) {
            console.log(err)
            res.status(500).json({
                message: 'Something went wrong',
                error: err.message
            })
        }
    },

    getAllManagerAccountFromDeliveryCenter: async (req, res) => {
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
                    [sequelize.col('account.citizen_identity_card_number'), 'citizenIdentityCardNumber'],
                    [sequelize.col('account.registration_time'), 'registrationTime'],
                ],
                include: {
                    model: Delivery_center,
                    attributes: [
                        [sequelize.col('district_id'), 'districtId'],
                    ],
                    required: true,
                    include: {
                        model: District,
                        attributes: [
                            [sequelize.col('province_municipality_id'), 'provinceMunicipalityId'],
                            [sequelize.col('district'), 'district'],
                        ],
                        required: true,
                        include: {
                            model: Province_municipality,
                            attributes: [
                                [sequelize.col('province_municipality'), 'provinceMunicipality'],
                                // Add other attributes as needed
                            ],
                            required: true,
                        }
                    }
                },
                where: {
                    account_type_id: 3
                },
                order: [['accountId', 'ASC']]
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

    getAllManagerAccountFromWarehouse: async (req, res) => {
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
                    [sequelize.col('account.citizen_identity_card_number'), 'identityCardlink'],
                    [sequelize.col('account.registration_time'), 'registrationTime']
                ],
                include: {
                    model: Warehouse,
                    attributes: [
                        [sequelize.col('province_municipality_id'), 'provinceMunicipalityId'],
                    ],
                    required: true,
                    include: {
                        model: Province_municipality,
                        attributes: [
                            [sequelize.col('province_municipality'), 'provinceMunicipality'],
                            // Add other attributes as needed
                        ],
                        required: true,
                    }
                },
                where: {
                    account_type_id: 5
                },
                order: [['accountId', 'ASC']]
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

    // getMyInfo: async(req, res) => {
    //     try {
    //         res.status(200).json({
    //             accountId: req.account.account_id,
    //             accountTypeId: req.account.account_type_id,
    //             username: req.account.username,
    //             deliveryCenterId: req.account.delivery_center_id,
    //             warehouseId: req.account.warehouse_id,
    //             firstName: req.account.first_name,
    //             lastName: req.account.last_name,
    //             email: req.account.email,
    //             phone: req.account.phone,
    //             citizenIdentityCardNumber: req.account.citizen_identity_card_number,
    //             registrationTime: req.account.registration_time,
    //         })
    //     } catch (err) {
    //         console.log(err)
    //         res.status(500).json({
    //             message: 'Something went wrong',
    //             error: err.message
    //         })
    //     }
    // },

    // getInfoManager: async(req, res) => {
    //     await Account.findAll({
    //         attributes: [
    //             [sequelize.col('account_id'), 'accountId'],
    //             [sequelize.col('account_type_id'), 'accountTypeId'],
    //             [sequelize.col('username'), 'username'],
    //             [sequelize.col('delivery_center_id'), 'deliveryCenterId'],
    //             [sequelize.col('warehouse_id'), 'warehouseId'],
    //             [sequelize.col('first_name'), 'firstName'],
    //             [sequelize.col('last_name'), 'lastName'],
    //             [sequelize.col('email'), 'email'],
    //             [sequelize.col('phone'), 'phone'],
    //             [sequelize.col('citizen_identity_card_number'), 'citizenIdentityCardNumber'],
    //             [sequelize.col('registration_time'), 'registrationTime'],
    //             [sequelize.col('account_type'), 'accountType']
    //         ],
    //         include: {
    //             model: Account_type,
    //             attributes: []
    //         },
    //         where: {
    //             account_type: {
    //                 [Op.or]: ["Delivery center Manager", "Warehouse Manager"]
    //             }
    //         },
    //         order: [['accountTypeId', 'ASC']]
    //     })
    // },
}

export default AccountController