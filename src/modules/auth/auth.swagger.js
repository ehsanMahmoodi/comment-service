/**
 * @swagger
 *  components:
 *   schemas:
 *    sendOtpSchema:
 *     type: object
 *     required:
 *         -   phone
 *     properties:
 *      phone:
 *       type: string
 *       description: fa-IRI phone number
 *    checkOtpSchema:
 *     type: object
 *     required:
 *         -   phone
 *         -   code
 *     properties:
 *      phone:
 *       type: string
 *       description: fa-IRI phone number
 *      code:
 *       type: number
 *       description: A 5-digit number
 */
/**
 * @swagger
 *  /auth/send-otp:
 *   post:
 *      summary: login user in user panel with phone number
 *      description: one time password(OTP) login
 *      tags:
 *          -   Auth
 *      requestBody:
 *          content:
 *               application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: "#/components/schemas/sendOtpSchema"
 *               application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/sendOtpSchema"
 *      responses:
 *          201:
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
 *  /auth/check-otp:
 *   post:
 *      summary: login user in user panel with phone number
 *      description: check one time password(OTP)w
 *      tags:
 *          -   Auth
 *      requestBody:
 *          content:
 *               application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: "#/components/schemas/checkOtpSchema"
 *               application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/checkOtpSchema"
 *      responses:
 *          201:
 *              description: Success
 *          400:
 *              description: Bad Request
 *          401:
 *              description: UnAuthorization
 *          500:
 *              description: Internal Server Error
 */