const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.Promise = require('bluebird')

const TagSchema = new Schema({tag: String},{timestamps: true});

const TagModel = mongoose.model('Tag', TagSchema);

module.exports = TagModel
