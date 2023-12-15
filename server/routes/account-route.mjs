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

/**
 * @swagger
 * tags:
 *  name: Account
 *  description: The account API
 */


import { Router } from 'express'
import AccountController from '../controllers/AccountController.mjs'
import { isAuth } from '../middlewares/Auth.mjs'

const router = Router()

/**
 * @swagger
 * /signup:
 *  post:
 *      summary: Sign up for a new account
 *      tags: [Account]
 *      description: Register a new account with the provided details.
 *      requestBody:
 *          required: true
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/Account'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Account'
 *      responses:
 *          '201':
 *              description: Account successfully created
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Account'
 *          '500':
 *              description: Internal Server Error
 *              content:
 *                  application/json:
 *                      example:
 *                          message: "Internal Server Error"
 *                          error: "Error details"
 */
router.post('/signup', isAuth, AccountController.signUp)

/**
 * @swagger
 * /login:
 *  post:
 *      summary: Log in to an existing account
 *      tags: [Account]
 *      description: Log in to an existing account with the provided username and password.
 *      requestBody:
 *          required: true
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          username:
 *                              type: string
 *                              description: The username of the account.
 *                          password:
 *                              type: string
 *                              description: The password of the account.
 *                      required:
 *                          - username
 *                          - password
 *                      example:
 *                          username: "john_doe"
 *                          password: "password123"
 *      responses:
 *          '200':
 *              description: Successful login
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Account'
 *          '400':
 *              description: Bad Request
 *              content:
 *                  application/json:
 *                      example:
 *                          message: "Bad Request"
 *                          error: "Error details"
 */
router.post('/login', AccountController.logIn)

/**
 * @swagger
 * /refresh:
 *  post:
 *      summary: Refresh Access Token
 *      tags: [Account]
 *      description: Refresh the access token using a valid refresh token.
 *      parameters:
 *        - in: header
 *          name: x_authorization
 *          required: true
 *          description: an authorization header
 *          schema:
 *              type: string
 *      requestBody:
 *          required: true
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          refreshToken:
 *                              type: string
 *                              description: The refresh token obtained during the login process.
 *                      required:
 *                          - refreshToken
 *                      example:
 *                          refreshToken: "ZcEZoAyOffpJ7M68aIY1vyHqAu7hGEtBWznQm7itLgk9NWd6wJPqknkwIQGgve2VKYSe62DkHU5BWDQylb0gPdgcvStxQryZ1ThS"
 *      responses:
 *          '200':
 *              description: Successful token refresh
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              accessToken:
 *                                  type: string
 *                                  description: The new access token.
 *                          example:
 *                              accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50SWQiOjQsImFjY291bnRUeXBlSWQiOjEsImlhdCI6MTcwMjMyNTg3OCwiZXhwIjoxNzAyMzI2NDc4fQ.a3B4Ru5SysMy51net01w-3kIGH5v6PMa9nhW2myEQNs"
 *          '400':
 *              description: Bad Request
 *              content:
 *                  application/json:
 *                      example:
 *                          message: "Bad Request"
 *                          error: "Error details"
 */
router.post('/refresh', AccountController.refreshToken)


// router.get('/profile', isAuth, async (req, res) => {
// 	res.json(req.account)
// })

// router.post('/logout', accountController.logOut)


export default router