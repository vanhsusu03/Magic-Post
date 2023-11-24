/**
 * @swagger
 * components:
 *  schemas:
 *      PackageType:
 *          type: object
 *          properties:
 *              type_id:
 *                  type: integer
 *                  description: The unique identifier for the package type.
 *              package_type:
 *                  type: string
 *                  description: The name of the package type.
 *          required:
 *              - package_type
 *          example:
 *              type_id: 1
 *              package_type: "Standard"
 *      Package:
 *          type: object
 *          properties:
 *              package_id:
 *                  type: integer
 *                  description: The unique identifier for the package.
 *              package_type_id:
 *                  type: integer
 *                  description: The identifier for the package type.
 *              delivery_center_send_id:
 *                  type: integer
 *                  description: The identifier for the sending delivery center.
 *              delivery_center_receive_id:
 *                  type: integer
 *                  description: The identifier for the receiving delivery center.
 *              weight_gram:
 *                  type: integer
 *                  description: The weight of the package in grams.
 *              cost:
 *                  type: integer
 *                  description: The cost of the package.
 *              COD_amount:
 *                  type: integer
 *                  description: The Cash on Delivery (COD) amount (optional).
 *              sender_address:
 *                  type: string
 *                  description: The address of the package sender.
 *              receiver_address:
 *                  type: string
 *                  description: The address of the package receiver.
 *              sender_name:
 *                  type: string
 *                  description: The name of the package sender.
 *              receiver_name:
 *                  type: string
 *                  description: The name of the package receiver.
 *              sender_phone:
 *                  type: string
 *                  description: The phone number of the package sender.
 *              receiver_phone:
 *                  type: string
 *                  description: The phone number of the package receiver.
 *          required:
 *              - package_type_id
 *              - delivery_center_send_id
 *              - delivery_center_receive_id
 *              - weight_gram
 *              - cost
 *              - sender_address
 *              - receiver_address
 *              - sender_name
 *              - receiver_name
 *              - sender_phone
 *              - receiver_phone
 *          example:
 *              package_id: 1
 *              package_type_id: 1
 *              delivery_center_send_id: 101
 *              delivery_center_receive_id: 102
 *              weight_gram: 2000
 *              cost: 50
 *              COD_amount: 10
 *              sender_address: "123 Main St, City"
 *              receiver_address: "456 Second St, Town"
 *              sender_name: "John Doe"
 *              receiver_name: "Jane Smith"
 *              sender_phone: "0123456789"
 *              receiver_phone: "0987654321"
 *      PackagePkgCollection:
 *          type: object
 *          properties:
 *              package_id:
 *                  type: integer
 *                  description: The identifier for the package.
 *              package_collection_id:
 *                  type: integer
 *                  description: The identifier for the package collection.
 *          required:
 *              - package_id
 *              - package_collection_id
 *          example:
 *              package_id: 1
 *              package_collection_id: 101
 */