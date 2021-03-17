const service = require('../Service/taskService');
const constants = require('../../Common/Constants');
const messages = require('../../Common/Messages');
/**
 * Controller handler
 *
*/
const controller = {
    /**
     * Controller handler
     *
     * @param {*} requestBody
     *
     * @return {Object}
    */
    getWebsiteContent: async (req, res)  => {
        try {
            const response = await service.taskService().ReadWebsiteContent(req.body);

            res.status(response.statusCode).send(response);
        } catch (error) {
            
            res.status(constants.internal_server_error).send({
                    statusCode: constants.internal_server_error,
                    messages :  messages.internalServerError,
                    result : {}                                
            });
        }        
    }
}

module.exports = controller;