/**
 * @swagger
 *  components:
 *   schemas:
 *    createBlogSchema:
 *     type: object
 *     required:
 *         -   title
 *         -   text
 *     properties:
 *      title:
 *       type: string
 *       description: category title.
 *      text:
 *       type: string
 *       description: category text.
 *    createCommentSchema:
 *     type: object
 *     required:
 *         -   text
 *     properties:
 *      text:
 *       type: string
 *       description: category text.
 *      replyTo:
 *       type: string
 *       description: reply to other comment with comment-id
 */

/**
 * @swagger
 *  /blog:
 *   get:
 *      summary: get all blog's
 *      tags:
 *          -   Blog
 *      parameters:
 *          -   in: query
 *              name:  search
 *              type: string
 *              required: false
 *      responses:
 *          200:
 *              description: Success
 *          400:
 *              description: Bad Request
 *          401:
 *              description: UnAuthorization
 *          500:
 *              description: Internal Server Error
 */

/**
 * @swagger
 *  /blog/create:
 *   post:
 *      summary: create new blog
 *      tags:
 *          -   Blog
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: "#/components/schemas/createBlogSchema"
 *      responses:
 *          200:
 *              description: Success
 *          400:
 *              description: Bad Request
 *          401:
 *              description: UnAuthorization
 *          500:
 *              description: Internal Server Error
 */
/**
 * @swagger
 *  /blog/{blogId}/comment:
 *   post:
 *      summary: create comment for blog
 *      tags:
 *          -   Blog
 *      parameters:
 *           -  in: path
 *              name: blogId
 *              type: string
 *              required: true
 *              description: blog id
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: "#/components/schemas/createCommentSchema"
 *      responses:
 *          200:
 *              description: Success
 *          400:
 *              description: Bad Request
 *          401:
 *              description: UnAuthorization
 *          500:
 *              description: Internal Server Error
 */