/**
 * @swagger
 * components:
 *  schemas:
 *      Token:
 *          type: object
 *          properties:
 *              token_id:
 *                  type: integer
 *                  description: The unique identifier for the token.
 *              token:
 *                  type: string
 *                  description: The actual token value.
 *              type:
 *                  type: string
 *                  enum:
 *                      - Bearer
 *                      - Google
 *                  description: The type of token (Bearer or Google).
 *              expires:
 *                  type: boolean
 *                  description: Indicates whether the token expires.
 *          required:
 *                  - token
 *          example:
 *              token_id: 1
 *              token: "example_token"
 *              type: "Bearer"
 *              expires: false
 *      AccountType:
 *          type: object
 *          properties:
 *              type_id:
 *                  type: integer
 *                  description: The unique identifier for the account type.
 *              account_type:
 *                  type: string
 *                  description: The name of the account type.
 *          required:
 *              - account_type
 *          example:
 *              type_id: 1
 *              account_type: "Admin"
 *      Account:
 *          type: object
 *          properties:
 *              account_id:
 *                  type: integer
 *                  description: The unique identifier for the account.
 *              account_type_id:
 *                  type: integer
 *                  description: The identifier for the account type.
 *              username:
 *                  type: string
 *                  description: The username for the account.
 *              password:
 *                  type: string
 *                  description: The hashed password for the account.
 *              delivery_center_id:
 *                  type: integer
 *                  description: The identifier for the delivery center (nullable).
 *              warehouse_id:
 *                  type: integer
 *                  description: The identifier for the warehouse (nullable).
 *              first_name:
 *                  type: string
 *                  description: The first name of the account holder.
 *              last_name:
 *                  type: string
 *                  description: The last name of the account holder.
 *              email:
 *                  type: string
 *                  format: email
 *                  description: The email address of the account holder (nullable).
 *              phone:
 *                  type: string
 *                  description: The phone number of the account holder.
 *              citizen_identity_card_image:
 *                  type: string
 *                  description: The URL of the citizen identity card image.
 *              registration_time:
 *                  type: string
 *                  format: date-time
 *                  description: The date and time the account was registered.
 *          required:
 *              - account_type_id
 *              - username
 *              - password
 *              - first_name
 *              - last_name
 *              - phone
 *              - citizen_identity_card_image
 *          example:
 *              account_id: 1
 *              account_type_id: 1
 *              username: "user1"
 *              password: "hashed_password"
 *              delivery_center_id: 1
 *              warehouse_id: 2
 *              first_name: "John"
 *              last_name: "Doe"
 *              email: "john.doe@example.com"
 *              phone: "0123456789"
 *              citizen_identity_card_image: "image_url_1"
 *              registration_time: "2023-01-01T12:00:00"
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