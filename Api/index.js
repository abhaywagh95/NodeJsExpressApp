var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    res.status(200).send("Website metadata handler");
});

router.use('/v1.0', require('./Routes/taskRoutes'));

module.exports = router;