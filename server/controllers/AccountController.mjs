// import dotenv from "dotenv"
// import bcrypt from "bcrypt"
// import jwt from "jsonwebtoken"
// import { format } from 'date-fns'
// import db from '../models/index.mjs'

// dotenv.config()

// const { Token, Account } = db.models

// const AccountController = {
// 	signUp: async (req, res) => {
//         try {
//             const { accountTypeId, username, password,
//                 deliveryCenterId, warehouseId, firstName, lastName,
//                 email, phone, citizenIdentityCardImage } = req.body

//             const hashedPassword = await bcrypt.hash("" + password, parseInt(10))
//             const now = new Date()
//             const vietnamTime = format(now, 'yyyy-MM-dd HH:mm:ss', { timeZone: 'Asia/Ho_Chi_Minh' })
//             const account = await Account.create({
//                 account_type_id: accountTypeId,
//                 username: username,
//                 password: hashedPassword,
//                 delivery_center_id: deliveryCenterId,
//                 warehouse_id: warehouseId,
//                 first_name: firstName,
//                 last_name: lastName,
//                 email: email,
//                 phone: phone,
//                 citizen_identity_card_image: citizenIdentityCardImage,
//                 registration_time: vietnamTime
//             })

//             // Create token
//             const token = jwt.sign({
//                 accountId: account.account_id,
//                 accountTypeId: account.account_type_id
//             }, process.env.JWT_SECRET, {
//                 expiresIn: process.env.DEFAULT_TIMEOUT
//             })
        
//             // Save token in database
//             await Token.create({
//                 token_id: account.account_id,
//                 token,
//                 type: 'Bearer',
//                 expires: false
//             })
        
//             res.status(201).json({
//                 token,
//                 account: {
//                     accountId: account.account_id,
//                     accountTypeId: account.account_type_id,
//                     username: account.username,
//                     delivery_center_id: account.delivery_center_id,
//                     warehouse_id: account.warehouse_id,
//                     first_name: account.first_name,
//                     last_name: account.last_name,
//                     email: account.email,
//                     phone: account.phone,
//                     citizen_identity_card_image: account.citizen_identity_card_image,
//                     registration_time: account.registration_time,
//                 }
//             })
//         } catch (err) {
//             console.log(err)
//             res.status(500).json({
//                 message: 'Something went wrong',
//                 error: err.message
//             })
//         }
// 	},

// 	logIn: async (req, res) => {
//         try {
//             const { username, password } = req.body;
//             if (!(username && password)) {
//                 res.status(400).json({
//                     msg: 'Username and password are required'
//                 })
//             }

//             const account = await Account.findOne({ where: { username } })
//             if (!account) {
//                 res.status(401).json({
//                     msg: 'Username does not exist'
//                 })
//             }

//             const isPasswordCorrect = await bcrypt.compare("" + password, account.password)
//             if (!isPasswordCorrect) {
//                 res.status(404).json({
//                     msg: 'Wrong password'
//                 })
//             }

//             const token = jwt.sign({
//                 accountId: account.account_id,
//                 accountTypeId: account.account_type_id
//             }, process.env.JWT_SECRET, { expiresIn: '15m' })
//             await Token.update({
//                 token,
//                 expires: false
//             }, {
//                 where: {
//                     token_id: account.account_id
//                 }
//             })

//             res.status(200).json({
//                 token,
//                 account: {
//                     accountId: account.account_id,
//                     accountTypeId: account.account_type_id,
//                     username: account.username,
//                     deliveryCenterId: account.delivery_center_id,
//                     warehouseId: account.warehouse_id,
//                     firstName: account.first_name,
//                     lastName: account.last_name,
//                     email: account.email,
//                     phone: account.phone,
//                     citizenIdentityCardImage: account.citizen_identity_card_image,
//                     registrationTime: account.registration_time,
//                 }
//             })
//         } catch (err) {
//             console.log(err)
//             res.status(500).json({
//                 message: 'Something went wrong',
//                 error: err.message
//             })
//         }
// 	},

// 	logOut: async (req, res) => {
//         try {
//             const token = req.headers.authorization.split(' ')[1]
//             await Token.destroy({ where: { token } })

//             res.status(200).json({
//                 message: 'Logout successful',
//             })
//         } catch (err) {
//             console.log(err)
//             res.status(500).json({
//                 message: 'Something went wrong',
//                 error: err.message
//             })
//         }
// 	},
// }

// export default AccountController