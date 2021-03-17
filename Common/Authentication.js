const statusCode = require('../Common/Constants');
const message = require('../Common/Messages');
/**
 * Authentication handler
 *
*/
const authenticationController = {
    /**
     * Controller handler
     *
     * @param {*} requestBody
     *
     * @return {Object}
    */
    validateToken: async (req, res, next) => {
        try {
          if (req.headers.authorization) {           
            let buff = new Buffer.from(req.headers.authorization, 'base64');
            let plainText = buff.toString('ascii')
            let array = plainText.split('~');

            if(array.length>1 && array[0] == 'test' && array[1] == 'test1234'){
               next();
            }
            else{                
                res.status(statusCode.unauthorized).send({
                    statusCode: statusCode.unauthorized,
                    message: message.unAuthorized,
                    result: null,
                });
            }                        
          } else {
            res.status( statusCode.bad_request).send({
                statusCode: statusCode.bad_request,
                message: message.badRequest,
                result: null,
            });
          }
        } catch (error) {
            res.status(constants.internal_server_error).send({
                statusCode: statusCode.internal_server_error,
                messages :  message.internalServerError,
                result : null                                
            });
        }
    }
}

module.exports = authenticationController;