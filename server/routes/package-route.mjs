/**
 * @swagger
 * components:
 *  schemas:
 *      PackageType:
 *          type: object
 *          properties:
 *              typeId:
 *                  type: integer
 *                  description: The unique identifier for the package type.
 *              packageType:
 *                  type: string
 *                  description: The name of the package type.
 *          required:
 *              - packageType
 *          example:
 *              typeId: 1
 *              packageType: "Standard"
 *      Package:
 *          type: object
 *          properties:
 *              packageId:
 *                  type: integer
 *                  description: The unique identifier for the package.
 *              packageTypeId:
 *                  type: integer
 *                  description: The identifier for the package type.
 *              deliveryCenterSendId:
 *                  type: integer
 *                  description: The identifier for the sending delivery center.
 *              deliveryCenterReceiveId:
 *                  type: integer
 *                  description: The identifier for the receiving delivery center.
 *              weightGram:
 *                  type: integer
 *                  description: The weight of the package in grams.
 *              cost:
 *                  type: integer
 *                  description: The cost of the package.
 *              codAmount:
 *                  type: integer
 *                  description: The Cash on Delivery (COD) amount (optional).
 *              senderAddress:
 *                  type: string
 *                  description: The address of the package sender.
 *              receiverAddress:
 *                  type: string
 *                  description: The address of the package receiver.
 *              senderName:
 *                  type: string
 *                  description: The name of the package sender.
 *              receiverName:
 *                  type: string
 *                  description: The name of the package receiver.
 *              senderPhone:
 *                  type: string
 *                  description: The phone number of the package sender.
 *              receiverPhone:
 *                  type: string
 *                  description: The phone number of the package receiver.
 *          required:
 *              - packageTypeId
 *              - deliveryCenterSendId
 *              - deliveryCenterReceiveId
 *              - weightGram
 *              - cost
 *              - senderAddress
 *              - receiverAddress
 *              - senderName
 *              - receiverName
 *              - senderPhone
 *              - receiverPhone
 *          example:
 *              packageId: 1
 *              packageTypeId: 1
 *              deliveryCenterSendId: 101
 *              deliveryCenterReceiveId: 102
 *              weightGram: 2000
 *              cost: 50
 *              codAmount: 10
 *              senderAddress: "123 Main St, City"
 *              receiverAddress: "456 Second St, Town"
 *              senderName: "John Doe"
 *              receiverName: "Jane Smith"
 *              senderPhone: "0123456789"
 *              receiverPhone: "0987654321"
 *      PackagePkgCollection:
 *          type: object
 *          properties:
 *              packageId:
 *                  type: integer
 *                  description: The identifier for the package.
 *              packageCollectionId:
 *                  type: integer
 *                  description: The identifier for the package collection.
 *          required:
 *              - packageId
 *              - packageCollectionId
 *          example:
 *              packageId: 1
 *              packageCollectionId: 101
 */