/**
 * @swagger
 * components:
 *  schemas:
 *      PackageCollectionType:
 *          type: object
 *          properties:
 *              type_id:
 *                  type: integer
 *                  description: The unique identifier for the package collection type.
 *              package_collection_type:
 *                  type: string
 *                  description: The name of the package collection type.
 *          required:
 *              - package_collection_type
 *          example:
 *              type_id: 1
 *              package_collection_type: "Regular"
 *      PackageCollection:
 *          type: object
 *          properties:
 *              package_collection_id:
 *                  type: integer
 *                  description: The unique identifier for the package collection.
 *              package_collection_type_id:
 *                  type: integer
 *                  description: The identifier for the package collection type.
 *          required:
 *              - package_collection_type_id
 *          example:
 *              package_collection_id: 101
 *              package_collection_type_id: 1
 */