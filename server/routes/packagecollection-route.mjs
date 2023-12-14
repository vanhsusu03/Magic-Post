/**
 * @swagger
 * components:
 *  schemas:
 *      PackageCollectionType:
 *          type: object
 *          properties:
 *              typeId:
 *                  type: integer
 *                  description: The unique identifier for the package collection type.
 *              packageCollectionType:
 *                  type: string
 *                  description: The name of the package collection type.
 *          required:
 *              - packageCollectionType
 *          example:
 *              typeId: 1
 *              packageCollectionType: "Regular"
 *      PackageCollection:
 *          type: object
 *          properties:
 *              packageCollectionId:
 *                  type: integer
 *                  description: The unique identifier for the package collection.
 *              packageCollectionTypeId:
 *                  type: integer
 *                  description: The identifier for the package collection type.
 *          required:
 *              - packageCollectionTypeId
 *          example:
 *              packageCollectionId: 101
 *              packageCollectionTypeId: 1
 */