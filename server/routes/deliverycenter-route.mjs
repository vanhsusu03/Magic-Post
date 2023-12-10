/**
 * @swagger
 * components:
 *  schemas:
 *      DeliveryCenter:
 *          type: object
 *          properties:
 *              deliveryCenterId:
 *                  type: integer
 *                  description: The unique identifier for the delivery center.
 *              districtId:
 *                  type: integer
 *                  description: The identifier for the district which delivery center belongs to.
 *              warehouseId:
 *                  type: integer
 *                  description: The identifier for the warehouse associated with the delivery center.
 *              address:
 *                  type: string
 *                  description: The address of the delivery center.
 *          required:
 *              - districtId
 *              - warehouseId
 *              - address
 *          example:
 *              deliveryCenterId: 34
 *              districtId: 5
 *              warehouseId: 7
 *              address: "144 Xuân Thủy, Cầu Giấy"
 */