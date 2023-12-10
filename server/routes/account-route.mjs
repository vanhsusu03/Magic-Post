/**
 * @swagger
 * components:
 *  schemas:
 *      AccountType:
 *          type: object
 *          properties:
 *              typeId:
 *                  type: integer
 *                  description: The unique identifier for the account type.
 *              accountType:
 *                  type: string
 *                  description: The name of the account type.
 *          required:
 *              - accountType
 *          example:
 *              typeId: 1
 *              accountType: "Admin"
 *      Account:
 *          type: object
 *          properties:
 *              accountId:
 *                  type: integer
 *                  description: The unique identifier for the account.
 *              accountTypeId:
 *                  type: integer
 *                  description: The identifier for the account type.
 *              username:
 *                  type: string
 *                  description: The username for the account.
 *              password:
 *                  type: string
 *                  description: The hashed password for the account.
 *              deliveryCenterId:
 *                  type: integer
 *                  description: The identifier for the delivery center (nullable).
 *              warehouseId:
 *                  type: integer
 *                  description: The identifier for the warehouse (nullable).
 *              firstName:
 *                  type: string
 *                  description: The first name of the account holder.
 *              lastName:
 *                  type: string
 *                  description: The last name of the account holder.
 *              email:
 *                  type: string
 *                  format: email
 *                  description: The email address of the account holder (nullable).
 *              phone:
 *                  type: string
 *                  description: The phone number of the account holder.
 *              citizenIdentityCardImage:
 *                  type: string
 *                  description: The URL of the citizen identity card image.
 *              registrationTime:
 *                  type: string
 *                  format: date-time
 *                  description: The date and time the account was registered.
 *              refreshToken:
 *                  type: string
 *                  description: The refresh token for authentication (nullable).
 *          required:
 *              - accountTypeId
 *              - username
 *              - password
 *              - firstName
 *              - lastName
 *              - phone
 *              - citizenIdentityCardImage
 *          example:
 *              accountId: 1
 *              accountTypeId: 1
 *              username: "user1"
 *              password: "hashed_password"
 *              deliveryCenterId: 1
 *              warehouseId: 2
 *              firstName: "John"
 *              lastName: "Doe"
 *              email: "john.doe@example.com"
 *              phone: "0123456789"
 *              citizenIdentityCardImage: "image_url_1"
 *              registrationTime: "2023-01-01T12:00:00"
 *              refreshToken: "refresh_token_string"
 */

import { Router } from 'express'
import accountController from '../controllers/AccountController.mjs'
import { isAuth } from '../middlewares/Auth.mjs'

const router = Router()

router.post('/signup', accountController.signUp)
router.post('/login', accountController.logIn)
router.post('/refresh', accountController.refreshToken)
// router.post('/logout', accountController.logOut)
router.get('/profile', isAuth, async (req, res) => {
	res.json(req.account)
})

export default router