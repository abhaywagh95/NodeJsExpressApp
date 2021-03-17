const express = require('express');
const router = express.Router();
const api = require('../Controller/taskController');
const apiAuthorizer = require('../../Common/Authentication');


router.get('/', apiAuthorizer.validateToken, function(req, res){
    res.status(200).send("Website metadata handler");
});

router.post('/ReadMetaData', apiAuthorizer.validateToken, api.getWebsiteContent);

module.exports = router;
