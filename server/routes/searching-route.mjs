/**
 * @swagger
 * components:
 *  schemas:
 *      PackageStatus:
 *          type: object
 *          properties:
 *              statusId:
 *                  type: integer
 *                  description: The unique identifier for the package status.
 *              packageStatus:
 *                  type: string
 *                  description: The name of the package status.
 *          required:
 *              - packageStatus
 *          example:
 *              statusId: 1
 *              packageStatus: "In Transit"
 *      StatusDetail:
 *          type: object
 *          properties:
 *              statusId:
 *                  type: integer
 *                  description: The identifier for the package status.
 *              time:
 *                  type: string
 *                  format: date-time
 *                  description: The date and time of the status update.
 *              location:
 *                  type: string
 *                  description: The location associated with the status update.
 *              packageId:
 *                  type: integer
 *                  description: The identifier for the package.
 *          required:
 *              - statusId
 *              - time
 *              - location
 *              - packageId
 *          example:
 *              statusId: 1
 *              time: "2023-01-01T12:00:00"
 *              location: "Warehouse A"
 *              packageId: 123
 */