const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.Promise = require('bluebird')

const UserSchema = new Schema({
    name: {
        first: String,
        last: String
    },
    username: String,
    password: String,
    email: String,
    shows: [{
        venue: String,
        date: Date
    }],
    songs: [{
        type: Schema.Types.ObjectId,
        ref: 'Song'
    }]
},
{
    timestamps: true
})

const UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel
