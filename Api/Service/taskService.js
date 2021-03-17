const meta = require('html-metadata-parser');
const constants = require('../../Common/Constants');
const messages = require('../../Common/Messages');
/**
* Service to website data extract
*/
class TaskService {
    /**
     * Read meta data of website
     *
     * @param {*} requestBody
     *
     * @return {Object}
    */
    async ReadWebsiteContent(requestBody){
        try {       
            let respData = {}; 

            if(!requestBody || !requestBody.URL){

                return {
                    statusCode: constants.bad_request,
                    message: messages.badRequest,
                    result: respData
                };
            }

            const result = await meta.parser(requestBody.URL);

            if(!result){

                return {
                    statusCode: constants.not_found,
                    message: messages.notFound,
                    result: respData
                };
            }

            let metaData = result.meta;
            let metaImages = result.og.images.map(data => data.url);
                    
            respData.title = metaData.title;
            respData.description = metaData.description;
            respData.images = metaImages;

            return {
                statusCode: constants.success,
                message: messages.success,
                result: respData
            } ;

        } catch (error) {
            
            return {
                statusCode: constants.internal_server_error,
                message: messages.internalServerError,
                result: respData
            } ;
        }  
    }
}

module.exports = {
 taskService : function(){
     return new TaskService();
 }
}