/**
 * @swagger
 * components:
 *  schemas:
 *      DeliveryCenter:
 *          type: object
 *          properties:
 *              delivery_center_id:
 *                  type: integer
 *                  description: The unique identifier for the delivery center.
 *              warehouse_id:
 *                  type: integer
 *                  description: The identifier for the warehouse associated with the delivery center.
 *              address:
 *                  type: string
 *                  description: The address of the delivery center.
 *          required:
 *              - warehouse_id
 *              - address
 *          example:
 *              delivery_center_id: 1
 *              warehouse_id: 101
 *              address: "144 Xuân Thủy, Cầu Giấy"
 */