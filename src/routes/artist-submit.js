var express = require('express');
var router = express.Router();
var multer = require('multer');
import mkdirp from 'mkdirp-promise';
import UploadService from '../services/upload.service'

router.post('/', UploadService.upload('song', 'song'), function(req, res, next) {
    try {
        console.log('multer done')
        console.log(req.file);
        console.log(req.body);
        return res.send({success: 'It worked'})
    } catch(e) {
        console.log(e)
    }

});

module.exports = router;
