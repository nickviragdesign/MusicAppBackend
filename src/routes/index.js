var express = require('express');
var router = express.Router();

// TODO: Add all routes and create controller abstraction layer

const TagModel = require('../models/tag.model');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/tags/', async (req, res, next) => {
    try {
        res.locals.tags = await TagModel.getTags();
        return res.send(res.locals);
    } catch(err) {
        res.status(500);
        return res.send({error: 'Getting new tags: ' + err});
    }
});

router.post('/tags/', async (req, res, next) => {
    try {
        console.log(req.body)
        res.locals.tags = await TagModel.addTag(req.body.tags);
        return res.send(res.locals);
    } catch(err) {
        res.status(500);
        return res.send({error: 'Saving new tags: ' + err});
    }
});

module.exports = router;
