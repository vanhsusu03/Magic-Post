// const { models: { Account, Token } } = require('../models/');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const { format } = require('date-fns');

// class AccountController {
// 	async signUp(req, res, next) {
// 		const { username, password /* need more */ } = req.body;

// 		const hashedPassword = await bcrypt.hash("" + password, parseInt(10));
// 		const now = new Date();
//         const vietnamTime = format(now, 'yyyy-MM-dd HH:mm:ss', { timeZone: 'Asia/Ho_Chi_Minh' });
// 		const account = await Account.create({
// 			username,
// 			password: hashedPassword,
// 			// need more
// 			registration_time: vietnamTime
// 		});
	
// 		// Create token
// 		const token = jwt.sign({
// 			accountId: account.account_id,
// 			accountTypeId: account.account_type_id
// 		}, process.env.JWT_SECRET, {
// 			expiresIn: process.env.DEFAULT_TIMEOUT.str
// 		});
	
// 		// Save token in database
// 		await models.Token.create({
// 			token_id: user.userId,
// 			token,
// 			type: 'Bearer',
// 			expires: false
// 		});
	
// 		res.status(201).json({
// 			token,
// 			account: {
// 				accountId: account.account_id,
// 				accountTypeId: account.account_type_id,
// 				username: account.username,
// 				delivery_center_id: account.delivery_center_id,
// 				warehouse_id: account.warehouse_id,
// 				first_name: account.first_name,
// 				last_name: account.last_name,
// 				email: account.email,
// 				phone: account.phone,
// 				citizen_identity_card_image: account.citizen_identity_card_image,
// 				registration_time: account.registration_time,
// 			}
// 		});
// 	}

// 	async logIn(req, res, next) {
// 		const { username, password } = req.body;
// 		if (!(username && password)) {
// 			return res.status(400).json({
// 				msg: 'Username and password are required'
// 			});
// 		}

// 		const account = await Account.findOne({ where: { username } })
// 		if (!account) {
// 			return res.status(401).json({
// 				msg: 'Username does not exist'
// 			});
// 		}

// 		const isPasswordCorrect = await bcrypt.compare("" + password, account.password)
// 		if (!isPasswordCorrect) {
// 			return res.status(404).json({
// 				msg: 'Wrong password'
// 			});
// 		}

// 		const token = jwt.sign({
// 			accountId: account.account_id,
// 			accountTypeId: account.account_type_id
// 		}, process.env.JWT_SECRET, { expiresIn: '15m' })
// 		await Token.update({
// 			token,
// 			expires: false
// 		}, {
// 			where: {
// 				token_id: account.account_id
// 			}
// 		});

// 		req.session.isLogin = true;
// 		req.session.accountId = account.account_id;
// 		req.session.accountType = ;
// 		res.status(200).json({
// 			token,
// 			account: {
// 				accountType: ,
// 				accountId: account.account_id,
// 				accountTypeId: account.account_type_id,
// 				username: account.username,
// 				delivery_center_id: account.delivery_center_id,
// 				warehouse_id: account.warehouse_id,
// 				first_name: account.first_name,
// 				last_name: account.last_name,
// 				email: account.email,
// 				phone: account.phone,
// 				citizen_identity_card_image: account.citizen_identity_card_image,
// 				registration_time: account.registration_time,
// 				cookie: req.headers.cookie,
// 			}
// 		});
// 	}

// 	async logOut(req, res, next) {
// 		const token = req.headers.authorization.split(' ')[1];
// 		await Token.destroy({ where: { token } });

// 		req.session.destroy((err) => {
//             if (err) {
//                 return res.json({
//                     message: 'Error: Destroy session',
//                 });
//             }
//         });

// 		res.clearCookie('sid');

// 		res.status(200).json({
// 			message: 'Logout successful',
// 		});
// 	}
// }

// module.exports = new AccountController();