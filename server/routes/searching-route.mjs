/**
 * @swagger
 * components:
 *  schemas:
 *      PackageStatus:
 *          type: object
 *          properties:
 *              status_id:
 *                  type: integer
 *                  description: The unique identifier for the package status.
 *              package_status:
 *                  type: string
 *                  description: The name of the package status.
 *          required:
 *              - package_status
 *          example:
 *              status_id: 1
 *              package_status: "In Transit"
 *      StatusDetail:
 *          type: object
 *          properties:
 *              status_id:
 *                  type: integer
 *                  description: The identifier for the package status.
 *              time:
 *                  type: string
 *                  format: date-time
 *                  description: The date and time of the status update.
 *              location:
 *                  type: string
 *                  description: The location associated with the status update.
 *              package_id:
 *                  type: integer
 *                  description: The identifier for the package.
 *          required:
 *              - status_id
 *              - time
 *              - location
 *              - package_id
 *          example:
 *              status_id: 1
 *              time: "2023-01-01T12:00:00"
 *              location: "Warehouse A"
 *              package_id: 123
 */