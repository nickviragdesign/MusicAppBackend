const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.Promise = require('bluebird')

const SongSchema = new Schema({
    title: String,
    tags: [String],
    description: String,
    location: String,
    artist: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    comments: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        comment: String,
        replies: [{
            user: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
            comment: String
        }]
    }]
},
{
    timestamps: true
})

const SongModel = mongoose.model('Song', SongSchema)

module.exports = SongModel
